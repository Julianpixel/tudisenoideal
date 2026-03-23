import { c as createComponent } from './astro-component_CGKjZ9A7.mjs';
import 'piccolore';
import { y as maybeRenderHead, a3 as addAttribute, P as renderTemplate } from './sequence_DK-jjJFr.mjs';
import 'clsx';

const $$Sidebar = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Sidebar;
  const { currentPath } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<aside class="sidebar" data-astro-cid-sihnm2gf> <div class="sidebar-brand" data-astro-cid-sihnm2gf> <span class="brand-icon" data-astro-cid-sihnm2gf>❧</span> <span class="brand-name" data-astro-cid-sihnm2gf>Wedding<br data-astro-cid-sihnm2gf>Admin</span> </div> <nav class="sidebar-nav" data-astro-cid-sihnm2gf> <a href="/admin/dashboard"${addAttribute(`nav-item ${currentPath === "/admin/dashboard" ? "active" : ""}`, "class")} data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><rect x="3" y="3" width="7" height="7" rx="2" data-astro-cid-sihnm2gf></rect><rect x="14" y="3" width="7" height="7" rx="2" data-astro-cid-sihnm2gf></rect><rect x="14" y="14" width="7" height="7" rx="2" data-astro-cid-sihnm2gf></rect><rect x="3" y="14" width="7" height="7" rx="2" data-astro-cid-sihnm2gf></rect></svg>
Dashboard
</a> <a href="/admin/contenido"${addAttribute(`nav-item ${currentPath === "/admin/contenido" ? "active" : ""}`, "class")} data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" data-astro-cid-sihnm2gf></path><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" data-astro-cid-sihnm2gf></path></svg>
Contenido
</a> <a href="/admin/galeria"${addAttribute(`nav-item ${currentPath === "/admin/galeria" ? "active" : ""}`, "class")} data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><rect x="3" y="3" width="18" height="18" rx="2" data-astro-cid-sihnm2gf></rect><circle cx="8.5" cy="8.5" r="1.5" data-astro-cid-sihnm2gf></circle><polyline points="21 15 16 10 5 21" data-astro-cid-sihnm2gf></polyline></svg>
Galería
</a> <a href="/admin/mesas"${addAttribute(`nav-item ${currentPath === "/admin/mesas" ? "active" : ""}`, "class")} data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><circle cx="12" cy="12" r="9" data-astro-cid-sihnm2gf></circle><circle cx="12" cy="12" r="3" data-astro-cid-sihnm2gf></circle><path d="M12 3v3M12 18v3M3 12h3M18 12h3" data-astro-cid-sihnm2gf></path></svg>
Mesas
</a> <a href="/admin/grupos"${addAttribute(`nav-item ${currentPath === "/admin/grupos" ? "active" : ""}`, "class")} data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" data-astro-cid-sihnm2gf></path><circle cx="9" cy="7" r="4" data-astro-cid-sihnm2gf></circle><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" data-astro-cid-sihnm2gf></path></svg>
Grupos Familiares
</a> <a href="/admin/donaciones"${addAttribute(`nav-item ${currentPath === "/admin/donaciones" ? "active" : ""}`, "class")} data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" data-astro-cid-sihnm2gf></path></svg>
Donaciones
</a> <a href="/admin/logout" class="nav-item nav-logout" data-astro-cid-sihnm2gf> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-astro-cid-sihnm2gf><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" data-astro-cid-sihnm2gf></path></svg>
Cerrar Sesión
</a> </nav> </aside>`;
}, "C:/Users/eliasr/Videos/plantilla de bodas/src/components/admin/Sidebar.astro", void 0);

export { $$Sidebar as $ };
