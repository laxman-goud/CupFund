"use client"
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation"
import PaymentPage from '@/components/PaymentPage'

const Username = () => {
    const params = useParams()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`/api/user/${params.username}`)
                const data = await res.json()
                setProfile(data.user)
            } catch (error) {
                console.error("Error fetching profile:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [params.username])

    if (loading) {
        return <p className="text-center h-[84vh]">Loading profile...</p>
    }

    if (!profile) {
        return <p className="text-center h-[84vh]">User not found</p>
    }

    return (
        <>
            <PaymentPage profile={profile} />
        </>
    )
}

export default Username
