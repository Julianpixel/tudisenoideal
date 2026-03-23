import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { r as renderScript } from './script_DtOIulw9.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { d as db, D as DonationInfo } from './_astro_db_8BCavLB5.mjs';
import { $ as $$Sidebar } from './Sidebar_CO6nhXP_.mjs';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
const $$Donaciones = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Donaciones;
  let successMsg = "";
  let errorMsg = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    if (action === "delete") {
      const id = parseInt(form.get("id"), 10);
      await db.delete(DonationInfo).where(eq(DonationInfo.id, id));
      successMsg = "✓ Eliminado.";
    } else if (action === "save") {
      const idStr = form.get("id");
      const id = idStr && idStr.trim() !== "" ? parseInt(idStr, 10) : null;
      const payload = {
        personName: form.get("personName").trim(),
        bankName: form.get("bankName").trim(),
        accountHolder: form.get("accountHolder").trim(),
        accountNumber: form.get("accountNumber").trim(),
        accountType: form.get("accountType").trim() || "Cuenta Corriente",
        transferAlias: form.get("transferAlias")?.trim() || null,
        order: parseInt(form.get("order") || "0", 10),
        isActive: true
      };
      if (id) {
        await db.update(DonationInfo).set(payload).where(eq(DonationInfo.id, id));
      } else {
        await db.insert(DonationInfo).values(payload);
      }
      successMsg = "✓ Guardado correctamente.";
    }
  }
  const donations = await db.select().from(DonationInfo);
  donations.sort((a, b) => a.order - b.order);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-qpidy52z": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-shell" data-astro-cid-qpidy52z> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "currentPath": "/admin/donaciones", "data-astro-cid-qpidy52z": true })} <main class="admin-main" data-astro-cid-qpidy52z> <header class="admin-header" data-astro-cid-qpidy52z> <div data-astro-cid-qpidy52z> <p class="header-eyebrow" data-astro-cid-qpidy52z>Panel de Administración</p> <h1 class="header-title" data-astro-cid-qpidy52z>Gestión de Donaciones</h1> </div> <a href="/donaciones" class="btn btn-forest btn-sm" target="_blank" data-astro-cid-qpidy52z>Ver Página →</a> </header> ${successMsg && renderTemplate`<div class="alert alert-success" data-astro-cid-qpidy52z>${successMsg}</div>`} ${errorMsg} <!-- New / Edit Form --> <div class="form-card" data-astro-cid-qpidy52z> <h3 class="card-title" data-astro-cid-qpidy52z>➕ Agregar / Editar Cuenta</h3> <form method="POST" id="donation-form" class="edit-form" data-astro-cid-qpidy52z> <input type="hidden" name="_action" value="save" data-astro-cid-qpidy52z> <input type="hidden" name="id" id="edit-id" value="" data-astro-cid-qpidy52z> <div class="form-grid" data-astro-cid-qpidy52z> <div class="form-group" data-astro-cid-qpidy52z> <label for="personName" data-astro-cid-qpidy52z>Etiqueta (ej: El Novio)</label> <input type="text" id="personName" name="personName" required placeholder="La Novia" data-astro-cid-qpidy52z> </div> <div class="form-group" data-astro-cid-qpidy52z> <label for="bankName" data-astro-cid-qpidy52z>Banco</label> <input type="text" id="bankName" name="bankName" required placeholder="Banco Nacional" data-astro-cid-qpidy52z> </div> <div class="form-group" data-astro-cid-qpidy52z> <label for="accountHolder" data-astro-cid-qpidy52z>Titular de la cuenta</label> <input type="text" id="accountHolder" name="accountHolder" required placeholder="Juan Pérez" data-astro-cid-qpidy52z> </div> <div class="form-group" data-astro-cid-qpidy52z> <label for="accountNumber" data-astro-cid-qpidy52z>Número de cuenta</label> <input type="text" id="accountNumber" name="accountNumber" required placeholder="0123-4567-8901" data-astro-cid-qpidy52z> </div> <div class="form-group" data-astro-cid-qpidy52z> <label for="accountType" data-astro-cid-qpidy52z>Tipo de cuenta</label> <input type="text" id="accountType" name="accountType" placeholder="Cuenta de Ahorros" data-astro-cid-qpidy52z> </div> <div class="form-group" data-astro-cid-qpidy52z> <label for="transferAlias" data-astro-cid-qpidy52z>Alias / Zelle / PayPal (opcional)</label> <input type="text" id="transferAlias" name="transferAlias" placeholder="ejemplo@zelle.com" data-astro-cid-qpidy52z> </div> <div class="form-group" data-astro-cid-qpidy52z> <label for="order" data-astro-cid-qpidy52z>Orden de aparición</label> <input type="number" id="order" name="order" value="0" min="0" data-astro-cid-qpidy52z> </div> </div> <div class="form-actions" data-astro-cid-qpidy52z> <button type="submit" class="btn btn-forest" data-astro-cid-qpidy52z>Guardar</button> <button type="button" id="clear-btn" class="btn btn-outline" data-astro-cid-qpidy52z>Limpiar</button> </div> </form> </div> <!-- Existing entries --> <div class="list-card" data-astro-cid-qpidy52z> <h3 class="card-title" data-astro-cid-qpidy52z>💳 Cuentas Registradas</h3> ${donations.length === 0 && renderTemplate`<p class="empty" data-astro-cid-qpidy52z>No hay cuentas registradas.</p>`} <div class="donations-list" data-astro-cid-qpidy52z> ${donations.map((d) => renderTemplate`<div class="donation-row" data-astro-cid-qpidy52z> <div class="donation-info" data-astro-cid-qpidy52z> <p class="donation-label" data-astro-cid-qpidy52z>${d.personName}</p> <p class="donation-meta" data-astro-cid-qpidy52z>${d.bankName} · ${d.accountHolder} · ${d.accountNumber}</p> ${d.transferAlias && renderTemplate`<p class="donation-alias" data-astro-cid-qpidy52z>${d.transferAlias}</p>`} </div> <div class="row-actions" data-astro-cid-qpidy52z> <button type="button" class="btn-edit"${addAttribute(d.id, "data-id")}${addAttribute(d.personName, "data-personname")}${addAttribute(d.bankName, "data-bankname")}${addAttribute(d.accountHolder, "data-accountholder")}${addAttribute(d.accountNumber, "data-accountnumber")}${addAttribute(d.accountType, "data-accounttype")}${addAttribute(d.transferAlias || "", "data-transferalias")}${addAttribute(d.order, "data-order")} data-astro-cid-qpidy52z>
✏️ Editar
</button> <form method="POST" style="display:inline" class="form-delete" data-astro-cid-qpidy52z> <input type="hidden" name="_action" value="delete" data-astro-cid-qpidy52z> <input type="hidden" name="id"${addAttribute(d.id, "value")} data-astro-cid-qpidy52z> <button type="submit" class="btn-delete" data-astro-cid-qpidy52z>🗑</button> </form> </div> </div>`)} </div> </div> </main> </div> ` })} ${renderScript($$result, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/donaciones.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/donaciones.astro", void 0);

const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/donaciones.astro";
const $$url = "/admin/donaciones";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Donaciones,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
