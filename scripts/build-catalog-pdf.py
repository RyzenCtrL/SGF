"""Собирает public/catalog.pdf из того же lib/catalog-data.ts, что и каталог на сайте,
чтобы цены на сайте и в прайсе не расходились.

    pip install reportlab
    python scripts/build-catalog-pdf.py
"""
import re
import sys
from pathlib import Path
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "lib" / "catalog-data.ts"
OUT = ROOT / "public" / "catalog.pdf"

# Кириллица требует встроенного TTF — базовые шрифты PDF её не содержат.
FONTS = Path(r"C:\Windows\Fonts")
if not (FONTS / "arial.ttf").exists():
    sys.exit(f"не найдены шрифты в {FONTS} — укажите путь к TTF с кириллицей")
pdfmetrics.registerFont(TTFont("Body", str(FONTS / "arial.ttf")))
pdfmetrics.registerFont(TTFont("Bold", str(FONTS / "arialbd.ttf")))

def rgb(r, g, b):
    return Color(r / 255, g / 255, b / 255)

BG_DARK = rgb(14, 15, 16)
CARD = rgb(29, 32, 33)
LIME = rgb(181, 224, 36)
INK = rgb(20, 22, 23)
MUTED = rgb(110, 117, 120)
HAIR = rgb(222, 225, 226)
WHITE = rgb(255, 255, 255)

# ---------- разбор каталога ----------
src = SRC.read_text(encoding="utf-8")
products = []
for m in re.finditer(
    r'slug:\s*"(?P<slug>[^"]+)",\s*\n\s*category:\s*"(?P<cat>[^"]+)",\s*\n\s*'
    r'name:\s*"(?P<name>[^"]+)",\s*\n\s*priceFrom:\s*(?P<price>\d+),\s*\n\s*'
    r'specs:\s*\[(?P<specs>.*?)\]',
    src, re.S,
):
    specs = re.findall(r'"([^"]+)"', m.group("specs"))
    products.append(
        {
            "cat": m.group("cat"),
            "name": m.group("name"),
            "price": int(m.group("price")),
            "specs": specs,
        }
    )

cats = re.search(r"catalogCategories = \[(.*?)\] as const", src, re.S).group(1)
categories = re.findall(r'"([^"]+)"', cats)
if not products:
    sys.exit("не удалось разобрать каталог")
print(f"позиций: {len(products)}, категорий: {len(categories)}")

UNIT_PER_M2 = {"Покрытия"}

def money(v):
    return f"{v:,}".replace(",", "\u00a0") + "\u00a0\u20bd"

W, H = A4
c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle("Street Gym Factory — каталог оборудования")
c.setAuthor("Street Gym Factory")
c.setSubject("Прайс-лист на уличное спортивное оборудование")

# ---------- обложка ----------
c.setFillColor(BG_DARK)
c.rect(0, 0, W, H, fill=1, stroke=0)
c.setFillColor(LIME)
c.rect(0, H - 6 * mm, W, 6 * mm, fill=1, stroke=0)

c.setFillColor(LIME)
c.setFont("Bold", 9)
c.drawString(22 * mm, H - 28 * mm, "STREET GYM FACTORY")
c.setFillColor(MUTED)
c.setFont("Body", 8)
c.drawString(22 * mm, H - 34 * mm, "ПРОИЗВОДИТЕЛЬ УЛИЧНОГО СПОРТИВНОГО ОБОРУДОВАНИЯ")

c.setFillColor(WHITE)
c.setFont("Bold", 36)
c.drawString(22 * mm, H - 82 * mm, "Каталог")
c.drawString(22 * mm, H - 96 * mm, "оборудования")
c.setFillColor(LIME)
c.setFont("Bold", 36)
c.drawString(22 * mm, H - 110 * mm, "2026")

c.setFillColor(rgb(155, 161, 163))
c.setFont("Body", 10.5)
for i, line in enumerate(
    [
        "Воркаут-комплексы, уличные тренажёры, парковое",
        "оборудование и покрытия. Производство, доставка",
        "и монтаж под ключ по всей России.",
    ]
):
    c.drawString(22 * mm, H - 128 * mm - i * 6 * mm, line)

# плашки со статистикой
stats = [("12", "лет производства"), ("120+", "объектов"), ("27", "регионов"), ("5 лет", "гарантии")]
bx, bw, bh = 22 * mm, 39 * mm, 22 * mm
by = H - 172 * mm
for i, (val, label) in enumerate(stats):
    x = bx + i * (bw + 4 * mm)
    c.setFillColor(CARD)
    c.roundRect(x, by, bw, bh, 3 * mm, fill=1, stroke=0)
    c.setFillColor(LIME if i == 1 else WHITE)
    c.setFont("Bold", 15)
    c.drawString(x + 6 * mm, by + 12 * mm, val)
    c.setFillColor(MUTED)
    c.setFont("Body", 7.5)
    c.drawString(x + 6 * mm, by + 6 * mm, label)

