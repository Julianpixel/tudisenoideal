import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { P as renderTemplate, y as maybeRenderHead, a3 as addAttribute } from './sequence_DK-jjJFr.mjs';
import { r as renderComponent } from './entrypoint_BZjGfNhw.mjs';
import { $ as $$Layout } from './Layout_rRTzOQrC.mjs';
import { $ as $$Sidebar } from './Sidebar_CO6nhXP_.mjs';
import { d as db, a as GalleryImage } from './_astro_db_8BCavLB5.mjs';
import { mkdir, writeFile } from 'node:fs/promises';
import nodePath from 'node:path';
import { eq } from '@astrojs/db/dist/runtime/virtual.js';

const prerender = false;
const $$Galeria = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Galeria;
  let successMsg = "";
  let errorMsg = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    if (action === "upload") {
      const file = form.get("image");
      const caption = form.get("caption") || null;
      if (file && file.size > 0) {
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
          const filename = `${Date.now()}.${ext}`;
          const dir = nodePath.join(process.cwd(), "public", "gallery");
          await mkdir(dir, { recursive: true });
          await writeFile(nodePath.join(dir, filename), buffer);
          const githubToken = undefined                            ;
          if (githubToken) ;
          const allImages = await db.select().from(GalleryImage);
          const maxOrder = allImages.reduce((m, i) => Math.max(m, i.order), 0);
          await db.insert(GalleryImage).values({ url: `/gallery/${filename}`, caption, order: maxOrder + 1 });
          successMsg = "✓ Imagen subida correctamente.";
        } catch (e) {
          errorMsg = `Error al subir: ${e instanceof Error ? e.message : "Error desconocido"}`;
        }
      } else {
        errorMsg = "Por favor selecciona una imagen válida.";
      }
    } else if (action === "delete") {
      const id = parseInt(form.get("imageId"), 10);
      await db.delete(GalleryImage).where(eq(GalleryImage.id, id));
      successMsg = "✓ Imagen eliminada.";
    } else if (action === "update") {
      const id = parseInt(form.get("imageId"), 10);
      const order = parseInt(form.get("order"), 10) || 0;
      const orientation = form.get("orientation") || "auto";
      await db.update(GalleryImage).set({ order, orientation }).where(eq(GalleryImage.id, id));
      successMsg = "✓ Imagen actualizada.";
    }
  }
  const images = await db.select().from(GalleryImage);
  images.sort((a, b) => a.order - b.order);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-mtiu7ydc": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="admin-shell" data-astro-cid-mtiu7ydc> ${renderComponent($$result2, "Sidebar", $$Sidebar, { "currentPath": "/admin/galeria", "data-astro-cid-mtiu7ydc": true })} <main class="admin-main" data-astro-cid-mtiu7ydc> <header class="admin-header" data-astro-cid-mtiu7ydc> <div data-astro-cid-mtiu7ydc> <p class="header-eyebrow" data-astro-cid-mtiu7ydc>Panel de Administración</p> <h1 class="header-title" data-astro-cid-mtiu7ydc>Galería de Imágenes</h1> </div> <a href="/" class="btn btn-forest btn-sm" target="_blank" data-astro-cid-mtiu7ydc>Ver Sitio →</a> </header> ${successMsg && renderTemplate`<div class="alert alert-success" data-astro-cid-mtiu7ydc>${successMsg}</div>`} ${errorMsg && renderTemplate`<div class="alert alert-error" data-astro-cid-mtiu7ydc>${errorMsg}</div>`} <!-- Upload form --> <div class="upload-card" data-astro-cid-mtiu7ydc> <h3 class="card-title" data-astro-cid-mtiu7ydc>Subir Imagen</h3> <form method="POST" enctype="multipart/form-data" class="upload-form" data-astro-cid-mtiu7ydc> <input type="hidden" name="_action" value="upload" data-astro-cid-mtiu7ydc> <label data-astro-cid-mtiu7ydc>Imagen</label> <input type="file" name="image" accept="image/jpeg, image/png, image/webp" required data-astro-cid-mtiu7ydc> <label data-astro-cid-mtiu7ydc>Leyenda</label> <input type="text" name="caption" data-astro-cid-mtiu7ydc> <button type="submit" class="btn btn-forest" data-astro-cid-mtiu7ydc>Subir</button> </form> </div> <!-- Gallery grid --> <div class="gallery-admin" data-astro-cid-mtiu7ydc> <div class="gallery-header" data-astro-cid-mtiu7ydc> <h3 class="card-title" data-astro-cid-mtiu7ydc>📷 Imágenes Actuales (${images.length})</h3> </div> ${images.length === 0 && renderTemplate`<div class="empty-state" data-astro-cid-mtiu7ydc>No hay imágenes en la galería todavía.</div>`} <div class="gallery-grid" data-astro-cid-mtiu7ydc> ${images.map((img) => renderTemplate`<div class="gallery-item" data-astro-cid-mtiu7ydc> <img${addAttribute(img.url, "src")}${addAttribute(img.caption || "Foto", "alt")} loading="lazy" data-astro-cid-mtiu7ydc> <div class="item-info" data-astro-cid-mtiu7ydc> <p class="item-caption" data-astro-cid-mtiu7ydc>${img.caption || renderTemplate`<em data-astro-cid-mtiu7ydc>Sin pie de foto</em>`}</p> <form method="POST" class="inline-edit" data-astro-cid-mtiu7ydc> <input type="hidden" name="imageId"${addAttribute(img.id, "value")} data-astro-cid-mtiu7ydc> <div class="edit-row" data-astro-cid-mtiu7ydc> <div data-astro-cid-mtiu7ydc> <label data-astro-cid-mtiu7ydc>Orden:</label> <input type="number" name="order"${addAttribute(img.order, "value")} min="0" data-astro-cid-mtiu7ydc> </div> <div data-astro-cid-mtiu7ydc> <label data-astro-cid-mtiu7ydc>Tipo:</label> <select name="orientation" data-astro-cid-mtiu7ydc> <option value="auto"${addAttribute(img.orientation === "auto", "selected")} data-astro-cid-mtiu7ydc>Auto</option> <option value="vertical"${addAttribute(img.orientation === "vertical", "selected")} data-astro-cid-mtiu7ydc>Vertical</option> <option value="horizontal"${addAttribute(img.orientation === "horizontal", "selected")} data-astro-cid-mtiu7ydc>Horiz</option> </select> </div> </div> <div class="action-row" data-astro-cid-mtiu7ydc> <button type="submit" name="_action" value="update" class="btn-save btn-sm" data-astro-cid-mtiu7ydc>Guardar</button> <button type="submit" name="_action" value="delete" class="btn-delete btn-sm" onclick="return confirm('Confirmar eliminar');" data-astro-cid-mtiu7ydc>Borrar</button> </div> </form> </div> </div>`)} </div> </div> </main> </div> ` })}`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/galeria.astro", void 0);
const $$file = "C:/Users/eliasr/Videos/plantilla de bodas/src/pages/admin/galeria.astro";
const $$url = "/admin/galeria";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Galeria,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
