import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import './sequence_DK-jjJFr.mjs';
import 'clsx';

const prerender = false;
const $$Logout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Logout;
  Astro2.cookies.delete("admin_session", { path: "/" });
  return Astro2.redirect("/admin/login");
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/logout.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/logout.astro";
const $$url = "/admin/logout";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Logout,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
