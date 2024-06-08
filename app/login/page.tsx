"use client";

import React, { useState } from "react";
import VSpacer from "@/components/v-spacer/v-spacer";
import Button from "@/components/button/button";
import Spinner from "@/components/spinner/spinner";
import { supabase } from "../supabase/client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loginFailure, setLoginFailure] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setLoginFailure(false);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      setLoading(false);

      setLoginFailure(!!error);
    } catch (error) {
      setLoading(false);
      setLoginFailure(true);
    }
  }

  return (
    <main className="p-16 h-screen flex flex-col items-center justify-center">
      <div className="text-blue-500 text-4xl text-center mb-16">Login</div>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Spinner />
          </div>
        )}
      </div>

      {loginFailure && <div className="text-red-500 text-xl">Login Failure</div>}
    </main>
  );
}
