"use client"

import React, { useState } from 'react'
import Script from 'next/script'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"

/* global Razorpay */

const PaymentPage = ({ profile }) => {
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
                key: process.env.NEXT_PUBLIC_RAZOR_PAY_ID,
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
            alert("Payment failed. Please try again.")
        }
    };

    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <div className="username-page mb-10">
                <div className="cover-img relative">
                    <img src={profile.coverPic || "https://placehold.co/1920x400/00091d/ffffff?text=Cover+Image"} alt="Dashboard Cover" className="w-full h-[400px] object-cover" />
                    <img src={profile.profilePic || "/avatar.gif"} alt="profile image" className='w-[150px] h-[150px] absolute left-[46%] -bottom-[90px] border-2 border-white rounded-full' />
                </div>
                <div className="info flex flex-col items-center">
                    <h1 className="username text-center mt-24 font-bold text-2xl">@{profile.username}</h1>
                    <p className="about text-slate-400">{profile.name}</p>
                </div>
                <div className="payment w-[90%] mx-auto flex justify-center items-center mt-10 gap-2.5">
                    <div className="make-payment w-full md:w-1/2 max-w-[700px] bg-slate-900 rounded-xl shadow-lg">
                        <h2 className="font-bold p-4 text-2xl">Make a Payment</h2>
                        <form className='flex flex-col gap-2.5 p-4'>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className="p-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-slate-500"
                                onChange={handleChange}
                                value={paymentForm.name}
                            />
                            <textarea
                                name="message"
                                placeholder="Message to creator"
                                className="p-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-slate-500"
                                rows={3}
                                onChange={handleChange}
                                value={paymentForm.message}
                            />
                            <input
                                name="amount"
                                type="number"
                                placeholder="Enter Amount"
                                className="p-2 rounded-md bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-slate-500"
                                onChange={handleChange}
                                value={paymentForm.amount}
                            />
                            <div className='flex gap-2.5'>
                                <button type='button' onClick={() => pay(10)} className='bg-slate-600 text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200'>₹10</button>
                                <button type='button' onClick={() => pay(20)} className='bg-slate-600 text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200'>₹20</button>
                                <button type='button' onClick={() => pay(50)} className='bg-slate-600 text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200'>₹50</button>
                                <button type='button' onClick={() => pay(100)} className='bg-slate-600 text-white p-2 rounded-md hover:bg-slate-500 transition-colors duration-200'>₹100</button>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    if (!paymentForm.amount || Number(paymentForm.amount) <= 0) {
                                        // Using a custom alert for better UI
                                        alert("Please enter a valid amount");
                                        return;
                                    }
                                    pay(Number(paymentForm.amount));
                                }}
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
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
