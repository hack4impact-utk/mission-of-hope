export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/item/add', '/donation/add'],
};
