import prisma from "@/app/lib/db";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user);
      try {
        // Ensure the user's email is available
        if (!user.email) {
          throw new Error("User email not available from provider.");
        }

        // Create or find the user in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // If the user doesn't exist, create a new record
          await prisma.user.create({
            data: {
              email: user.email,
              provider: "Google",
            },
          });
        }

        // Return true to allow the sign-in
        return true;
      } catch (e) {
        console.error("Error in signIn callback:", e);
        // Deny the sign-in by returning false
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
