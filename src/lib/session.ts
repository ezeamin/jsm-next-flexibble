import { NextAuthOptions } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import jsonwebtoken from 'jsonwebtoken';

import { SessionInterface, UserProfile } from '../../common';
import { createUser, getUser } from './actions';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: 'grafbase',
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
      );

      return encodedToken;
    },
    decode: ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;

      return decodedToken;
    },
  },
  theme: {
    colorScheme: 'light',
    logo: '/logo.png',
  },
  callbacks: {
    async session({ session }) {
      const email = (session.user?.email as string) || '';
      try {
        const data = (await getUser(email)) as { user?: UserProfile };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data.user,
          },
        };
        return newSession;
      } catch (error: any) {
        console.log('Error retrieving user data', error);
        return session;
      }
    },
    async signIn({ user }) {
      try {
        // get the user if they exist
        const userExists = (await getUser(user.email as string)) as {
          user?: UserProfile;
        };

        // if they don't exist, create them
        if (!userExists.user) {
          await createUser({
            name: user.name as string,
            email: user.email as string,
            avatarUrl: user.image as string,
          });
        }

        return true;
      } catch (error: any) {
        console.log(error);
        return false;
      }
    },
  },
};

export const getCurrentUser = async () => {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
};
