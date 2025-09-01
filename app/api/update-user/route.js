import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";
import { getServerSession } from "next-auth"; // New import for session

export async function POST(request) {
    try {
        await connectDB();
        const session = await getServerSession(request); // Get the user's session
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, username, profilePic, coverPic, razorpayId, razorpaySecret } = await request.json();
        const email = session.user.email;

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, username, profilePic, coverPic, razorpayId, razorpaySecret },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}