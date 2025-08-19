/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const Dashboard = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        }
    }, [status, router])

    if (status === "loading") {
        return <p className="text-center h-[84vh]">Loading...</p>
    }

    if (!session) {
        return null
    }

    return (
        <>
            <div className="dashboard-page h-[84vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center">
                    Welcome to your Dashboard, {session.user.name || session.user.email}
                </h1>
                <form className="w-full max-w-md shadow-lg rounded-lg p-6 flex flex-col gap-2" action="">
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-1.5 font-semibold">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-1.5 font-semibold">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username" className="mb-1.5 font-semibold">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="profile-pic" className="mb-1.5 font-semibold">
                            Profile Picture URL:
                        </label>
                        <input
                            type="text"
                            id="profile-pic"
                            name="profile-pic"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="cover-pic" className="mb-1.5 font-semibold">
                            Cover Picture URL:
                        </label>
                        <input
                            type="text"
                            id="cover-pic"
                            name="cover-pic"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="razorpay-id" className="mb-1.5 font-semibold">
                            Razorpay ID:
                        </label>
                        <input
                            type="text"
                            id="razorpay-id"
                            name="razorpay-id"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <label htmlFor="razorpay-id" className="mb-1.5 font-semibold">
                            Razorpay Secret:
                        </label>
                        <input
                            type="text"
                            id="razorpay-id"
                            name="razorpay-id"
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-1.5 ">Save changes</button>
                </form>
            </div>
        </>
    )
}

export default Dashboard