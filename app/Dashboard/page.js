"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [form, setForm] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        username: session?.user?.username || "",
        profilePic: session?.user?.profilePic || "",
        coverPic: session?.user?.coverPic || "",
        razorpayId: "",
        razorpaySecret: ""
    })
    const [payments, setPayments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
        // Only fetch data if the session is available
        if (session) {
            setLoading(false)
            fetchPayments()
            // Initialize form with data from the session
            setForm({
                name: session.user.name || "",
                email: session.user.email || "",
                username: session.user.username || "",
                profilePic: session.user.profilePic || "",
                coverPic: session.user.coverPic || "",
                razorpayId: "", // This needs to be fetched from the database
                razorpaySecret: "" // This needs to be fetched from the database
            });
        }
    }, [status, router, session])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const saveChanges = async (e) => {
        e.preventDefault()
        try {
            const res = await fetch("/api/update-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            })
            const data = await res.json()
            if (data.success) {
                alert("Profile updated successfully!")
            } else {
                alert("Failed to update profile.")
            }
        } catch (error) {
            console.error("Error updating profile:", error)
        }
    }

    const fetchPayments = async () => {
        try {
            // Corrected: use the user's unique ID to fetch payments
            const res = await fetch(`/api/payments?userId=${session.user.id}`)
            const data = await res.json()
            setPayments(data.payments)
        } catch (error) {
            console.error("Error fetching payments:", error)
        }
    }

    if (status === "loading" || loading) {
        return <p className="text-center h-[84vh]">Loading...</p>
    }

    if (!session) {
        return null
    }

    return (
        <>
            <div className="dashboard-page h-[84vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                    Welcome to your Dashboard, {session.user.username}
                </h1>
                <form className="w-full max-w-md shadow-lg rounded-lg p-6 flex flex-col gap-2" onSubmit={saveChanges}>
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1.5 font-semibold">Name:</label>
                        <input type="text" id="name" name="name" onChange={handleChange} value={form.name} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1.5 font-semibold">Email:</label>
                        <input type="email" id="email" name="email" readOnly value={form.email} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1.5 font-semibold">Username:</label>
                        <input type="text" id="username" name="username" onChange={handleChange} value={form.username} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="profilePic" className="mb-1.5 font-semibold">Profile Picture URL:</label>
                        <input type="text" id="profilePic" name="profilePic" onChange={handleChange} value={form.profilePic} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="coverPic" className="mb-1.5 font-semibold">Cover Picture URL:</label>
                        <input type="text" id="coverPic" name="coverPic" onChange={handleChange} value={form.coverPic} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="razorpayId" className="mb-1.5 font-semibold">Razorpay ID:</label>
                        <input type="text" id="razorpayId" name="razorpayId" onChange={handleChange} value={form.razorpayId} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        <label htmlFor="razorpaySecret" className="mb-1.5 font-semibold">Razorpay Secret:</label>
                        <input type="text" id="razorpaySecret" name="razorpaySecret" onChange={handleChange} value={form.razorpaySecret} className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    </div>
                    <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1.5 ">Save changes</button>
                </form>

                <div className="recent-payments my-8 p-4 bg-slate-800 rounded-lg w-full max-w-2xl">
                    <h2 className="text-2xl font-bold mb-4">Your Recent Payments</h2>
                    {payments.length === 0 ? (
                        <p className="text-slate-400">No payments received yet.</p>
                    ) : (
                        <ul>
                            {payments.map((p, index) => (
                                <li key={index} className="flex justify-between items-center bg-slate-700 p-2 rounded-lg mb-2">
                                    <div className="flex flex-col">
                                        <span className="font-bold">{p.name} bought you a chai!</span>
                                        <span className="text-sm text-slate-300">{p.message}</span>
                                    </div>
                                    <span className="text-lg font-bold">₹{p.amount / 100}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    )
}

export default Dashboard
