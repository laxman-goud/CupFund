/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useCallback } from "react";
import Script from "next/script";
import { initiate, fetchUser, fetchPayments } from "@/action/useractions";
import { useSession } from "next-auth/react";
import Loader from "./Loader";
import CoverpicSkeleteon from "./CoverpicSkeleteon";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useRouter } from "next/navigation";

const PaymentPage = ({ username }) => {
  // Logged-in user info
  const { data: session } = useSession();

  // Form state for name, message, amount
  const [paymentform, setPaymentform] = useState({ name: "", message: "", amount: "" });

  // Creator (public page owner) details
  const [currentUser, setCurrentUser] = useState({});

  // List of payments/supporters
  const [payments, setPayments] = useState([]);

  // Loading UI state
  const [loading, setLoading] = useState(false);

  // For reading URL query params
  const searchParams = useSearchParams();

  // Router instance
  const router = useRouter();

  // Fetch profile + supporter data
  const getData = useCallback(async () => {
    setLoading(true);

    const u = await fetchUser(username);
    setCurrentUser(JSON.parse(u)); // Save creator details

    const paymentData = await fetchPayments(username);
    setPayments(JSON.parse(paymentData)); // Save supporters list

    setLoading(false);
  }, [username]);

  // Fetch data on mount or username change
  useEffect(() => {
    getData();
  }, [getData]);

  // Show toast if redirected after successful payment
  useEffect(() => {
    if (searchParams.get("paymentdone") === "true") {
      toast("Payment Has Been made", { position: "top-right", autoClose: 5000, theme: "dark", transition: Bounce });
      router.push(`/${username}`); // Clear query param
    }
  }, [searchParams, router, username]);

  // Update form fields
  const handelChange = (e) => {
    setPaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  // Main Razorpay payment handler
  const pay = async (amount) => {
    // Generate order from backend
    let a = await initiate(amount, username, paymentform);

    // Handle backend errors
    if (a.success === false) {
      toast.error(a.error);
      return;
    }

    let orderId = a.id;

    // Razorpay configuration
    var options = {
      key: currentUser.razorpayid, // Creator's Razorpay key
      amount,
      currency: "INR",
      name: "CupFund",
      description: "Support Creator",
      image: "/tea.gif",
      order_id: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      prefill: {
        name: paymentform.name,
        email: session?.user?.email,
        contact: "9999999999",
      },
      notes: { address: "Razorpay Corporate Office" },
      theme: { color: "#3399cc" },
    };

    // Open Razorpay modal
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  // Pay with custom amount
  const handleSupportButton = () => {
    pay(paymentform.amount * 100);
  };

  return (
    <>
      {/* Razorpay Script */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={5000} theme="dark" transition={Bounce} />

      {/* Loading state */}
      {loading && <Loader />}

      {/* If user not found */}
      {currentUser.error && (
        <div className="text-center text-4xl my-20 font-extrabold text-white">
          User {username} not found ☹
        </div>
      )}

      {/* If user exists */}
      {!currentUser.error && (
        <>
          {/* Cover Image Section */}
          <div className="bg-cover relative w-full">
            {currentUser.coverPicture ? (
              <img
                className="object-cover h-40 md:h-[21rem] w-full"
                src={currentUser.coverPicture}
                alt="coverImage"
                onError={(e) => (e.target.src = "/avatar.gif")}
              />
            ) : (
              <CoverpicSkeleteon />
            )}

            {/* Profile Picture */}
            <div className="size-20 md:size-32 absolute mx-auto right-0 left-0 -bottom-12 md:-bottom-16 border-2 rounded-full bg-black overflow-hidden">
              <img
                className="object-cover size-20 md:size-32"
                src={currentUser.profilePicture || "/avatar.gif"}
                alt="avatarImage"
                onError={(e) => (e.target.src = "/avatar.gif")}
              />
            </div>
          </div>

          {/* Main Section */}
          <div className="info flex flex-col items-center justify-center py-20 text-white gap-2">
            <div className="font-bold text-lg">@{username}</div>

            <div className="text-slate-300">
              let&apos;s Help {username} to get a cup of tea
            </div>

            {/* Supporters Count + Total Raised */}
            <div className="text-slate-400">
              {payments.length} supporters · ₹{payments.reduce((a, b) => a + b.amount, 0) / 100} raised
            </div>

            {/* Payment Section */}
            <div className="payment flex flex-col-reverse md:flex-row gap-3 container mt-12 px-5 md:px-0">

              {/* Supporters List */}
              <div className="supporters w-full bg-slate-800/40 rounded-lg p-5 md:p-10 backdrop-blur-sm h-[28rem] overflow-auto">
                <h2 className="text-xl font-bold mb-5">Supporters</h2>

                {payments.length === 0 && (
                  <div className="text-center font-extrabold text-lg">No supporters yet ☹</div>
                )}

                <ul className="mx-2.5 md:mx-5 text-md">
                  {payments.map((p) => (
                    <li key={p._id} className="my-4 flex gap-2 items-center">
                      <img src="/avatar.gif" alt="user avatar" width={28} />
                      <span className="text-sm md:text-base">
                        {p.name} donated <span className="font-semibold">₹{p.amount / 100}</span> with a message "{p.message}"
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Make Payment Form */}
              <div className="makePayment w-full bg-slate-800/40 rounded-lg p-10 backdrop-blur-sm">
                <h2 className="text-xl font-bold mb-5">Make a payment</h2>

                <form className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-2 rounded-md bg-slate-800/40"
                    onChange={handelChange}
                    value={paymentform.name}
                    name="name"
                  />
                  <input
                    type="text"
                    placeholder="Message"
                    className="p-2 rounded-md bg-slate-800/40"
                    onChange={handelChange}
                    value={paymentform.message}
                    name="message"
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    className="p-2 rounded-md bg-slate-800/40"
                    onChange={handelChange}
                    value={paymentform.amount}
                    name="amount"
                  />

                  {/* Custom Support Button */}
                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-blue-500 to-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 disabled:bg-gray-500"
                    disabled={paymentform.name.length < 3 || paymentform.amount.length < 1}
                    onClick={handleSupportButton}
                  >
                    Support
                  </button>
                </form>

                {/* Quick Payment Buttons */}
                <div className="flex gap-3 mt-5">
                  {[10, 20, 50].map((amt) => (
                    <button
                      key={amt}
                      className="p-2 bg-slate-600/40 rounded-md hover:bg-slate-700/90 disabled:bg-slate-800/40"
                      onClick={() => pay(amt * 100)}
                      disabled={paymentform.name.length < 3}
                    >
                      Pay ₹{amt}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PaymentPage;