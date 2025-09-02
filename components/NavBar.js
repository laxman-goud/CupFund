"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Search from "./Search";
import Image from "next/image";

const Navbar = () => {
  const { data: session } = useSession();
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <nav className="fixed w-full z-20 top-0 left-0 bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center px-5 md:px-10 h-16">
        <div className="logo font-bold md:text-lg">
          <Link href={'/'}>
            <span className="hidden md:block">GetMeAChai!</span>
            <span className="block md:hidden">
              <Image
                src="/tea.gif"
                alt="Chai GIF"
                width={60}
                height={60}
                className="bg-blend-luminosity pb-6"
              />
            </span>
          </Link>
        </div>

        <div className="relative flex items-center gap-4">
          <Search />
          {session ? (
            <>
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-3 md:px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={() => setShowDropDown(!showDropDown)}
                onBlur={() => {
                  setTimeout(() => {
                    setShowDropDown(false);
                  }, 300);
                }}
              >
                <span className="hidden md:inline">Welcome&nbsp;</span>
                <span>{session.user.name}</span>
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="dropdown"
                className={`z-10 ${showDropDown ? "" : "hidden"} absolute top-full right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => setShowDropDown(false)}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    {session.user.username && (
                      <Link
                        href={`/${session.user.username}`}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setShowDropDown(false)}
                      >
                        Your Page
                      </Link>
                    )}
                  </li>
                  <li>
                    <Link
                      href="#"
                      onClick={() => {
                        signOut();
                        setShowDropDown(false);
                      }}
                      className="block px-4 py-2 border-t border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link href={"/login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
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
