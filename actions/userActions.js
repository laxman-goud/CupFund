"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment.model";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

/**
 * Initiates a new Razorpay order.
 * @param {number} amount - The amount to be paid in paise.
 * @param {string} to_username - The username of the recipient.
 * @param {object} paymentform - The form data for the payment.
 * @returns {object} The Razorpay order object or an error.
 */
export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();
    const user = await User.findOne({ username: to_username });

    if (!user || !user.razorpayid || !user.razorpaySecret) {
        return { success: false, error: "Razorpay keys are not configured for this user." };
    }

    const instance = new Razorpay({ key_id: user.razorpayid, key_secret: user.razorpaySecret });

    const options = {
        amount: Number.parseInt(amount), // amount in paise
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
    };

    try {
        let order = await instance.orders.create(options);

        // Create a payment object that shows the pending payment in the database
        await Payment.create({
            order_id: order.id,
            amount: Number.parseInt(amount),
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message,
            status: "pending",
        });
        return order;
    } catch (error) {
        console.error("Error initiating payment:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Fetches user data by username.
 * @param {string} username - The username to fetch.
 * @returns {string} A JSON string of the user object or an error.
 */
export const fetchUser = async (username) => {
    await connectDB();
    let u = await User.findOne({ username: username });
    if (u) {
        let user = u.toObject({ flattenObjectIds: true });
        return JSON.stringify(user);
    }
    return JSON.stringify({ error: "User not found" });
};

/**
 * Fetches completed payments for a given username.
 * @param {string} username - The username to fetch payments for.
 * @returns {string} A JSON string of the payments array.
 */
export const fetchPayments = async (username) => {
    await connectDB();
    let payments = await Payment.find({ to_user: username, status: "completed" })
        .sort({ createdAt: -1 })
        .lean(true);
    return JSON.stringify(payments);
};

/**
 * Updates a user's profile.
 * @param {object} formData - The new profile data.
 * @param {string} oldUsername - The user's current username.
 * @returns {string} A JSON string with the update status and message.
 */
export const updateProfile = async (formData, oldUsername) => {
    await connectDB();

    // Find the user to update based on the old username
    const userToUpdate = await User.findOne({ username: oldUsername });
    if (!userToUpdate) {
        return JSON.stringify({
            success: false,
            message: "User not found for update.",
        });
    }

    // Check if the new username already exists and is not the current user's
    if (oldUsername !== formData.username) {
        const existingUserWithNewUsername = await User.findOne({
            username: formData.username,
        });
        if (existingUserWithNewUsername) {
            return JSON.stringify({
                success: false,
                message: "Username already exists. Please choose a different one.",
            });
        }

        // Update the username in the User collection
        userToUpdate.username = formData.username;

        // Update all related payments with the new username
        await Payment.updateMany(
            { to_user: oldUsername },
            { $set: { to_user: formData.username } }
        );
    }

    // Update other profile fields
    userToUpdate.name = formData.name;
    userToUpdate.profilePicture = formData.profilePicture;
    userToUpdate.coverPicture = formData.coverPicture;
    userToUpdate.razorpayid = formData.razorpayid;
    userToUpdate.razorpaySecret = formData.razorpaySecret;

    await userToUpdate.save();

    // Revalidate the affected paths to show the changes immediately
    revalidatePath("/profile");
    revalidatePath(`/${formData.username}`);

    return JSON.stringify({
        success: true,
        message: "Profile Updated Successfully",
        data: userToUpdate,
    });
};
