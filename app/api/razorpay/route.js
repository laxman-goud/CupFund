import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/app/lib/mongoose";
import Payment from "@/models/Payment";

export async function POST(request) {
    try {
        const body = await request.formData();
        const razorpay_order_id = body.get("razorpay_order_id");
        const razorpay_payment_id = body.get("razorpay_payment_id");
        const razorpay_signature = body.get("razorpay_signature");

        const shasum = crypto.createHmac("sha256", process.env.RAZOR_PAY_SECRET);
        shasum.update(razorpay_order_id + "|" + razorpay_payment_id);
        const digest = shasum.digest("hex");

        if (digest !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        await connectDB();
        await Payment.findOneAndUpdate(
            { order_id: razorpay_order_id },
            { status: "completed" }
        );

        return NextResponse.json({ status: "ok" });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
