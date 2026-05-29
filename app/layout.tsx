import type { Metadata } from "next";
import { Geist, Geist_Mono, Karla } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { cn } from "@/lib/utils";

const karlaKarla = Karla({ subsets: ["latin"], weight: ["200","300","400","500","600","700","800"], variable: "--font-karla" });
const geistGeist = Geist({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"], variable: "--font-geist" });
const geistMonoGeistMono = Geist_Mono({ subsets: ["latin"], weight: ["100","200","300","400","500","600","700","800","900"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "statement",
  description: "pi-statement, a tool for law enforcement agencies",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn(karlaKarla.variable, geistGeist.variable, geistMonoGeistMono.variable)} suppressHydrationWarning>
      <body suppressHydrationWarning={true} className="bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
