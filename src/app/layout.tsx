import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import Header from "@/components/Header/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "Find and rent your perfect camper with TravelTrucks.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
