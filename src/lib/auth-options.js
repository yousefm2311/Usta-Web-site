import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import AdminUser from "@/models/AdminUser";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const headerValue =
          typeof req?.headers?.get === "function"
            ? req.headers.get("x-forwarded-for")
            : req?.headers?.["x-forwarded-for"] || req?.headers?.["X-Forwarded-For"];
        const ip = headerValue?.split(",")[0] || "unknown";
        const limiter = rateLimit(`login:${ip}`);
        if (!limiter.allowed) {
          throw new Error("تم تجاوز عدد المحاولات، حاول لاحقاً");
        }

        await dbConnect();
        const user = await AdminUser.findOne({ email: credentials?.email?.toLowerCase() });
        if (!user || user.disabled) {
          throw new Error("بيانات الدخول غير صحيحة");
        }

        const isValid = await bcrypt.compare(credentials?.password || "", user.passwordHash);
        if (!isValid) {
          throw new Error("بيانات الدخول غير صحيحة");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login"
  },
  secret: process.env.NEXTAUTH_SECRET
};
