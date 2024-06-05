import React from "react";
import Link from "next/link"; // Import Link component from Next.js

const Nav = () => {
  return (
    <nav className="flex justify-end bg-gray-200 py-4 px-6 text-2xl">
      <ul className="flex space-x-4 text-gray-500">
        <li className=" hover:text-gray-900">
          <Link href="/">Home</Link>
        </li>
        <li className=" hover:text-gray-900">
          <Link href="/history">History</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
