import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: "ToolGenie",
  description: "Discover the best AI tools for your needs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.variable}`}>
      <body className="bg-gradient-to-br from-gray-900 to-black text-white min-h-screen flex flex-col">
          <div className="flex-grow flex flex-col">
            <MainNav />
            <main className="flex w-full flex-col items-center justify-center">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}
