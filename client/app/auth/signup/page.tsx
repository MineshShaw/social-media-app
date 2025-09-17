"use client";

import { useEffect, useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import Link from "next/link";
import { signup } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { setUserData } from "@/redux/userSlice";
import { useDispatch } from "react-redux";


export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError(null);
    }
  }, [password, confirmPassword]);

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
        const response = await signup(fullName, userName, email, password);
        console.log(response);

        // Handle successful signup (e.g., redirect to login or dashboard)
        setFullName("");
        setUserName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError(null);

        dispatch(setUserData(response));

        router.push('/dashboard')
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="flex flex-col bg-gradient-to-r from-blue-200 to-white items-center justify-center min-h-screen py-6 px-4">
      <form className="flex flex-col bg-white items-center justify-center p-8 rounded-2xl shadow-xl w-full max-w-md">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create Account ✨
        </h1>

        {/* Full Name */}
        <div className="mb-4 w-full">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Full Name
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-4 w-full">
          <label
            htmlFor="userName"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            User Name
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiUser className="text-gray-400 mr-2" />
            <input
              type="text"
              id="userName"
              placeholder="johndoe"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Email
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiMail className="text-gray-400 mr-2" />
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="********"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Confirm Password
          </label>
          <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
            <FiLock className="text-gray-400 mr-2" />
            <input
              type="password"
              id="confirmPassword"
              placeholder="********"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <p className="mt-2 text-sm text-red-600 text-left w-full">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition duration-200"
          disabled={
            !!error ||
            !fullName ||
            !userName ||
            !email ||
            !password ||
            !confirmPassword
          }
          onClick={handleSignup}
        >
          Sign up
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
