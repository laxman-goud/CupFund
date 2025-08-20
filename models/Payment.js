import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    to_user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order_id: { type: String, required: true, unique: true },
    message: { type: String, default: "" },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;