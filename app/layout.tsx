import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/nav";
import {
  GlobalContext,
  GlobalContextProvider,
} from "@/components/global-context/global-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Less is More",
  description: "Reduce your words to something meaningful",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <Nav></Nav>
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
