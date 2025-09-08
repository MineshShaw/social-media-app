"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-200 to-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-indigo-600">ScalerGram</h1>
        <div className="space-x-4">
          <Link href="/auth/login" className="text-gray-700 hover:text-indigo-600">
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl sm:text-6xl font-bold text-gray-800 leading-tight mb-6">
          Welcome to <span className="text-indigo-600">ScalerGram</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          A modern platform to help you connect, collaborate, and create with ease.  
          Join us today and be part of something amazing.
        </p>
        <div className="space-x-4">
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/auth/login"
            className="px-6 py-3 bg-gray-100 shadow-md text-gray-700 rounded-lg hover:bg-gray-200 transition"
          >
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
