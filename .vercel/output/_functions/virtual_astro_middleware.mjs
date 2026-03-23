import { a7 as defineMiddleware, ag as sequence } from './chunks/sequence_DK-jjJFr.mjs';
import 'piccolore';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = context.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      return context.redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
