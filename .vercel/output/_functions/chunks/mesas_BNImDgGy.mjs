import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { $ as $$Sidebar } from './Sidebar_CO6nhXP_.mjs';
import { d as db, T as Table, G as Guest } from './_astro_db_8BCavLB5.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
const $$Mesas = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Mesas;
  let successMsg = "";
  let errorMsg = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    if (action === "create") {
      const name = form.get("name")?.trim();
      const capacity = parseInt(form.get("capacity"), 10);
      if (!name || isNaN(capacity) || capacity < 1) {
        errorMsg = "Por favor ingresa un nombre y capacidad válidos.";
      } else {
        const allTables2 = await db.select().from(Table);
        const maxOrder = allTables2.reduce((m, t) => Math.max(m, t.order), 0);
        await db.insert(Table).values({ name, capacity, order: maxOrder + 1, type: "circular" });
        successMsg = `✓ Mesa "${name}" creada con capacidad de ${capacity} personas.`;
      }
    } else if (action === "delete") {
      const tableId = parseInt(form.get("tableId"), 10);
      await db.update(Guest).set({ tableId: null }).where(eq(Guest.tableId, tableId));
      await db.delete(Table).where(eq(Table.id, tableId));
      successMsg = "✓ Mesa eliminada.";
    }
  }
  const allGuests = await db.select().from(Guest);
  const allTables = await db.select().from(Table);
  allTables.sort((a, b) => a.order - b.order);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-q7krugu6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-shell" data-astro-cid-q7krugu6> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "currentPath": "/admin/mesas", "data-astro-cid-q7krugu6": true })} <main class="admin-main" data-astro-cid-q7krugu6> <header class="admin-header" data-astro-cid-q7krugu6> <div data-astro-cid-q7krugu6> <p class="header-eyebrow" data-astro-cid-q7krugu6>Panel de Administración</p> <h1 class="header-title" data-astro-cid-q7krugu6>Organizador de Mesas</h1> </div> <a href="/" class="btn btn-forest btn-sm" target="_blank" data-astro-cid-q7krugu6>Ver Sitio →</a> </header> ${successMsg && renderTemplate`<div class="alert alert-success" data-astro-cid-q7krugu6>${successMsg}</div>`} ${errorMsg && renderTemplate`<div class="alert alert-error" data-astro-cid-q7krugu6>${errorMsg}</div>`} <!-- Create table form + delete list --> <div class="tables-manage" data-astro-cid-q7krugu6> <!-- Create --> <div class="manage-card" data-astro-cid-q7krugu6> <h3 class="card-title" data-astro-cid-q7krugu6>➕ Crear Nueva Mesa</h3> <form method="POST" class="create-form" data-astro-cid-q7krugu6> <input type="hidden" name="_action" value="create" data-astro-cid-q7krugu6> <div class="form-row" data-astro-cid-q7krugu6> <div class="form-group" data-astro-cid-q7krugu6> <label for="tableName" data-astro-cid-q7krugu6>Nombre de la mesa</label> <input type="text" id="tableName" name="name" placeholder="Ej: Mesa de Honor" required data-astro-cid-q7krugu6> </div> <div class="form-group" data-astro-cid-q7krugu6> <label for="tableCapacity" data-astro-cid-q7krugu6>Capacidad (personas)</label> <input type="number" id="tableCapacity" name="capacity" min="1" max="30" value="8" required data-astro-cid-q7krugu6> </div> </div> <button type="submit" class="btn btn-forest" data-astro-cid-q7krugu6>Crear Mesa</button> </form> </div> <!-- Delete --> <div class="manage-card" data-astro-cid-q7krugu6> <h3 class="card-title" data-astro-cid-q7krugu6>🗑 Eliminar Mesas</h3> ${allTables.length === 0 && renderTemplate`<p class="empty" data-astro-cid-q7krugu6>No hay mesas creadas.</p>`} <div class="table-list" data-astro-cid-q7krugu6> ${allTables.map((t) => {
    const guests = allGuests.filter((g) => g.tableId === t.id);
    const occ = guests.reduce((s, g) => s + g.partySize, 0);
    return renderTemplate`<div class="table-row" data-astro-cid-q7krugu6> <div class="table-info" data-astro-cid-q7krugu6> <span class="table-name" data-astro-cid-q7krugu6>${t.name}</span> <span class="table-cap" data-astro-cid-q7krugu6>${occ}/${t.capacity} personas</span> </div> <form method="POST" style="display:inline" data-astro-cid-q7krugu6> <input type="hidden" name="_action" value="delete" data-astro-cid-q7krugu6> <input type="hidden" name="tableId"${addAttribute(t.id, "value")} data-astro-cid-q7krugu6> <button type="submit" class="btn-danger" onclick="return confirm('¿Eliminar esta mesa? Los invitados serán desasignados.')" data-astro-cid-q7krugu6>
Eliminar
</button> </form> </div>`;
  })} </div> </div> </div> <!-- Seating Planner --> <div class="planner-card" data-astro-cid-q7krugu6> <h3 class="card-title" data-astro-cid-q7krugu6>🪑 Asignación de Mesas (Drag & Drop)</h3> ${renderComponent($$result2, "SeatingPlanner", null, { "client:only": "react", "initialGuests": allGuests, "initialTables": allTables, "client:component-hydration": "only", "data-astro-cid-q7krugu6": true, "client:component-path": "C:/Users/eliasr/Videos/plantilla de bodas/src/components/SeatingPlanner.tsx", "client:component-export": "default" })} </div> </main> </div> ` })}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/mesas.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/mesas.astro";
const $$url = "/admin/mesas";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Mesas,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
