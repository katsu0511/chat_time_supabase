import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserForLogin, getUser } from '@/lib/getter';
import { compare } from 'bcrypt';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'UserID', type: 'text', placeholder: 'User ID' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await getUserForLogin(credentials.userId as string);
        if (!user) return null;
        const isValid = await compare(credentials.password as string, user.password);
        if (!isValid) return null;
        return await getUser(credentials.userId as string, user.password);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 7 * 24 * 60 * 60
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
