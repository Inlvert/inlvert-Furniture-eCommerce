"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="max-w-[1440px] bg-white shadow-md fixed w-full z-50 text-black h-[100px] flex items-center justify-center">
      <div className="max-w-8xl mx-auto px-8 sm:px-12 lg:px-16 flex justify-between items-center w-full">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">
            <img
              src="/logo.svg"
              alt=""
              className="hover:opacity-80 transition duration-300 contrast-150 brightness-110"
            />
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:font-bold transition px-4">
            Home
          </Link>
          <Link href="/shop" className="hover:font-bold transition px-4">
            Shop
          </Link>
          <Link href="/about" className="hover:font-bold transition px-4">
            About
          </Link>
          <Link href="/constact" className="hover:font-bold transition px-4">
            Contact
          </Link>
        </nav>

        <nav className="hidden md:flex space-x-6">
          <Link href="/login" className="hover:text-600 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 transition duration-300 hover:stroke-[3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </Link>
          <Link href="/registration" className="hover:font-bold transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 transition duration-300 hover:stroke-[3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </Link>
          <Link href="/registration" className="hover:font-bold transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 transition duration-300 hover:stroke-[3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>
          <Link href="/" className="hover:font-bold transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7 transition duration-300 hover:stroke-[3]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
        </nav>

        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="flex flex-col justify-between w-6 h-6 focus:outline-none"
          >
            <span
              className={`block h-0.5 w-full bg-black transform transition duration-300 ${
                isOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transition duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-black transform transition duration-300 ${
                isOpen ? "-rotate-45 -translate-y-3" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {isOpen && (
        <nav className="md:hidden absolute top-[100px] left-0 w-full bg-white shadow-md px-6 py-6 space-y-3 text-lg font-medium">
          <Link href="/" className="block hover:font-bold transition px-4">
            Home
          </Link>
          <Link href="/login" className="block hover:font-bold transition px-4">
            Login
          </Link>
          <Link
            href="/registration"
            className="block hover:font-bold transition px-4"
          >
            Registration
          </Link>
        </nav>
      )}
    </header>
  );
}
