import type { Metadata } from "next";
import { Inter, Inter_Tight, Geist } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR" className={cn("h-full", "antialiased", inter.variable, interTight.variable, "font-sans", geist.variable)}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
