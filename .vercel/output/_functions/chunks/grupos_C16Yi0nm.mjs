import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { r as renderScript } from './script_DtOIulw9.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { $ as $$Sidebar } from './Sidebar_CO6nhXP_.mjs';
import { d as db, G as Guest } from './_astro_db_8BCavLB5.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
const $$Grupos = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Grupos;
  let successMsg = "";
  let errorMsg = "";
  if (Astro2.request.method === "POST") {
    try {
      const form = await Astro2.request.formData();
      const action = form.get("_action");
      if (action === "assignGroup") {
        const guestId = parseInt(form.get("guestId"), 10);
        const groupName = form.get("groupName").trim();
        const newGroup = groupName === "" ? null : groupName;
        await db.update(Guest).set({ familyGroup: newGroup, showBibleVerse: true }).where(eq(Guest.id, guestId));
      }
    } catch (e) {
      errorMsg = `Error: ${e instanceof Error ? e.message : "Error desconocido"}`;
    }
  }
  const allGuests = await db.select().from(Guest);
  const groups = Array.from(new Set(allGuests.map((g) => g.familyGroup).filter(Boolean)));
  const unassigned = allGuests.filter((g) => !g.familyGroup);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-t3n6i7d3": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-shell" data-astro-cid-t3n6i7d3> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "currentPath": "/admin/grupos", "data-astro-cid-t3n6i7d3": true })} <main class="admin-main" data-astro-cid-t3n6i7d3> <header class="admin-header" data-astro-cid-t3n6i7d3> <div data-astro-cid-t3n6i7d3> <p class="header-eyebrow" data-astro-cid-t3n6i7d3>Panel de Administración</p> <h1 class="header-title" data-astro-cid-t3n6i7d3>Grupos Familiares</h1> </div> <a href="/" class="btn btn-forest btn-sm" target="_blank" data-astro-cid-t3n6i7d3>Ver Sitio →</a> </header> ${successMsg} ${errorMsg && renderTemplate`<div class="alert alert-error" data-astro-cid-t3n6i7d3>${errorMsg}</div>`} <div class="groups-manage" data-astro-cid-t3n6i7d3> <!-- Unassigned Guests --> <div class="planner-card zone-unassigned" data-astro-cid-t3n6i7d3> <h3 class="card-title" data-astro-cid-t3n6i7d3>🫂 Invitados Libres</h3> <p class="hint" data-astro-cid-t3n6i7d3>Arrastra a un invitado hacia un grupo familiar.</p> <div class="guest-list-droppable" data-group="" data-astro-cid-t3n6i7d3> ${unassigned.length === 0 && renderTemplate`<div class="empty" data-astro-cid-t3n6i7d3>No hay invitados libres.</div>`} ${unassigned.map((g) => renderTemplate`<div class="guest-item" draggable="true"${addAttribute(g.id, "data-id")} data-astro-cid-t3n6i7d3> <span class="drag-handle" data-astro-cid-t3n6i7d3>≡</span> <span class="g-name" data-astro-cid-t3n6i7d3>${g.name}</span> <span class="g-size" data-astro-cid-t3n6i7d3>${g.partySize} pax</span> </div>`)} </div> </div> <!-- Groups --> <div class="groups-container" data-astro-cid-t3n6i7d3> <div class="groups-header" data-astro-cid-t3n6i7d3> <h3 class="card-title" data-astro-cid-t3n6i7d3>🏡 Grupos Familiares</h3> </div> <p class="hint" data-astro-cid-t3n6i7d3>Los invitados agrupados aquí se confirmarán todos a la vez cuando uno de ellos responda.</p> <div class="groups-grid" id="groups-grid" data-astro-cid-t3n6i7d3> <!-- New Group Dropzone --> <div class="group-box create-new" data-astro-cid-t3n6i7d3> <div class="group-header" data-astro-cid-t3n6i7d3> <h4 style="color: var(--color-forest);" data-astro-cid-t3n6i7d3>➕ Crear Nueva Familia</h4> </div> <div class="guest-list-droppable" id="dropzone-new-group" data-astro-cid-t3n6i7d3> <div class="empty" data-astro-cid-t3n6i7d3>Arrastra un invitado aquí para iniciar un grupo</div> </div> </div> ${groups.map((groupName) => {
    const groupGuests = allGuests.filter((g) => g.familyGroup === groupName);
    const totalPax = groupGuests.reduce((acc, g) => acc + g.partySize, 0);
    return renderTemplate`<div class="group-box" data-astro-cid-t3n6i7d3> <div class="group-header" data-astro-cid-t3n6i7d3> <h4 data-astro-cid-t3n6i7d3>${groupName}</h4> <span class="badge" data-astro-cid-t3n6i7d3>${totalPax} pax en total</span> </div> <div class="guest-list-droppable"${addAttribute(groupName, "data-group")} data-astro-cid-t3n6i7d3> ${groupGuests.length === 0 && renderTemplate`<div class="empty" data-astro-cid-t3n6i7d3>Arrastra un invitado aquí</div>`} ${groupGuests.map((g) => renderTemplate`<div class="guest-item" draggable="true"${addAttribute(g.id, "data-id")} data-astro-cid-t3n6i7d3> <span class="drag-handle" data-astro-cid-t3n6i7d3>≡</span> <span class="g-name" data-astro-cid-t3n6i7d3>${g.name}</span> <span class="g-size" data-astro-cid-t3n6i7d3>${g.partySize} pax</span> </div>`)} </div> </div>`;
  })} </div> </div> </div> <!-- Hidden form for drag&drop --> <form method="POST" id="drag-form" style="display:none" data-astro-cid-t3n6i7d3> <input type="hidden" name="_action" value="assignGroup" data-astro-cid-t3n6i7d3> <input type="hidden" name="guestId" id="drag-guest-id" data-astro-cid-t3n6i7d3> <input type="hidden" name="groupName" id="drag-group" data-astro-cid-t3n6i7d3> </form> <!-- Custom Modal --> <div id="custom-modal" class="custom-modal" style="display: none;" data-astro-cid-t3n6i7d3> <div class="modal-content" data-astro-cid-t3n6i7d3> <h3 data-astro-cid-t3n6i7d3>Nuevo Grupo Familiar</h3> <p data-astro-cid-t3n6i7d3>Asigna un nombre para agrupar a estos invitados:</p> <input type="text" id="modal-input" placeholder="Ej: Familia López..." data-astro-cid-t3n6i7d3> <div class="modal-actions" data-astro-cid-t3n6i7d3> <button type="button" class="btn btn-outline btn-sm" id="modal-cancel" data-astro-cid-t3n6i7d3>Cancelar</button> <button type="button" class="btn btn-forest btn-sm" id="modal-save" data-astro-cid-t3n6i7d3>Crear Grupo</button> </div> </div> </div> </main> </div> ` })} ${renderScript($$result, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/grupos.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/grupos.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/grupos.astro";
const $$url = "/admin/grupos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Grupos,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
