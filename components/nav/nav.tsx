"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname from Next.js
import HSpacer from "../h-spacer/h-spacer";
import { supabase } from "@/app/supabase/client";

const Nav = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setIsLoggedIn(!!user);
    };

    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session?.user);
    });

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
          <Link href={isLoggedIn ? "/logout" : "/login"}>
            {isLoggedIn ? "Logout" : "Login"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
