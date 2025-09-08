"use client";

import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import Link from "next/link";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-200 to-white items-center justify-center min-h-screen py-6 px-4">
      <form className="flex flex-col bg-white items-center justify-center p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back 👋</h1>

        {/* Username */}
        <div className="mb-4 w-full">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Username
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              id="userName"
              placeholder="Enter your username"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-4 w-full">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Password
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 text-sm text-red-600 text-left w-full">{error}</p>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center w-full mt-2 mb-6">
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="rounded text-indigo-600" />
            <span>Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200"
        >
          Sign in
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
