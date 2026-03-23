import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { d as db, S as Settings } from './_astro_db_8BCavLB5.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
const $$Contenido = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Contenido;
  let successMsg = "";
  let errorMsg = "";
  if (Astro2.request.method === "POST") {
    try {
      const form = await Astro2.request.formData();
      await db.update(Settings).set({
        weddingDate: form.get("weddingDate") || "",
        ceremonyTime: form.get("ceremonyTime") || "",
        receptionTime: form.get("receptionTime") || "",
        ceremonyVenue: form.get("ceremonyVenue") || "",
        ceremonyAddress: form.get("ceremonyAddress") || "",
        receptionVenue: form.get("receptionVenue") || "",
        receptionAddress: form.get("receptionAddress") || "",
        heroTitle: form.get("heroTitle") || "",
        heroSubtitle: form.get("heroSubtitle") || "",
        mapEmbedUrl: form.get("mapEmbedUrl") || "",
        updatedAt: /* @__PURE__ */ new Date()
      }).where(eq(Settings.id, 1));
      successMsg = "✓ Configuración guardada correctamente.";
    } catch (e) {
      errorMsg = `Error: ${e instanceof Error ? e.message : "Error desconocido"}`;
    }
  }
  const rows = await db.select().from(Settings);
  const s = rows[0];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-jn5ymuos": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-shell" data-astro-cid-jn5ymuos> <aside class="sidebar" data-astro-cid-jn5ymuos> <div class="sidebar-brand" data-astro-cid-jn5ymuos> <span class="brand-icon" data-astro-cid-jn5ymuos>❧</span> <span class="brand-name" data-astro-cid-jn5ymuos>Wedding<br data-astro-cid-jn5ymuos>Admin</span> </div> <nav class="sidebar-nav" data-astro-cid-jn5ymuos> <a href="/admin/dashboard" class="nav-item" data-astro-cid-jn5ymuos>📊 Dashboard</a> <a href="/admin/contenido" class="nav-item active" data-astro-cid-jn5ymuos>✏️ Contenido</a> <a href="/admin/galeria" class="nav-item" data-astro-cid-jn5ymuos>🖼️ Galería</a> <a href="/admin/mesas" class="nav-item" data-astro-cid-jn5ymuos>🔵 Mesas</a> <a href="/admin/logout" class="nav-item nav-logout" data-astro-cid-jn5ymuos>🚪 Salir</a> </nav> </aside> <main class="admin-main" data-astro-cid-jn5ymuos> <header class="admin-header" data-astro-cid-jn5ymuos> <div data-astro-cid-jn5ymuos> <p class="header-eyebrow" data-astro-cid-jn5ymuos>Panel de Administración</p> <h1 class="header-title" data-astro-cid-jn5ymuos>Editar Contenido</h1> </div> <a href="/" class="btn btn-forest btn-sm" target="_blank" data-astro-cid-jn5ymuos>Ver Sitio →</a> </header> ${successMsg && renderTemplate`<div class="alert alert-success" data-astro-cid-jn5ymuos>${successMsg}</div>`} ${errorMsg && renderTemplate`<div class="alert alert-error" data-astro-cid-jn5ymuos>${errorMsg}</div>`} <form method="POST" class="settings-form" data-astro-cid-jn5ymuos> <div class="form-sections" data-astro-cid-jn5ymuos> <!-- Hero info --> <div class="form-card" data-astro-cid-jn5ymuos> <h3 class="card-title" data-astro-cid-jn5ymuos>🏠 Hero — Encabezado del Sitio</h3> <div class="form-row" data-astro-cid-jn5ymuos> <div class="form-group" data-astro-cid-jn5ymuos> <label for="heroTitle" data-astro-cid-jn5ymuos>Título principal</label> <input type="text" id="heroTitle" name="heroTitle"${addAttribute(s?.heroTitle ?? "", "value")} required data-astro-cid-jn5ymuos> </div> <div class="form-group" data-astro-cid-jn5ymuos> <label for="heroSubtitle" data-astro-cid-jn5ymuos>Subtítulo (fecha visible)</label> <input type="text" id="heroSubtitle" name="heroSubtitle"${addAttribute(s?.heroSubtitle ?? "", "value")} required data-astro-cid-jn5ymuos> </div> </div> </div> <!-- Wedding date --> <div class="form-card" data-astro-cid-jn5ymuos> <h3 class="card-title" data-astro-cid-jn5ymuos>📅 Fecha de la Boda (Cuenta Regresiva)</h3> <div class="form-group" data-astro-cid-jn5ymuos> <label for="weddingDate" data-astro-cid-jn5ymuos>Fecha ISO (YYYY-MM-DD)</label> <input type="date" id="weddingDate" name="weddingDate"${addAttribute(s?.weddingDate ?? "", "value")} required data-astro-cid-jn5ymuos> <p class="hint" data-astro-cid-jn5ymuos>Esta fecha controla el contador regresivo en la página principal.</p> </div> </div> <!-- Ceremony --> <div class="form-card" data-astro-cid-jn5ymuos> <h3 class="card-title" data-astro-cid-jn5ymuos>⛪ La Ceremonia</h3> <div class="form-row" data-astro-cid-jn5ymuos> <div class="form-group" data-astro-cid-jn5ymuos> <label for="ceremonyTime" data-astro-cid-jn5ymuos>Hora (ej: 16:00)</label> <input type="text" id="ceremonyTime" name="ceremonyTime"${addAttribute(s?.ceremonyTime ?? "", "value")} data-astro-cid-jn5ymuos> </div> <div class="form-group" data-astro-cid-jn5ymuos> <label for="ceremonyVenue" data-astro-cid-jn5ymuos>Lugar</label> <input type="text" id="ceremonyVenue" name="ceremonyVenue"${addAttribute(s?.ceremonyVenue ?? "", "value")} data-astro-cid-jn5ymuos> </div> </div> <div class="form-group" data-astro-cid-jn5ymuos> <label for="ceremonyAddress" data-astro-cid-jn5ymuos>Dirección completa</label> <input type="text" id="ceremonyAddress" name="ceremonyAddress"${addAttribute(s?.ceremonyAddress ?? "", "value")} data-astro-cid-jn5ymuos> </div> </div> <!-- Reception --> <div class="form-card" data-astro-cid-jn5ymuos> <h3 class="card-title" data-astro-cid-jn5ymuos>🥂 La Recepción</h3> <div class="form-row" data-astro-cid-jn5ymuos> <div class="form-group" data-astro-cid-jn5ymuos> <label for="receptionTime" data-astro-cid-jn5ymuos>Hora (ej: 18:00)</label> <input type="text" id="receptionTime" name="receptionTime"${addAttribute(s?.receptionTime ?? "", "value")} data-astro-cid-jn5ymuos> </div> <div class="form-group" data-astro-cid-jn5ymuos> <label for="receptionVenue" data-astro-cid-jn5ymuos>Lugar</label> <input type="text" id="receptionVenue" name="receptionVenue"${addAttribute(s?.receptionVenue ?? "", "value")} data-astro-cid-jn5ymuos> </div> </div> <div class="form-group" data-astro-cid-jn5ymuos> <label for="receptionAddress" data-astro-cid-jn5ymuos>Dirección completa</label> <input type="text" id="receptionAddress" name="receptionAddress"${addAttribute(s?.receptionAddress ?? "", "value")} data-astro-cid-jn5ymuos> </div> </div> <!-- Map --> <div class="form-card" data-astro-cid-jn5ymuos> <h3 class="card-title" data-astro-cid-jn5ymuos>🗺️ Mapa — URL de Embed</h3> <div class="form-group" data-astro-cid-jn5ymuos> <label for="mapEmbedUrl" data-astro-cid-jn5ymuos>URL del iframe de Google Maps</label> <textarea id="mapEmbedUrl" name="mapEmbedUrl" rows="3" data-astro-cid-jn5ymuos>${s?.mapEmbedUrl ?? ""}</textarea> <p class="hint" data-astro-cid-jn5ymuos>Ve a Google Maps → Compartir → Insertar mapa → copia la URL del src.</p> </div> </div> </div> <button type="submit" class="btn btn-forest" data-astro-cid-jn5ymuos>Guardar Cambios</button> </form> </main> </div> ` })}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/contenido.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/contenido.astro";
const $$url = "/admin/contenido";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contenido,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
