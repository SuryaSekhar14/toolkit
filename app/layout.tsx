import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { ToastProvider } from "./components/ToastProvider";
import { ThemeProvider } from "next-themes";
import Sidenav from "./components/Sidenav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Surya's Toolkit",
  description: "A collection of tools and utilities.",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  dark:bg-gray-900 dark:text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <div className="flex min-h-[calc(100vh-65px)]">
            <div className="hidden md:block">
              <Sidenav />
            </div>
            <main className="flex-grow">
              <ToastProvider />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
