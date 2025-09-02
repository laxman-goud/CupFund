import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment.model";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";

export const POST = async(req) => {
    try {
        await connectDB();
        const body = await req.formData();
        const paymentData = Object.fromEntries(body);

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentData;
        
        // Find the pending payment using the order ID
        const p = await Payment.findOne({ order_id: razorpay_order_id });
        if (!p) {
            return NextResponse.json({ success: false, message: "Order ID not found" }, { status: 404 });
        }

        // Fetch the user to get the Razorpay Secret
        const user = await User.findOne({ username: p.to_user });
        if (!user || !user.razorpaySecret) {
            return NextResponse.json({ success: false, message: "User or Razorpay secret not found" }, { status: 404 });
        }

        const secret = user.razorpaySecret;

        // Verify the payment signature
        const paymentVerified = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            secret
        );

        if (paymentVerified) {
            // Update the payment status in the database
            const updatedPayment = await Payment.findOneAndUpdate(
                { order_id: razorpay_order_id }, 
                { status: "completed", done: true },
                { new: true }
            );

            // Construct the absolute URL for redirection
            const redirectUrl = new URL(`/${updatedPayment.to_user}?paymentdone=true`, process.env.NEXT_PUBLIC_URL).toString();
            return NextResponse.redirect(redirectUrl);
        } else {
            return NextResponse.json({ success: false, message: "Payment verification failed" }, { status: 400 });
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
};
