import type { Metadata } from "next";
import { Silkscreen } from "next/font/google";
import "./globals.css";

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peludo Huesudo 🎃💀🐶",
  description:
    "Genera calaveritas literarias personalizadas para tu mascota con IA. Parte del Code of the Dead Challenge de JSConf MX 2025.",
  keywords: [
    "calaveritas",
    "día de muertos",
    "mascotas",
    "IA",
    "JSConf MX",
    "Code of the Dead",
    "poemas",
    "México",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={silkscreen.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
