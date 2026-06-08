import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Mundo Pet",
  description: "Agende serviço de banho, tosa entre outros com a Mundo Pet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt_BR"
      className={`${inter.variable} ${interTight.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