c.setStrokeColor(rgb(42, 46, 48))
c.setLineWidth(0.6)
c.line(22 * mm, 42 * mm, W - 22 * mm, 42 * mm)
c.setFillColor(rgb(155, 161, 163))
c.setFont("Body", 9)
c.drawString(22 * mm, 34 * mm, "+7 (495) 555-01-24")
c.drawString(22 * mm, 28 * mm, "info@street-gym-factory.ru")
c.drawRightString(W - 22 * mm, 34 * mm, "street-gym-factory.ru")
c.setFillColor(rgb(95, 101, 103))
c.setFont("Body", 7)
c.drawRightString(W - 22 * mm, 28 * mm, "Цены указаны справочно и не являются публичной офертой")
c.showPage()

# ---------- внутренние страницы ----------
page_no = 1
LEFT, RIGHT = 20 * mm, W - 20 * mm
TOP = H - 30 * mm
BOTTOM = 26 * mm


def page_chrome():
    c.setFillColor(BG_DARK)
    c.rect(0, H - 16 * mm, W, 16 * mm, fill=1, stroke=0)
    c.setFillColor(LIME)
    c.setFont("Bold", 7.5)
    c.drawString(LEFT, H - 10 * mm, "STREET GYM FACTORY")
    c.setFillColor(rgb(155, 161, 163))
    c.setFont("Body", 7.5)
    c.drawRightString(RIGHT, H - 10 * mm, "Каталог оборудования 2026")
    c.setStrokeColor(HAIR)
    c.setLineWidth(0.5)
    c.line(LEFT, 18 * mm, RIGHT, 18 * mm)
    c.setFillColor(MUTED)
    c.setFont("Body", 7)
    c.drawString(LEFT, 13 * mm, "street-gym-factory.ru  ·  +7 (495) 555-01-24")
    c.drawRightString(RIGHT, 13 * mm, str(page_no))


page_chrome()
y = TOP

for cat in categories:
    items = [p for p in products if p["cat"] == cat]
    if not items:
        continue
    need = 20 * mm + len(items[:1]) * 18 * mm
    if y - need < BOTTOM:
        c.showPage()
        page_no += 1
        page_chrome()
        y = TOP

    # заголовок категории
    c.setFillColor(LIME)
    c.rect(LEFT, y - 1 * mm, 8 * mm, 1.6 * mm, fill=1, stroke=0)
    c.setFillColor(INK)
    c.setFont("Bold", 15)
    c.drawString(LEFT + 11 * mm, y - 2 * mm, cat)
    c.setFillColor(MUTED)
    c.setFont("Body", 8)
    unit = "за м²" if cat in UNIT_PER_M2 else "за комплект"
    c.drawRightString(RIGHT, y - 2 * mm, f"цена {unit}")
    y -= 11 * mm

    for p in items:
        if y - 20 * mm < BOTTOM:
            c.showPage()
            page_no += 1
            page_chrome()
            y = TOP
        c.setFillColor(rgb(249, 250, 250))
        c.roundRect(LEFT, y - 16 * mm, RIGHT - LEFT, 16 * mm, 2 * mm, fill=1, stroke=0)
        c.setFillColor(INK)
        c.setFont("Bold", 10.5)
        c.drawString(LEFT + 6 * mm, y - 6.5 * mm, p["name"])
        c.setFillColor(MUTED)
        c.setFont("Body", 8)
        c.drawString(LEFT + 6 * mm, y - 12 * mm, "  ·  ".join(p["specs"]))
        c.setFillColor(INK)
        c.setFont("Bold", 11)
        c.drawRightString(RIGHT - 6 * mm, y - 9 * mm, "от " + money(p["price"]))
        y -= 18.5 * mm

    y -= 2 * mm

# ---------- финальный блок ----------
CTA_H = 28 * mm
if y - CTA_H < BOTTOM:
    c.showPage()
    page_no += 1
    page_chrome()
    y = TOP
# прижимаем блок к низу полосы набора, чтобы не оставлять «дыру»
y = BOTTOM + CTA_H

c.setFillColor(BG_DARK)
c.roundRect(LEFT, y - CTA_H, RIGHT - LEFT, CTA_H, 3.5 * mm, fill=1, stroke=0)
c.setFillColor(WHITE)
c.setFont("Bold", 13)
c.drawString(LEFT + 9 * mm, y - 11.5 * mm, "Рассчитаем проект под вашу площадку")
c.setFillColor(rgb(155, 161, 163))
c.setFont("Body", 8)
c.drawString(
    LEFT + 9 * mm,
    y - 19 * mm,
    "Смета, спецификация и 3D-визуализация — бесплатно, за один день.",
)
c.setFillColor(LIME)
c.roundRect(RIGHT - 57 * mm, y - 19.5 * mm, 48 * mm, 10.5 * mm, 2.5 * mm, fill=1, stroke=0)
c.setFillColor(BG_DARK)
c.setFont("Bold", 9)
c.drawCentredString(RIGHT - 33 * mm, y - 16.2 * mm, "+7 (495) 555-01-24")
c.setFillColor(rgb(95, 101, 103))
c.setFont("Body", 7.5)
c.drawRightString(RIGHT - 9 * mm, y - 24 * mm, "info@street-gym-factory.ru")

c.save()
print("готово:", OUT)
