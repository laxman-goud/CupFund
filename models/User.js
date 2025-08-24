import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    profilePic: { type: String, default: "" },
    coverPic: { type: String, default: "" },
    razorpayId: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);