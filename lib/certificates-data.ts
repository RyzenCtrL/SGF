import { Flame, PaintBucket, Droplets, LifeBuoy } from "lucide-react";

// TODO: заменить плейсхолдеры на сканы реальных сертификатов и деклараций соответствия
export const certificates = [
  { title: "Сертификат соответствия ГОСТ Р 52301-2013", code: "№ РОСС RU.—" },
  { title: "Декларация соответствия ТР ТС 019/2011", code: "№ ТС RU Д—" },
  { title: "Сертификат СМК ISO 9001", code: "№ ISO-9001—" },
  { title: "Протокол испытаний покрытий EPDM", code: "№ ПИ—" },
  { title: "Пожарный сертификат на материалы", code: "№ ПС—" },
  { title: "Сертификат на антивандальное покрытие", code: "№ АВ—" },
] as const;

export const warranties = [
  {
    icon: Flame,
    years: 5,
    unit: "лет",
    label: "на металлоконструкции и сварные соединения",
  },
  {
    icon: PaintBucket,
    years: 3,
    unit: "года",
    label: "на порошковую окраску",
  },
  {
    icon: Droplets,
    years: 2,
    unit: "года",
    label: "на резиновые и наливные покрытия",
  },
  {
    icon: LifeBuoy,
    years: 1,
    unit: "год",
    label: "бесплатное сервисное обслуживание",
  },
] as const;
