import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "@/app/lib/mongoose";
import User from "@/models/User";
import Payment from "@/models/Payment";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "github") {
                await connectDB();
                
                let currentUser = await User.findOne({ email: user.email });

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                    });
                    await newUser.save();
                    user.name = newUser.username; 
                    user.username = newUser.username; // Critical fix: Ensure username is set on the user object
                } else {
                    user.name = currentUser.username;
                    user.username = currentUser.username; // Critical fix: Ensure username is set on the user object
                }
            }
            return true;
        },

        async session({ session }) {
            await connectDB();
            const dbUser = await User.findOne({ email: session.user.email });

            if (dbUser) {
                session.user.name = dbUser.name; 
                session.user.username = dbUser.username; // Ensure session has the username from the database
                session.user.profilePic = dbUser.profilePic;
                session.user.coverPic = dbUser.coverPic;
                session.user.id = dbUser._id.toString(); 
            }

            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
