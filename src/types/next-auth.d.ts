import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /* 
  This extends the Profile type defined in the next-auth library
  This is needed as emailed_verified is a part of Google OAuth's profile object
  but not in next-auth's type definition.
  See https://next-auth.js.org/getting-started/typescript for more details.
  */
  interface Profile {
    email_verified: boolean & DefaultSession['profile'];
  }
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's ID in the database. */
      _id: string;
      /** The user's name. */
      name: string;
      /** The user's email address. */
      email: string;
      /** The user's image. */
      image: string;

      isAdmin: boolean;
    };
  }

  interface User {
    isAdmin: boolean;
  }
}
