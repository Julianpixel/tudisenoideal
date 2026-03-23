import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { a3 as addAttribute, b8 as renderHead, ba as renderSlot, P as renderTemplate } from './sequence_DK-jjJFr.mjs';
import 'clsx';
import { d as db, S as Settings } from './_astro_db_8BCavLB5.mjs';

const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Layout;
  const settingsRows = await db.select().from(Settings).limit(1);
  const s = settingsRows[0] || { heroTitle: "Julian & Leandri", heroSubtitle: "20 de Diciembre, 2026" };
  return renderTemplate`<html lang="es" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${s.heroTitle} — ${s.heroSubtitle}</title><meta name="description" content="Te invitamos a celebrar nuestra boda. Confirma tu asistencia y únete a este momento especial.">${renderHead()}</head> <body data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} <!-- Footer with donations link and subtle admin access --> <footer class="site-footer" data-astro-cid-sckkx6r4> <div class="footer-inner" data-astro-cid-sckkx6r4> <p class="footer-brand" data-astro-cid-sckkx6r4>${s.heroTitle}</p> <p class="footer-tagline" data-astro-cid-sckkx6r4>Unidos para siempre · ${s.heroSubtitle}</p> <nav class="footer-links" data-astro-cid-sckkx6r4> <a href="/donaciones" class="footer-link" data-astro-cid-sckkx6r4>💛 Lluvia de Sobres</a> <a href="/galeria" class="footer-link" data-astro-cid-sckkx6r4>📸 Galería</a> <a href="#rsvp" class="footer-link" data-astro-cid-sckkx6r4>✉️ Confirmar Asistencia</a> </nav> <div class="footer-admin" data-astro-cid-sckkx6r4> <a href="/admin/login" class="admin-access-btn" data-astro-cid-sckkx6r4> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" data-astro-cid-sckkx6r4><rect x="3" y="11" width="18" height="11" rx="2" ry="2" data-astro-cid-sckkx6r4></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-astro-cid-sckkx6r4></path></svg>
Acceso Administrador
</a> </div> </div> </footer></body></html>`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
