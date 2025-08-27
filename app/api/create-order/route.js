import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { connectDB } from "@/app/lib/mongoose";
import Payment from "@/models/Payment";
import User from "@/models/User";

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
            amount: amount * 100, // convert to paise
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
