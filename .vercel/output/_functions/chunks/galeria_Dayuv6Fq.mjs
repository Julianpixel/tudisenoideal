import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { r as renderScript } from './script_DtOIulw9.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { d as db, a as GalleryImage } from './_astro_db_8BCavLB5.mjs';

const prerender = false;
const $$Galeria = createComponent(async ($$result, $$props, $$slots) => {
  const images = await db.select().from(GalleryImage);
  images.sort((a, b) => a.order - b.order);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-tvv6smhg": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="galeria-page" data-astro-cid-tvv6smhg> <div class="galeria-header" data-astro-cid-tvv6smhg> <a href="/" class="back-link" data-astro-cid-tvv6smhg> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-tvv6smhg><line x1="19" y1="12" x2="5" y2="12" data-astro-cid-tvv6smhg></line><polyline points="12 19 5 12 12 5" data-astro-cid-tvv6smhg></polyline></svg>
Volver al inicio
</a> <p class="section-label" data-astro-cid-tvv6smhg>Momentos</p> <h1 class="page-title" data-astro-cid-tvv6smhg>Nuestra Historia Completa</h1> <div class="section-ornament" data-astro-cid-tvv6smhg><span data-astro-cid-tvv6smhg>❧</span></div> <p class="page-subtitle" data-astro-cid-tvv6smhg>Cada imagen es un capítulo de nuestra historia de amor.</p> </div> ${images.length === 0 && renderTemplate`<div class="empty" data-astro-cid-tvv6smhg>No hay imágenes en la galería todavía.</div>`} <div class="gallery-grid" id="gallery-grid" data-astro-cid-tvv6smhg> ${images.map((img, i) => renderTemplate`<div class="gallery-item"${addAttribute(`animation-delay: ${i * 0.08}s`, "style")}${addAttribute(img.url, "data-src")}${addAttribute(img.caption || "", "data-caption")} role="button" tabindex="0"${addAttribute(img.caption || "Ver foto", "aria-label")} data-astro-cid-tvv6smhg> <img${addAttribute(img.url, "src")}${addAttribute(img.caption || "Galería de boda", "alt")} loading="lazy" data-astro-cid-tvv6smhg> ${img.caption && renderTemplate`<div class="item-overlay" data-astro-cid-tvv6smhg> <p class="item-caption" data-astro-cid-tvv6smhg>${img.caption}</p> </div>`} </div>`)} </div> </div>  <div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-hidden="true" data-astro-cid-tvv6smhg> <button class="lb-close" id="lb-close" aria-label="Cerrar" data-astro-cid-tvv6smhg>&times;</button> <button class="lb-prev" id="lb-prev" aria-label="Anterior" data-astro-cid-tvv6smhg>&#8249;</button> <button class="lb-next" id="lb-next" aria-label="Siguiente" data-astro-cid-tvv6smhg>&#8250;</button> <div class="lb-content" data-astro-cid-tvv6smhg> <img id="lb-img" src="" alt="" data-astro-cid-tvv6smhg> <p id="lb-caption" class="lb-caption" data-astro-cid-tvv6smhg></p> </div> </div> ` })} ${renderScript($$result, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/galeria.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/galeria.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/galeria.astro";
const $$url = "/galeria";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galeria,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
