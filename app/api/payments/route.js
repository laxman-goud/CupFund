import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function GET(request) {
    try {
        await connectDB();
        const username = request.nextUrl.searchParams.get("username");
        const user = await User.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const payments = await Payment.find({ to_user: user._id, status: "completed" }).sort({ createdAt: -1 });

        return NextResponse.json({ payments });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
