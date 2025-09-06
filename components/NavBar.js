/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Search from "./Search";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropDown, setShowDropDown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center px-5 md:px-10 h-16">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <img
            src="/tea.gif"
            alt="Chai cup"
            className="w-10 md:w-12 "
          />
          <span className="hidden sm:block">CupFund</span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4 relative">
          <Search />

          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowDropDown(!showDropDown)}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg text-sm font-medium focus:outline-none"
              >
                <span className="hidden md:inline">Welcome</span>
                <span>{session.user.name}</span>
                <svg
                  className={`w-3 h-3 transform transition-transform ${
                    showDropDown ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l4 4 4-4"
                  />
                </svg>
              </button>

              {/* Dropdown */}
              {showDropDown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden dark:bg-gray-700 dark:text-gray-200">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => setShowDropDown(false)}
                  >
                    Dashboard
                  </Link>
                  {session.user.username && (
                    <Link
                      href={`/${session.user.username}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setShowDropDown(false)}
                    >
                      Your Page
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      signOut();
                      setShowDropDown(false);
                    }}
                    className="w-full text-left px-4 py-2 border-t border-gray-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">
              <button className="bg-gradient-to-br from-green-400 to-blue-600 hover:from-green-500 hover:to-blue-700 px-5 py-2 rounded-lg text-sm font-medium">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
