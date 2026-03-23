import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { d as db, G as Guest, a as GalleryImage } from './_astro_db_8BCavLB5.mjs';
import { $ as $$Sidebar } from './Sidebar_CO6nhXP_.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Dashboard;
  function normalizeText(text) {
    return text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  let importMsg = "";
  let actionMsg = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const _action = form.get("_action");
    if (_action === "importCSV") {
      const csvContent = form.get("csvContent");
      if (csvContent) {
        const lines = csvContent.split("\n").map((l) => l.trim()).filter(Boolean);
        const dataLines = lines[0]?.toLowerCase().includes("nombre") ? lines.slice(1) : lines;
        const allDbGuests = await db.select().from(Guest);
        let nextId = allDbGuests.reduce((max, g) => Math.max(max, g.id), 0) + 1;
        let imported = 0;
        const errors = [];
        for (const line of dataLines) {
          const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
          const name = cols[0];
          if (!name) continue;
          const partySize = parseInt(cols[1] || "1", 10) || 1;
          const familyGroup = cols[2] || null;
          const dietaryRestrictions = cols[3] || null;
          const exists = allDbGuests.find((g) => normalizeText(g.name) === normalizeText(name));
          try {
            if (exists) {
              await db.update(Guest).set({ partySize, familyGroup: familyGroup || exists.familyGroup, dietaryRestrictions: dietaryRestrictions || exists.dietaryRestrictions, updatedAt: /* @__PURE__ */ new Date() }).where(eq(Guest.id, exists.id));
            } else {
              const code = `GUEST-${String(nextId).padStart(3, "0")}`;
              await db.insert(Guest).values({ id: nextId, uniqueCode: code, name, partySize, familyGroup, dietaryRestrictions, status: "pending", showBibleVerse: false });
              nextId++;
            }
            imported++;
          } catch (e) {
            errors.push(`"${name}": ${e instanceof Error ? e.message : "Error"}`);
          }
        }
        importMsg = `✓ ${imported} invitado(s) importados.${errors.length ? " Errores: " + errors.join("; ") : ""}`;
      }
    } else if (_action === "toggleVerse") {
      const guestId = parseInt(form.get("guestId"), 10);
      const value = form.get("value") === "true";
      await db.update(Guest).set({ showBibleVerse: value }).where(eq(Guest.id, guestId));
      actionMsg = value ? "✓ Versículo bíblico activado." : "✓ Versículo bíblico desactivado.";
    } else if (_action === "resetStatus") {
      const guestId = parseInt(form.get("guestId"), 10);
      await db.update(Guest).set({ status: "pending", updatedAt: /* @__PURE__ */ new Date() }).where(eq(Guest.id, guestId));
      actionMsg = "✓ Estado restablecido a pendiente.";
    }
  }
  const allGuests = await db.select().from(Guest);
  (await db.select().from(GalleryImage)).length;
  const totalGuests = allGuests.length;
  const confirmedGuests = allGuests.filter((g) => g.status === "confirmed").reduce((a, g) => a + g.partySize, 0);
  const pendingGuests = allGuests.filter((g) => g.status === "pending").reduce((a, g) => a + g.partySize, 0);
  const declinedGuests = allGuests.filter((g) => g.status === "declined").reduce((a, g) => a + g.partySize, 0);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-x6qnsptu": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-shell" data-astro-cid-x6qnsptu> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "currentPath": "/admin/dashboard", "data-astro-cid-x6qnsptu": true })} <!-- Main --> <main class="admin-main" data-astro-cid-x6qnsptu> <header class="admin-header" data-astro-cid-x6qnsptu> <div data-astro-cid-x6qnsptu> <p class="header-eyebrow" data-astro-cid-x6qnsptu>Panel de Administración</p> <h1 class="header-title" data-astro-cid-x6qnsptu>Dashboard</h1> </div> <a href="/" class="btn btn-sm" target="_blank" data-astro-cid-x6qnsptu>Ver Sitio →</a> </header> <!-- Metrics --> <section class="metrics-grid" data-astro-cid-x6qnsptu> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon icon-default" data-astro-cid-x6qnsptu> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-x6qnsptu><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" data-astro-cid-x6qnsptu></path><circle cx="9" cy="7" r="4" data-astro-cid-x6qnsptu></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" data-astro-cid-x6qnsptu></path></svg> </div> <div class="metric-info" data-astro-cid-x6qnsptu> <p class="metric-label" data-astro-cid-x6qnsptu>Total Invitados</p> <p class="metric-value" data-astro-cid-x6qnsptu>${totalGuests}</p> </div> </div> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon icon-success" data-astro-cid-x6qnsptu> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-x6qnsptu><path d="M22 11.08V12a10 10 0 11-5.93-9.14" data-astro-cid-x6qnsptu></path><polyline points="22 4 12 14.01 9 11.01" data-astro-cid-x6qnsptu></polyline></svg> </div> <div class="metric-info" data-astro-cid-x6qnsptu> <p class="metric-label" data-astro-cid-x6qnsptu>Confirmados</p> <p class="metric-value success" data-astro-cid-x6qnsptu>${confirmedGuests}</p> </div> </div> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon icon-warning" data-astro-cid-x6qnsptu> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-x6qnsptu><circle cx="12" cy="12" r="10" data-astro-cid-x6qnsptu></circle><line x1="12" y1="8" x2="12" y2="12" data-astro-cid-x6qnsptu></line><line x1="12" y1="16" x2="12.01" y2="16" data-astro-cid-x6qnsptu></line></svg> </div> <div class="metric-info" data-astro-cid-x6qnsptu> <p class="metric-label" data-astro-cid-x6qnsptu>Pendientes</p> <p class="metric-value warning" data-astro-cid-x6qnsptu>${pendingGuests}</p> </div> </div> <div class="metric-card" data-astro-cid-x6qnsptu> <div class="metric-icon icon-danger" data-astro-cid-x6qnsptu> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-x6qnsptu><circle cx="12" cy="12" r="10" data-astro-cid-x6qnsptu></circle><line x1="15" y1="9" x2="9" y2="15" data-astro-cid-x6qnsptu></line><line x1="9" y1="9" x2="15" y2="15" data-astro-cid-x6qnsptu></line></svg> </div> <div class="metric-info" data-astro-cid-x6qnsptu> <p class="metric-label" data-astro-cid-x6qnsptu>Declinados</p> <p class="metric-value danger" data-astro-cid-x6qnsptu>${declinedGuests}</p> </div> </div> </section> <!-- CSV Import --> <section class="csv-section" data-astro-cid-x6qnsptu> <div class="csv-header" data-astro-cid-x6qnsptu> <div data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>Importar Invitados (CSV)</h2> <p class="section-desc" data-astro-cid-x6qnsptu>Formato: <code data-astro-cid-x6qnsptu>nombre,pases,grupo_familiar,dieta</code> — una fila por invitado. La primera fila puede ser encabezado.</p> </div> </div> ${importMsg && renderTemplate`<div${addAttribute(`import-msg ${importMsg.startsWith("✓") ? "success" : "error"}`, "class")} data-astro-cid-x6qnsptu>${importMsg}</div>`} ${actionMsg && renderTemplate`<div class="import-msg success" data-astro-cid-x6qnsptu>${actionMsg}</div>`} <div class="csv-area" data-astro-cid-x6qnsptu> <form method="POST" class="csv-form" data-astro-cid-x6qnsptu> <input type="hidden" name="_action" value="importCSV" data-astro-cid-x6qnsptu> <textarea name="csvContent" rows="6" placeholder="Juan Pérez,2,Familia Pérez,
