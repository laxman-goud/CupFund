import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment.model";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import Razorpay from "razorpay";

export const POST = async(req) => {
    await connectDB()
    let body = await req.formData()
    body = Object.fromEntries(body)

    // check if razorpay id is present on server
    let p = await Payment.findOne({oid: body.razorpay_order_id})
    if(!p){
        return NextResponse.json({success: false, message: "OrderId Not found"})
    }

    // fetch the user to get razorpay Secret
    let user = await User.findOne({username: p.to_user})
    if(!user){
        return NextResponse.json({success: false, message: "User not found"})
    }
    const secret = user.razorpaySecret


    // verify the payment 
    let paymentVerify = validatePaymentVerification({"order_id" : body.razorpay_order_id , "payment_id" : body.razorpay_payment_id}, body.razorpay_signature, secret)

    if(paymentVerify){
        // update the payment in the database
        const updatedPayment = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {done : true} , {new: true})
       // Construct the absolute URL for redirection
       const redirectUrl = new URL(`/${updatedPayment.to_user}?paymentdone=true`, process.env.NEXT_PUBLIC_URL).toString();
       console.log("redirect " , redirectUrl)
       return NextResponse.redirect(redirectUrl);
    }
    else{
        return NextResponse.json({success: false, message: "Payment verification failed"})
    }
}