"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname from Next.js
import HSpacer from "../h-spacer/h-spacer";
import { supabase } from "@/app/supabase/client";
import { User } from "@supabase/supabase-js";
import axios from "axios";

const Nav = () => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await axios.get("/api/getUser", {});
      const user = res.data.user;

      setUser(user);

      console.log("XXX-user", res);
    };

    checkUser();

    // Cleanup the listener on component unmount
    return () => {};
  }, []);

  return (
    <nav className="flex justify-end bg-blue-500 py-4 px-6 text-2xl">
      <ul className="flex space-x-4 text-blue-300">
        <li
          className={`hover:text-blue-100 ${
            pathname === "/" ? "text-white" : ""
          }`}
        >
          <Link href="/">Home</Link>
        </li>
        <li>
          <HSpacer />
        </li>
        <li
          className={`hover:text-blue-100 ${
            pathname === "/history" ? "text-white" : ""
          }`}
        >
          <Link href="/history">History</Link>
        </li>
        <li>
          <HSpacer />
        </li>
        <li
          className={`hover:text-blue-100 ${
            pathname === "/login" ? "text-white" : ""
          }`}
        >
          <Link href={"/logout"}>{user?.email}</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
