'use client';
import React, { useEffect, useState } from 'react';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from '@/action/useractions';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashBoard = () => {
  // User session info (name, email, etc.)
  const { data: session, update } = useSession();

  // Router for navigation
  const router = useRouter();

  // Stores user's editable profile data
  const [form, setForm] = useState({});

  // Redirect if user is not logged in, otherwise fetch their data
  useEffect(() => {
    if (!session) {
      router.push("/login"); // If no session → go to login
    } else {
      getData(); // Otherwise load dashboard data
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // Load user profile data from backend
  const getData = async () => {
    if (session) {
      const data = await fetchUser(session.user.name);
      setForm(JSON.parse(data)); // Populate form fields
    }
  };

  // Handle input changes for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Sanitize username into slug format
    if (name === 'username') {
      const slugName = value.split(/[^\w-]+/).join("").toLowerCase();
      setForm({ ...form, username: slugName });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit updated profile to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update profile API call
    const a = await updateProfile(form, session.user.name);

    // Update session data after profile change
    await update();

    const response = JSON.parse(a);

    // Show toast notification about success/error
    toast(response.message, {
      position: "top-right",
      autoClose: 5000,
      theme: "dark",
      transition: Bounce,
    });
  };

  return (
    <>
      {/* Toast notifications container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        transition={Bounce}
      />

      <div className='min-h-screen'>
        <h2 className='text-2xl font-bold text-center py-5'>
          Welcome to your dashboard
        </h2>

        {/* Profile form */}
        <form
          className="max-w-sm md:max-w-lg mx-auto pb-5 px-3 md:px-0"
          onSubmit={handleSubmit}
        >

          {/* Name field */}
          <div className="mb-1">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              value={form.name || ""}
              onChange={handleChange}
              name='name'
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Email field (read-only) */}
          <div className="mb-1">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              value={form.email || ""}
              onChange={handleChange}
              name='email'
              id="email"
              readOnly
              title="Email can't be modified"
              className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900/70 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white/70 cursor-not-allowed"
            />
          </div>

          {/* Username (slug automatically applied) */}
          <div className="mb-1">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
              Username
            </label>
            <input
              type="text"
              value={form.username || ""}
              onChange={handleChange}
              name='username'
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Profile Picture URL */}
          <div className="mb-1">
            <label htmlFor="profilpicture" className="block mb-2 text-sm font-medium text-white">
              Profile Picture
            </label>
            <input
              type="url"
              value={form.profilpicture || ""}
              onChange={handleChange}
              name='profilpicture'
              id="profilpicture"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Cover Picture URL */}
          <div className="mb-1">
            <label htmlFor="coverpicture" className="block mb-2 text-sm font-medium text-white">
              Cover Picture
            </label>
            <input
              type="url"
              value={form.coverpicture || ""}
              onChange={handleChange}
              name='coverpicture'
              id="coverpicture"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Razorpay Key ID */}
          <div className="mb-1">
            <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">
              Razorpay Id
            </label>
            <input
              type="text"
              value={form.razorpayid || ""}
              onChange={handleChange}
              name='razorpayid'
              id="razorpayid"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Razorpay Secret */}
          <div className="mb-5">
            <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-white">
              Razorpay Secret
            </label>
            <input
              type="text"
              value={form.razorpaySecret || ""}
              onChange={handleChange}
              name='razorpaySecret'
              id="razorpaySecret"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default DashBoard;
