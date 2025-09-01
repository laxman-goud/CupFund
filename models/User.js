import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    profilpicture: {
        type: String,
    },
    coverpicture: {
        type: String,
    },
    razorpayid: {
        type: String,
    },
    razorpaySecret: {
        type: String,
    }

}, { timestamps: true });

export default mongoose.models.User || model("User", UserSchema);