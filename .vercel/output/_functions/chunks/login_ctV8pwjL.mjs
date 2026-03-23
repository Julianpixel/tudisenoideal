import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { b8 as renderHead, P as renderTemplate } from './sequence_DK-jjJFr.mjs';
import 'clsx';

const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Login;
  let error = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const password = form.get("password");
    const adminPassword = "boda2026";
    if (password === adminPassword) {
      Astro2.cookies.set("admin_session", "authenticated", {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7
        // 7 days
      });
      return Astro2.redirect("/admin/dashboard");
    } else {
      error = "Contraseña incorrecta. Inténtalo de nuevo.";
    }
  }
  return renderTemplate`<html lang="es" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin — Acceso</title><link rel="preconnect" href="https://fonts.googleapis.com"><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Montserrat:wght@400;500;600&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-card" data-astro-cid-rf56lckb> <span class="login-icon" data-astro-cid-rf56lckb>🌿</span> <p class="login-brand" data-astro-cid-rf56lckb>Panel de Bodas</p> <h1 class="login-title" data-astro-cid-rf56lckb>Acceso Admin</h1> <p class="login-subtitle" data-astro-cid-rf56lckb>Solo personal autorizado</p> ${error && renderTemplate`<div class="error-msg" data-astro-cid-rf56lckb>${error}</div>`} <form method="POST" autocomplete="off" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Contraseña</label> <input type="password" id="password" name="password" required autofocus placeholder="••••••••" data-astro-cid-rf56lckb> </div> <button type="submit" class="btn" data-astro-cid-rf56lckb>Ingresar</button> </form> </div> </body></html>`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/login.astro", void 0);
const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
