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
        return <p className="text-center">Loading...</p>
    }

    if (!session) {
        return null
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center">Welcome to your Dashboard, {session.user.name || session.user.email}</h1>
            <p className="text-center mt-4">Here you can manage your account and view your contributions.</p>
        </div>
    )
}

export default Dashboard