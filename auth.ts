import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { findUserByCredentials } from './lib/user';


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        );

        return user;
      },
    }),
  ],
});


export async function handleError(error: unknown) {
  console.error('Auth route error:', error);
  return new Response('Internal Server Error', { status: 500 });
}