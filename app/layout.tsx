import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { site } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} | Skip Hire & Waste Removal`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "skip hire",
    "waste management",
    "cage van hire",
    "hazardous waste",
    "demolition services",
    "portaloo hire",
    "waste removal",
    "book waste collection online",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${inter.className} flex min-h-screen flex-col`}
        suppressHydrationWarning
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
