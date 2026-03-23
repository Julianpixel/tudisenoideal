import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Protect all /admin/* routes except login itself
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const session = context.cookies.get('admin_session');
    if (session?.value !== 'authenticated') {
      return context.redirect('/admin/login');
    }
  }

  return next();
});
