import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import AuthProvider from "@/context/AuthProvider";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";
import MobileNavbar from "@/components/mobile/MobileNavbar";
import { Toaster } from "sonner";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    absolute: "Snowy",
    template: "Snowy - %s",
  },
  description: "Join the snowy community",
  metadataBase: new URL("https://snowycircle-bysnowmann.vercel.app/"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster duration={1200} theme="system" />
          <AuthProvider>
            <div className="mx-auto max-w-7xl md:flex md:justify-center">
              <Sidebar />
              <div className="mb-40 max-w-2xl flex-1 md:mb-0">
                <TopBar />
                {children}
                <div className="fixed bottom-0 left-0 w-full md:hidden">
                  <MobileNavbar />
                </div>
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
