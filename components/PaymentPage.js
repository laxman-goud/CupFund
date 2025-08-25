"use client"

import React from 'react'
import Script from 'next/script'
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"

const PaymentPage = () => {
    const params = useParams()
    const pay = (amount, orderId) => {
        var options = {
            "key": process.env.RAZOR_PAY_ID, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Get Me A Chai",
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.URL}/api/razorpay`,
            "prefill": {
                "name": "Laxman Goud",
                "email": "laxman@test.com",
                "contact": "9212345678"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
        // e.preventDefault();
    }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            {/* <button id="rzp-button1" style={{ margin: "20px", padding: "10px 20px" }}>Pay Now</button> */}

            <div className="username-page mb-10">
                <div className="cover-img relative">
                    <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxOTIwLCJ3ZSI6MX0%3D/18.gif?token-hash=Mh-B5X0fAjX72C_3Ggf-nQMUUe4b4Os4Y0qll01wqq4%3D&token-time=1756944000" alt="Dashboard Cover" className="w-full h-fit object-cover" />
                    <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/aa52624d1cef47ba91c357da4a7859cf/eyJoIjozNjAsInciOjM2MH0%3D/4.gif?token-hash=ifpNFYvVGjrV5NctWh_AlywBEGrHzzLChkjZlzXLwN4%3D&token-time=1756684800" alt="profile image" className='w-[150px] h-[150px] absolute left-[46%] -bottom-[90px] border-2 border-white rounded-full' />
                </div>
                <div className="info flex flex-col items-center">
                    <h1 className="username text-center mt-24 font-bold text-2xl">@{params.username}</h1>
                    <p className="about text-slate-400">helping small business by digital experiences</p>
                    <p className="details text-slate-400">120 posts, 345 members, 450 releases</p>
                </div>
                <div className="payment w-[90%] mx-auto flex justify-center items-center mt-10 gap-2.5">
                    <div className="supporters w-1/2 max-w-[700px] h-[450px] bg-slate-900">
                        <h2 className="font-bold p-4 text-2xl">Supporters</h2>
                        <ul className='donators-list flex flex-col justify-center gap-2.5 pl-8'>
                            <li className='flex items-center gap-2.5'>
                                <img src="/avatar.gif" alt="avatar" width={40} />
                                <p className='text-md'>
                                    Raju donated <span className="donated-amount font-bold">$36</span> with message &quot; I support you bro. Lots of love  &ldquo;
                                </p>
                            </li>
                            <li className='flex items-center gap-2.5'>
                                <img src="/avatar.gif" alt="avatar" width={40} />
                                <p className='text-md'>
                                    Raju donated <span className="donated-amount font-bold">$36</span> with message &quot; I support you bro. Lots of love  &ldquo;
                                </p>
                            </li>
                            <li className='flex items-center gap-2.5'>
                                <img src="/avatar.gif" alt="avatar" width={40} />
                                <p className='text-md'>
                                    Raju donated <span className="donated-amount font-bold">$36</span> with message &quot; I support you bro. Lots of love  &ldquo;
                                </p>
                            </li>
                            <li className='flex items-center gap-2.5'>
                                <img src="/avatar.gif" alt="avatar" width={40} />
                                <p className='text-md'>
                                    Raju donated <span className="donated-amount font-bold">$36</span> with message &quot; I support you bro. Lots of love  &ldquo;
                                </p>
                            </li>
                            <li className='flex items-center gap-2.5'>
                                <img src="/avatar.gif" alt="avatar" width={40} />
                                <p className='text-md'>
                                    Raju donated <span className="donated-amount font-bold">$36</span> with message &quot; I support you bro. Lots of love  &ldquo;
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div className="make-payment w-1/2 max-w-[700px] h-[450px] bg-slate-900">
                        <h2 className="font-bold p-4 text-2xl">Make Payment</h2>
                        <form className='flex flex-col gap-2.5 p-4'>
                            <input type="text" placeholder='Your Name' className='p-2 rounded-md bg-slate-800 text-white' />
                            <textarea placeholder='Message to creator' className='p-2 rounded-md bg-slate-800 text-white' rows={3}></textarea>
                            {/* or choose from this amounts */}
                            <input type="text" placeholder='Enter Amount' className='p-2 rounded-md bg-slate-800 text-white' />
                            <div className='flex gap-2.5'>
                                <button type='button' className='bg-slate-600 text-white p-2 rounded-md w-18'>₹10</button>
                                <button type='button' className='bg-slate-600 text-white p-2 rounded-md w-18'>₹20</button>
                                <button type='button' className='bg-slate-600 text-white p-2 rounded-md w-18'>₹50</button>
                                <button type='button' className='bg-slate-600 text-white p-2 rounded-md w-18'>₹100</button>
                            </div>
                            <button type="button" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage