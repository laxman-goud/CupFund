"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/action/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

const Dashboard = () => {
    // Get session + user state from NextAuth
    const { data: session, status, update } = useSession();
    const router = useRouter();

    // Local form state
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        profilpicture: "",
        coverpicture: "",
        razorpayid: "",
        razorpaySecret: "",
    });

    // Payment history of the creator
    const [payments, setPayments] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    /**
     * Fetch user's payments from API
     * Runs only when session exists
     */
    const fetchPayments = useCallback(async () => {
        if (session?.user?.name) {
            try {
                const res = await fetch(`/api/payments?username=${session.user.name}`);
                const data = await res.json();
                setPayments(data.payments);
            } catch (error) {
                console.error("Error fetching payments:", error);
                toast.error("Failed to fetch payments.");
            }
        }
    }, [session]);

    /**
     * Fetch user profile details
     * Combines user data + payment data
     */
    const getData = useCallback(async () => {
        setLoading(true);

        if (session?.user?.name) {
            const data = await fetchUser(session.user.name);
            const userData = JSON.parse(data);

            // If backend throws error
            if (userData.error) {
                toast.error(userData.error);
                setForm((prev) => ({ ...prev, email: session.user.email }));
            } else {
                // Set user profile data into form
                setForm({
                    name: userData.name || "",
                    email: userData.email || "",
                    username: userData.username || "",
                    profilpicture: userData.profilpicture || "",
                    coverpicture: userData.coverpicture || "",
                    razorpayid: userData.razorpayid || "",
                    razorpaySecret: userData.razorpaySecret || "",
                });

                // Load payments list
                await fetchPayments();
            }
        }

        setLoading(false);
    }, [session, fetchPayments]);

    /**
     * Redirect unauthenticated users to login page.
     * Fetch dashboard data when session loads.
     */
    useEffect(() => {
        if (status === "unauthenticated") router.push("/login");
        if (session) getData();
    }, [session, status, router, getData]);

    /**
     * Handle input changes
     * Auto-slugify username field
     */
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "username") {
            const slugName = value.replace(/[^\w-]+/g, "").toLowerCase();
            setForm({ ...form, username: slugName });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    /**
     * Update profile on submit
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const response = await updateProfile(form, session.user.name);
        const result = JSON.parse(response);

        setLoading(false);

        // Show toast according to result
        if (result.success) {
            toast.success(result.message, { transition: Bounce });
            await update(); // Refresh session
        } else {
            toast.error(result.message, { transition: Bounce });
        }
    };

    // Show loader when session or data is loading
    if (status === "loading" || loading) return <Loader />;

    return (
        <>
            <ToastContainer />

            <div className="dashboard-page min-h-screen">
                {/* Dashboard Heading */}
                <h2 className="text-2xl font-bold text-center py-5">
                    Welcome to your dashboard
                </h2>

                {/* Profile Form */}
                <form
                    className="max-w-sm md:max-w-lg mx-auto pb-5 px-3 md:px-0"
                    onSubmit={handleSubmit}
                >
                    {/* Name */}
                    <div className="mb-1">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            name="name"
                            id="name"
                            className="input-style"
                        />
                    </div>

                    {/* Read-only email */}
                    <div className="mb-1">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            name="email"
                            id="email"
                            className="input-style cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Username */}
                    <div className="mb-1">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={handleChange}
                            name="username"
                            id="username"
                            className="input-style"
                        />
                    </div>

                    {/* Profile Picture URL */}
                    <div className="mb-1">
                        <label htmlFor="profilpicture" className="block mb-2 text-sm font-medium text-white">
                            Profile Picture
                        </label>
                        <input
                            type="url"
                            value={form.profilpicture}
                            onChange={handleChange}
                            name="profilpicture"
                            id="profilpicture"
                            className="input-style"
                        />
                    </div>

                    {/* Cover Image URL */}
                    <div className="mb-1">
                        <label htmlFor="coverpicture" className="block mb-2 text-sm font-medium text-white">
                            Cover Picture
                        </label>
                        <input
                            type="url"
                            value={form.coverpicture}
                            onChange={handleChange}
                            name="coverpicture"
                            id="coverpicture"
                            className="input-style"
                        />
                    </div>

                    {/* Razorpay ID */}
                    <div className="mb-1">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">
                            Razorpay Id
                        </label>
                        <input
                            type="text"
                            value={form.razorpayid}
                            onChange={handleChange}
                            name="razorpayid"
                            id="razorpayid"
                            className="input-style"
                        />
                    </div>

                    {/* Razorpay Secret */}
                    <div className="mb-5">
                        <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-white">
                            Razorpay Secret
                        </label>
                        <input
                            type="text"
                            value={form.razorpaySecret}
                            onChange={handleChange}
                            name="razorpaySecret"
                            id="razorpaySecret"
                            className="input-style"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary w-full"
                    >
                        Save
                    </button>
                </form>

                {/* Recent Payments */}
                <div className="recent-payments my-8 p-4 bg-slate-800/40 rounded-lg w-full max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Your Recent Payments</h2>

                    {payments.length === 0 ? (
                        <p className="text-slate-400 text-center">No payments received yet.</p>
                    ) : (
                        <ul>
                            {payments.map((p) => (
                                <li
                                    key={p._id}
                                    className="flex justify-between items-center bg-slate-700/60 p-4 rounded-lg mb-2"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-bold">{p.name} bought you a cup of chai!</span>
                                        <span className="text-sm text-slate-300">
                                            "{p.message}"
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold">₹{p.amount / 100}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

            </div>
        </>
    );
};

export default Dashboard;
