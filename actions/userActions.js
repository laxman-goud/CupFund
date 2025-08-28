"use server"

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { connectDB } from "@/app/lib/mongoose";

// ... (imports)

export async function POST(request) {
    try {
        const { amount, to_username, paymentForm } = await request.json();
        await connectDB();

        const toUser = await User.findOne({ username: to_username });
        if (!toUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const instance = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_ID,
            key_secret: process.env.RAZOR_PAY_SECRET,
        });

        const order = await instance.orders.create({
            amount: amount * 100, // amount is in paise 
            currency: "INR",
            receipt: `rcpt_${Date.now()}`,
        });

        await Payment.create({
            order_id: order.id,
            to_user: toUser._id,
            name: paymentForm.name || "Anonymous",
            message: paymentForm.message || "",
            amount: amount * 100, 
            status: "pending",
        });

        return NextResponse.json(order);
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}