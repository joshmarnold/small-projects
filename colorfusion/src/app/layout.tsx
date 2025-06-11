import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

const montserrat = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ColorFusion",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans`}>
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans transition-colors duration-300">
          {children}
        </div>
      </body>
    </html>
  );
}