Ana García,1,,Vegana
Carlos López,4,Amigos," data-astro-cid-x6qnsptu></textarea> <button type="submit" class="btn btn-forest btn-sm" data-astro-cid-x6qnsptu>Importar CSV</button> </form> <div class="csv-hint" data-astro-cid-x6qnsptu> <p data-astro-cid-x6qnsptu>📋 <strong data-astro-cid-x6qnsptu>Ejemplo de archivo CSV:</strong></p> <pre data-astro-cid-x6qnsptu>nombre,pases,grupo,dieta
Juan Pérez,2,Familia,
Ana García,1,,Vegana</pre> </div> </div> </section> <!-- Guest table --> <section class="guest-section" data-astro-cid-x6qnsptu> <div class="section-header" data-astro-cid-x6qnsptu> <h2 class="section-title" data-astro-cid-x6qnsptu>Lista de Invitados</h2> <span class="guest-count" data-astro-cid-x6qnsptu>${totalGuests} registros</span> </div> <div class="table-wrapper" data-astro-cid-x6qnsptu> <table data-astro-cid-x6qnsptu> <thead data-astro-cid-x6qnsptu> <tr data-astro-cid-x6qnsptu><th data-astro-cid-x6qnsptu>Nombre</th><th data-astro-cid-x6qnsptu>Grupo</th><th data-astro-cid-x6qnsptu>Código</th><th data-astro-cid-x6qnsptu>Pases</th><th data-astro-cid-x6qnsptu>Estado</th><th data-astro-cid-x6qnsptu>Dieta</th><th data-astro-cid-x6qnsptu>Versículo</th><th data-astro-cid-x6qnsptu>Acciones</th></tr> </thead> <tbody data-astro-cid-x6qnsptu> ${allGuests.map((g) => renderTemplate`<tr data-astro-cid-x6qnsptu> <td class="name-cell" data-astro-cid-x6qnsptu><strong data-astro-cid-x6qnsptu>${g.name}</strong></td> <td class="group-cell" data-astro-cid-x6qnsptu>${g.familyGroup ? renderTemplate`<span class="badge-group" data-astro-cid-x6qnsptu>${g.familyGroup}</span>` : renderTemplate`<span class="empty-dash" data-astro-cid-x6qnsptu>—</span>`}</td> <td class="code-cell" data-astro-cid-x6qnsptu>${g.uniqueCode}</td> <td class="center" data-astro-cid-x6qnsptu>${g.partySize}</td> <td data-astro-cid-x6qnsptu><span${addAttribute(`badge badge-${g.status}`, "class")} data-astro-cid-x6qnsptu>${g.status === "confirmed" ? "✓ Confirmado" : g.status === "declined" ? "✗ Declinado" : "● Pendiente"}</span></td> <td class="diet-cell" data-astro-cid-x6qnsptu>${g.dietaryRestrictions || "—"}</td> <td class="center" data-astro-cid-x6qnsptu> <form method="POST" style="display:inline" data-astro-cid-x6qnsptu> <input type="hidden" name="_action" value="toggleVerse" data-astro-cid-x6qnsptu> <input type="hidden" name="guestId"${addAttribute(g.id, "value")} data-astro-cid-x6qnsptu> <input type="hidden" name="value"${addAttribute(g.showBibleVerse ? "false" : "true", "value")} data-astro-cid-x6qnsptu> <button type="submit"${addAttribute(`verse-toggle ${g.showBibleVerse ? "active" : ""}`, "class")}${addAttribute(g.showBibleVerse ? "Desactivar versículo" : "Activar versículo", "title")} data-astro-cid-x6qnsptu> ${g.showBibleVerse ? "📖 Sí" : "○ No"} </button> </form> </td> <td class="center" data-astro-cid-x6qnsptu> ${g.status !== "pending" && renderTemplate`<form method="POST" style="display:inline" data-astro-cid-x6qnsptu> <input type="hidden" name="_action" value="resetStatus" data-astro-cid-x6qnsptu> <input type="hidden" name="guestId"${addAttribute(g.id, "value")} data-astro-cid-x6qnsptu> <button type="submit" class="reset-btn" title="Restablecer a pendiente" onclick="return confirm('¿Restablecer a pendiente?')" data-astro-cid-x6qnsptu>↺ Reset</button> </form>`} </td> </tr>`)} </tbody> </table> </div> </section> </main> </div> ` })}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/dashboard.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
