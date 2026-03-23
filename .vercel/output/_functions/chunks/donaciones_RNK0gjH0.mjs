import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { r as renderScript } from './script_DtOIulw9.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { d as db, D as DonationInfo } from './_astro_db_8BCavLB5.mjs';

const prerender = false;
const $$Donaciones = createComponent(async ($$result, $$props, $$slots) => {
  const donations = await db.select().from(DonationInfo);
  donations.sort((a, b) => a.order - b.order).filter((d) => d.isActive);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-5wkowte2": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="donaciones-page" data-astro-cid-5wkowte2> <div class="page-header" data-astro-cid-5wkowte2> <a href="/" class="back-link" data-astro-cid-5wkowte2> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-5wkowte2><line x1="19" y1="12" x2="5" y2="12" data-astro-cid-5wkowte2></line><polyline points="12 19 5 12 12 5" data-astro-cid-5wkowte2></polyline></svg>
Volver al inicio
</a> <p class="eyebrow" data-astro-cid-5wkowte2>Celebra con nosotros</p> <h1 class="page-title" data-astro-cid-5wkowte2>Lluvia de Sobres</h1> <div class="section-ornament" data-astro-cid-5wkowte2><span data-astro-cid-5wkowte2>❧</span></div> <p class="page-subtitle" data-astro-cid-5wkowte2>
Tu presencia es el regalo más grande que nos puedes dar.<br data-astro-cid-5wkowte2>
Sin embargo, si deseas hacernos un regalo especial, te dejamos nuestros datos.<br data-astro-cid-5wkowte2> <em data-astro-cid-5wkowte2>¡Gracias desde el fondo de nuestros corazones!</em> 💛
</p> </div> ${donations.length === 0 && renderTemplate`<div class="empty" data-astro-cid-5wkowte2>Los datos bancarios estarán disponibles próximamente.</div>`} <div class="cards-grid" data-astro-cid-5wkowte2> ${donations.map((d) => renderTemplate`<div class="donation-card" data-astro-cid-5wkowte2> <div class="card-top" data-astro-cid-5wkowte2> <div class="card-avatar" data-astro-cid-5wkowte2>${d.personName.charAt(0)}</div> <div data-astro-cid-5wkowte2> <p class="card-person" data-astro-cid-5wkowte2>${d.personName}</p> <p class="card-bank" data-astro-cid-5wkowte2>${d.bankName}</p> </div> </div> <div class="card-divider" data-astro-cid-5wkowte2></div> <dl class="card-details" data-astro-cid-5wkowte2> <div class="detail-row" data-astro-cid-5wkowte2> <dt data-astro-cid-5wkowte2>Titular</dt> <dd data-astro-cid-5wkowte2>${d.accountHolder}</dd> </div> <div class="detail-row" data-astro-cid-5wkowte2> <dt data-astro-cid-5wkowte2>Número de cuenta</dt> <dd class="copyable"${addAttribute(d.accountNumber, "data-copy")} data-astro-cid-5wkowte2>${d.accountNumber} <button class="copy-btn" title="Copiar" data-astro-cid-5wkowte2>📋</button></dd> </div> <div class="detail-row" data-astro-cid-5wkowte2> <dt data-astro-cid-5wkowte2>Tipo</dt> <dd data-astro-cid-5wkowte2>${d.accountType}</dd> </div> ${d.transferAlias && renderTemplate`<div class="detail-row" data-astro-cid-5wkowte2> <dt data-astro-cid-5wkowte2>Transferencia / Alias</dt> <dd class="copyable"${addAttribute(d.transferAlias, "data-copy")} data-astro-cid-5wkowte2>${d.transferAlias} <button class="copy-btn" title="Copiar" data-astro-cid-5wkowte2>📋</button></dd> </div>`} </dl> </div>`)} </div> <p class="note" data-astro-cid-5wkowte2>
🙏 Cada contribución será usado para comenzar nuestra nueva vida juntos.
</p> </div> ` })} ${renderScript($$result, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/donaciones.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/donaciones.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/donaciones.astro";
const $$url = "/donaciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Donaciones,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
