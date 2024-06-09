import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav/nav";
import { GetServerSideProps } from "next";
import { getAuthCookies, supabase } from "./utils/supabase/supabase";

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
        {children}
      </body>
    </html>
  );
}
