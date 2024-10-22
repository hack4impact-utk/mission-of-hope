import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import dbConnect from '@/utils/db-connect';
import { getUserByEmail } from '@/server/actions/users';

const clientPromise = dbConnect().then((mon) => {
  return mon.connection.getClient() as unknown as Promise<MongoClient>;
});

export const handler: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise as Promise<MongoClient>),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: false,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.data && session.user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session.user.isAdmin = (token.data as any).isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      if (token.email) {
        try {
          const user = await getUserByEmail(token.email);
          token.data = user;
        } catch {}
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};
