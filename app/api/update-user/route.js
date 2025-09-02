import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authoptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function POST(request) {
    try {
        await connectDB();
        const session = await getServerSession(authoptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, username, profilpicture, coverpicture, razorpayid, razorpaySecret } =
            await request.json();
        const email = session.user.email;

        // Check if the new username already exists and is not the current user's username
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser.email !== email) {
            return NextResponse.json(
                { success: false, message: "Username already exists" },
                { status: 409 }
            );
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, username, profilpicture, coverpicture, razorpayid, razorpaySecret },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        revalidatePath("/profile");
        revalidatePath(`/${username}`);

        return NextResponse.json({ success: true, message: "Profile updated successfully!", user: updatedUser });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
