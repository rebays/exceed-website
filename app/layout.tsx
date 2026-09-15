import type { Metadata } from "next";
import { DM_Sans, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exceed Enterprise Limited | Branding, Signage & Software Studio",
  description: "A Honiara-based design agency building brands that refuse to blend in — branding, signage & fabrication, and custom software.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${anton.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-foreground">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
