import prisma from "@/lib/prisma/db";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (!user) {
          return null;
        }

        const isPwdMatching = user.password === credentials?.password;
        if (!isPwdMatching) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  // events: {
  //   async signIn({ user }) {},
  //   async signOut() {},
  // },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  // pages: {
  //   signIn: "/signin",
  // },
  secret: process.env.NEXTAUTH_SECRET,
};
