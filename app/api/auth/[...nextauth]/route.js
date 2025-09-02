import NextAuth from 'next-auth'
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from '@/models/User';
import { connectDB } from '@/app/lib/mongoose';


export const authoptions = NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB()
      if (account.provider === 'github') {
        // Check if user already exists
        const currentUser = await User.findOne({ email: user.email })

        if (!currentUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split('@')[0],
            name: user.name
          })
        }
        return true
      }
      if (account.provider === "google") {
        // Check if user already exists
        const currentUser = await User.findOne({ email: user.email })

        if (!currentUser) {
          const newUser = await User.create({
            email: user.email,
            username: user.email.split('@')[0],
            name: user.name
          })
        }
        return true
      }
      return true
    },
    async session({ session, token, user }) {
      // Find user in database based on email and add username to the session
      const dbUser = await User.findOne({ email: session.user.email });
      if (dbUser) {
        session.user.username = dbUser.username;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  }
});

export { authoptions as GET, authoptions as POST }
