// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (user && await bcrypt.compare(credentials.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, token, user }) {
      session.user = user || token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = { id: user.id, email: user.email };
      }
      return token;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
            update: {
              userId: existingUser.id,
            },
            create: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
              refresh_token_expires_in: account.refresh_token_expires_in,
            },
          });
          user.id = existingUser.id;
        } else {
          const newUser = await prisma.user.create({
            data: {
              email: user.email,
              name: user.name || "",
              password: "", // Provide a default or empty password for OAuth users
              phone: null,
            },
          });

          await prisma.account.create({
            data: {
              userId: newUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
              expires_at: account.expires_at,
              token_type: account.token_type,
              scope: account.scope,
              id_token: account.id_token,
              session_state: account.session_state,
              refresh_token_expires_in: account.refresh_token_expires_in,
            },
          });

          user.id = newUser.id;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login?error=AccessDenied",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
