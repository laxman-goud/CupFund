import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";

export async function GET(request, { params }) {
    try {
        await connectDB();
        const username = params.username;

        const user = await User.findOne({ username }).select("-razorpayId -razorpaySecret"); // Exclude sensitive info

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
