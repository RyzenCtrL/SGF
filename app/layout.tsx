import type { Metadata } from "next";
import { Unbounded, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileStickyCta } from "@/components/layout/mobile-sticky-cta";
import { SideGutterPaths } from "@/components/ui/side-gutter-paths";

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl = "https://sgf-i66u.vercel.app";
const title = "Street Gym Factory — уличные спортивные площадки под ключ";
const description =
  "Производство и монтаж уличных спортивных площадок под ключ: воркаут-комплексы, уличные тренажёры, покрытия. Работаем по всей России, собственный завод, гарантия 5 лет.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s — Street Gym Factory",
  },
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Street Gym Factory",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${inter.variable}`}>
      <body className="bg-bg-primary text-text-primary antialiased font-body">
        <SideGutterPaths />
        <Header />
        <main className="pb-24 lg:pb-0">{children}</main>
        <Footer />
        <MobileStickyCta />
      </body>
    </html>
  );
}
