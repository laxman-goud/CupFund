import mongoose from "mongoose";

let isConnected = false; // Track the connection status

export const connectDB = async () => {
    if (isConnected) {
        console.log("✅ MongoDB connected");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "get-me-a-chai",
        });

        isConnected = conn.connections[0].readyState === 1;
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
    }
};
