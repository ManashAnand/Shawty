import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Shortner",
  description: "Generated by Manash Anand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-800">
          <main className="min-h-screen container ">
            <Header />
            {children}
          </main>
        </div>
        <div className="p-10 text-center bg-gray-800  text-white">
          Made with 💗 by Manash Anand
        </div>
      </body>
    </html>
  );
}
