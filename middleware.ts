export { default } from 'next-auth/middleware';
// FIX this https://codevoweb.com/setup-and-use-nextauth-in-nextjs-13-app-directory/
// FIX this
export const config = { matcher: ['/dashboard'] };
