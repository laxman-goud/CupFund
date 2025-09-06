// app/api/user/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";

export async function GET(request) {
    try {
        await connectDB();
        const username = request.nextUrl.searchParams.get("username");
        if (!username) {
            return NextResponse.json({ error: "username is required" }, { status: 400 });
        }

        const user = await User.findOne({ username }).lean();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
