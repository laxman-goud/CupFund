/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"

const Username = () => {
    const params = useParams()
    return (
        <div>
            <div className="cover-img relative">
                <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-hash=Mh-B5X0fAjX72C_3Ggf-nQMUUe4b4Os4Y0qll01wqq4%3D&token-time=1756944000" alt="Dashboard Cover" className="w-full h-fit object-cover" />
                <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=ifpNFYvVGjrV5NctWh_AlywBEGrHzzLChkjZlzXLwN4%3D&token-time=1756684800" alt="profile image" className='w-[150px] h-[150px] absolute left-[46%] -bottom-[90px] border-2 border-white rounded-full' />
            </div>
            <div className="info flex flex-col items-center">
                <h1 className="username text-center mt-24 font-bold text-2xl">@{params.username}</h1>
                <p className="about">helping small business by digital experiences</p>
                <p className="details">120 posts, 345 members, 450 releases</p>
            </div>
        </div>
    )
}

export default Username