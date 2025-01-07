import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navebar from "@/Components/Navebar";
import Footer from "@/Components/Footer";
import { WixClientContextProvider } from "@/Context/wixContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lama Dev E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Wix",
};
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-x-hidden`}>
        <WixClientContextProvider>
          <Navebar />
          <main>{children}</main>
          <Footer />
        </WixClientContextProvider>
      </body>
    </html>
  );
}
