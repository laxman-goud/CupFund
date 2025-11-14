"use client";
import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  // To control modal open/close state
  const [show, setShow] = useState(false);

  // Controlled input value for username
  const [username, setUsername] = useState("");

  // Next.js router for navigation
  const router = useRouter();

  // Reference to reset the form after submit
  const searchRef = useRef();

  // Handle form submission
  const handelSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formData = new FormData(e.currentTarget);
    const uName = formData.get("uName"); // Get username from input

    // Navigate dynamically to /username
    router.push(`/${uName}`);

    // Close modal
    setShow(false);

    // Reset form UI + state
    searchRef.current.reset();
    setUsername("");
  };

  // Update username (sanitize into slug)
  const handelChange = (e) => {
    const name = e.target.value;

    // Remove spaces, special chars except dash/underscore → convert to lowercase
    const slugName = name.split(/[^\w-]+/).join("").toLowerCase();

    setUsername(slugName);
  };

  return (
    <>
      <div className="relative inline-block">

        {/* Button to toggle modal */}
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2 rounded-lg text-sm font-medium flex items-center justify-center"
          type="button"
          onClick={() => setShow(!show)}
        >
          {/* Search Icon */}
          <svg
            className="size-4 mb-1 md:mb-1.5 font-bold"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>

        {/* Modal Background Wrapper */}
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className={`${
            show ? "" : "hidden"
          } fixed top-0 right-0 left-0 z-50 w-full h-full backdrop-blur-sm bg-gray-100 bg-opacity-50 dark:bg-gray-900 dark:bg-opacity-50`}
        >
          {/* Modal Container */}
          <div className="relative top-20 p-4 w-full max-w-3xl mx-auto">

            {/* Modal Box */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Find Your Favourite Creator
                </h3>

                {/* Close Button */}
                <button
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShow(false)}
                >
                  {/* X Icon */}
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 md:p-5">
                <form ref={searchRef} className="space-y-4" onSubmit={handelSubmit}>
                  
                  <div>
                    {/* Hidden label (for accessibility) */}
                    <label htmlFor="uName" className="sr-only">
                      Search
                    </label>

                    <div className="relative">
                      {/* Left search icon inside input */}
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>

                      {/* Search Input */}
                      <input
                        type="search"
                        id="uName"
                        name="uName"
                        value={username}
                        onChange={handelChange}
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white"
                        placeholder="Username"
                        required
                      />

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Search
                      </button>
                    </div>
                  </div>

                </form>
              </div> {/* End Body */}
            </div> {/* End Modal Box */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;