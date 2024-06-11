"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/button";
import Spinner from "@/components/spinner/spinner";
import Nav from "@/components/nav/nav";

export default function Logout() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    setLoading(false);
    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      console.error("Error logging out:", data.error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <Nav></Nav>
      <main className="p-16 h-screen flex flex-col items-center justify-center">
        <div className="text-blue-500 text-4xl text-center mb-16">Logout</div>
        <div className="text-center mb-8">
          Are you sure you want to log out?
        </div>
        <div className="flex space-x-4">
          <Button onClick={handleLogout} disabled={loading}>
            {loading ? <Spinner /> : "Yes, Log me out"}
          </Button>
          <Button onClick={handleCancel} disabled={loading}>
            No, Cancel
          </Button>
        </div>
      </main>
    </>
  );
}
