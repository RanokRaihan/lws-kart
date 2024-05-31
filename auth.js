import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { AuthError } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./lib/db";
import User from "./models/user.model";
import dbConnect from "./services/dbConnect";

class EmailAuthError extends AuthError {
  message = "User Not Found!";
}
class PasswordAuthError extends AuthError {
  message = "Password does not match!";
}
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialProvider({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!(email && password)) {
          return null;
        }

        await dbConnect();
        const user = await User.findOne({ email: email });
        if (!user) {
          // throw new Error("user not found");
          throw new EmailAuthError();
        }

        const isValidPassword = await user.comparePassword(
          credentials.password
        );
        if (!isValidPassword) {
          // throw new Error("incorrect password!");
          throw new PasswordAuthError();
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "database",
  },
  jwt: {
    secret: process.env.AUTH_SECRET, // Same secret as above
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Add user info to token
      }
      return token;
    },
    async session({ session, user }) {
      console.log(user);

      // Add user info to the session object
      session.user.id = user.id;
      session.user.name = user.name;
      session.user.email = user.email;
      return session;
    },
  },
  pages: {
    error: "/api/auth/error",
  },
});
