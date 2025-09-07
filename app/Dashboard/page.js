"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchUser, updateProfile } from "@/action/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/Loader";

const Dashboard = () => {
    const { data: session, status, update } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        profilpicture: "",
        coverpicture: "",
        razorpayid: "",
        razorpaySecret: "",
    });
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = useCallback(async () => {
        if (session && session.user?.name) {
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

    const getData = useCallback(async () => {
        setLoading(true);
        if (session && session.user?.name) {
            const data = await fetchUser(session.user.name);
            const userData = JSON.parse(data);
            if (userData.error) {
                toast.error(userData.error);
                setForm({
                    ...form,
                    email: session.user.email,
                });
            } else {
                setForm({
                    name: userData.name || "",
                    email: userData.email || "",
                    username: userData.username || "",
                    profilpicture: userData.profilpicture || "",
                    coverpicture: userData.coverpicture || "",
                    razorpayid: userData.razorpayid || "",
                    razorpaySecret: userData.razorpaySecret || "",
                });
                await fetchPayments();
            }
        }
        setLoading(false);
    }, [session, form, fetchPayments]);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
        if (session) {
            getData();
        }
    }, [session, status, router, getData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "username") {
            const slugName = value.replace(/[^\w-]+/g, "").toLowerCase();
            setForm({ ...form, username: slugName });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const response = await updateProfile(form, session.user.name);
        const result = JSON.parse(response);
        setLoading(false);
        if (result.success) {
            toast.success(result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            await update();
        } else {
            toast.error(result.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    };

    if (status === "loading" || loading) {
        return <Loader />;
    }

    return (
        <>
            <ToastContainer />
            <div className="dashboard-page min-h-screen">
                <h2 className="text-2xl font-bold text-center py-5">
                    Welcome to your dashboard
                </h2>
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
                            value={form.name || ""}
                            onChange={handleChange}
                            name="name"
                            id="name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Email */}
                    <div className="mb-1">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            value={form.email || ""}
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 dark:border-gray-600 text-gray-900/70 text-sm rounded-lg block w-full px-2.5 py-1 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white/70 focus-visible:outline-none cursor-not-allowed"
                            readOnly
                            title="Email can't be modified"
                        />
                    </div>
                    {/* Username */}
                    <div className="mb-1">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">
                            Username
                        </label>
                        <input
                            type="text"
                            value={form.username || ""}
                            onChange={handleChange}
                            name="username"
                            id="username"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Profile Picture */}
                    <div className="mb-1">
                        <label htmlFor="profilpicture" className="block mb-2 text-sm font-medium text-white">
                            Profile Picture
                        </label>
                        <input
                            type="url"
                            value={form.profilpicture || ""}
                            onChange={handleChange}
                            name="profilpicture"
                            id="profilpicture"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Cover Image */}
                    <div className="mb-1">
                        <label htmlFor="coverpicture" className="block mb-2 text-sm font-medium text-white">
                            Cover Picture
                        </label>
                        <input
                            type="url"
                            value={form.coverpicture || ""}
                            onChange={handleChange}
                            name="coverpicture"
                            id="coverpicture"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Razorpay Id */}
                    <div className="mb-1">
                        <label htmlFor="razorpayid" className="block mb-2 text-sm font-medium text-white">
                            Razorpay Id
                        </label>
                        <input
                            type="text"
                            value={form.razorpayid || ""}
                            onChange={handleChange}
                            name="razorpayid"
                            id="razorpayid"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                            name="razorpaySecret"
                            id="razorpaySecret"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    {/* Save button */}
                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </form>

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
                                            &quot;{p.message}&quot;
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
