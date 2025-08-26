"use server"

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { connectDB } from "@/app/lib/mongoose";

export const initiate = async (amount, to_username, paymentForm) => {
    await connectDB();

    var instance = new Razorpay({
        key_id: process.env.RAZOR_PAY_ID,
        key_secret: process.env.RAZOR_PAY_SECRET,
    });

    let options = {
        amount: Number.parseInt(amount), // amount in the smallest currency unit
        currency: "INR",
    };

    let order = await instance.orders.create(options);

    // create a payment object shows pending payment in db
    await Payment.create({
        oid: order.id,
        amount: amount,
        to_username: to_username,
        name: paymentForm.name,
        message: paymentForm.message
    });

    return order  ;
    
};