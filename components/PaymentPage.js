/* eslint-disable @next/next/no-img-element */

"use client"

import React from 'react'
import Script from 'next/script'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import { initiate } from '@/actions/userActions'
import { useState } from 'react'

/* global Razorpay */

const PaymentPage = () => {
    const { data: session } = useSession()
    const params = useParams()

    const [paymentForm, setpaymentForm] = useState({ name: "", message: "", amount: "" })
    const handleChange = (e) => {
        setpaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
    }

    const pay = async (amount) => {
        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    to_username: params.username,
                    paymentForm,
                }),
            });
            const order = await res.json();
            if (order.error) throw new Error(order.error);

            const options = {
                key: process.env.NEXT_PUBLIC_æ,
                amount: order.amount,
                currency: "INR",
                name: "Get Me A Chai",
                description: "Support the creator",
                order_id: order.id,
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                prefill: {
                    name: session?.user?.name || paymentForm.name,
                    email: session?.user?.email || "guest@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3399cc" },
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
        } catch (err) {
            console.error("Payment error:", err);
        }
    };


    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="username-page mb-10">
                <div className="cover-img relative">
                    <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-hash=Mh-B5X0fAjX72C_3Ggf-nQMUUe4b4Os4Y0qll01wqq4%3D&token-time=1756944000" alt="Dashboard Cover" className="w-full h-fit object-cover" />
                    <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=ifpNFYvVGjrV5NctWh_AlywBEGrHzzLChkjZlzXLwN4%3D&token-time=1756684800" alt="profile image" className='w-[150px] h-[150px] absolute left-[46%] -bottom-[90px] border-2 border-white rounded-full' />
                </div>
                <div className="info flex flex-col items-center">
                    <h1 className="username text-center mt-24 font-bold text-2xl">@{params.username}</h1>
                    <p className="about text-slate-400">helping small business by digital experiences</p>
                </div>
                <div className="payment w-[90%] mx-auto flex justify-center items-center mt-10 gap-2.5">
                    <div className="make-payment w-1/2 max-w-[700px] h-[450px] bg-slate-900">
                        <h2 className="font-bold p-4 text-2xl">Make Payment</h2>
                        <form className='flex flex-col gap-2.5 p-4'>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className="p-2 rounded-md bg-slate-800 text-white"
                                onChange={handleChange}
                                value={paymentForm.name}
                            />
                            <textarea
                                name="message"
                                placeholder="Message to creator"
                                className="p-2 rounded-md bg-slate-800 text-white"
                                rows={3}
                                onChange={handleChange}
                                value={paymentForm.message}
                            />
                            <input
                                name="amount"
                                type="number"
                                placeholder="Enter Amount"
                                className="p-2 rounded-md bg-slate-800 text-white"
                                onChange={handleChange}
                                value={paymentForm.amount}
                            />
                            <div className='flex gap-2.5'>
                                <button type='button' onClick={() => pay(10)} className='bg-slate-600 text-white p-2 rounded-md'>₹10</button>
                                <button type='button' onClick={() => pay(20)} className='bg-slate-600 text-white p-2 rounded-md'>₹20</button>
                                <button type='button' onClick={() => pay(50)} className='bg-slate-600 text-white p-2 rounded-md'>₹50</button>
                                <button type='button' onClick={() => pay(100)} className='bg-slate-600 text-white p-2 rounded-md'>₹100</button>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
                                        alert("Please enter a valid amount");
                                        return;
                                    }
                                    pay(Number(paymentForm.amount)); // use entered amount
                                }}
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl 
                                    focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 
                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            >
                                Pay
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage