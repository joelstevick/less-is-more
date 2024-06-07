"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname from Next.js
import HSpacer from "../h-spacer/h-spacer";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-end bg-blue-500 py-4 px-6 text-2xl">
      <ul className="flex space-x-4 text-blue-300">
        <li
          className={`hover:text-blue-100 ${pathname === '/' ? 'text-white' : ''}`}
        >
          <Link href="/">Home</Link>
        </li>
        <li><HSpacer /></li>
        <li
          className={`hover:text-blue-100 ${pathname === '/history' ? 'text-white' : ''}`}
        >
          <Link href="/history">History</Link>
        </li>
        <li><HSpacer /></li>
        <li
          className={`hover:text-blue-100 ${pathname === '/login' ? 'text-white' : ''}`}
        >
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
