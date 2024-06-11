import { handler } from '@/app/api/auth/[...nextauth]/auth';
import NextAuth from 'next-auth/next';

const authoptions = NextAuth(handler);

export { authoptions as GET, authoptions as POST };
