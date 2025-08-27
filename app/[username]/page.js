"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import PaymentPage from '@/components/PaymentPage'

const Username = () => {
    const params = useParams()
    return (
        <>
            <PaymentPage />
        </>
    )
}

export default Username