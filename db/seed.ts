import { db, Table, Guest, Settings, GalleryImage, DonationInfo } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Table).values([
    { id: 1, name: 'Mesa Principal', capacity: 10, order: 1, type: 'circular' },
    { id: 2, name: 'Mesa 2', capacity: 10, order: 2, type: 'circular' },
    { id: 3, name: 'Mesa 3', capacity: 8, order: 3, type: 'circular' },
  ]);

  await db.insert(Guest).values([
    { id: 1, uniqueCode: 'GUEST-001', name: 'Juan Pérez', partySize: 2, status: 'pending', tableId: 1, showBibleVerse: false },
    { id: 2, uniqueCode: 'GUEST-002', name: 'Ana García', partySize: 1, status: 'pending', showBibleVerse: false },
    { id: 3, uniqueCode: 'GUEST-003', name: 'Carlos López', partySize: 4, status: 'pending', tableId: 2, showBibleVerse: false },
  ]);

  await db.insert(Settings).values([{
    id: 1,
    weddingDate: '2026-12-20',
    ceremonyTime: '16:00',
    receptionTime: '18:00',
    ceremonyVenue: 'Parroquia de San Miguel',
    ceremonyAddress: 'Av. Principal 123, Centro Histórico',
    receptionVenue: 'Hacienda La Estancia',
    receptionAddress: 'Camino Real km 4.5, Valle Verde',
    heroTitle: 'Elias & María',
    heroSubtitle: '20 de Diciembre, 2026',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15053.81640989012!2d-99.133208!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sCiudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1689230000000!5m2!1ses!2smx',
  }]);

  await db.insert(GalleryImage).values([
    { id: 1, url: '/gallery/couples-sunset.jpg',  caption: 'El amor en su esencia', order: 1 },
    { id: 2, url: '/gallery/ceremony-arch.jpg',   caption: 'Donde comenzará todo',  order: 2 },
    { id: 3, url: '/gallery/reception-hall.jpg',  caption: 'La fiesta nos espera',  order: 3 },
    { id: 4, url: '/gallery/bouquet.jpg',          caption: 'Detalles con amor',     order: 4 },
    { id: 5, url: '/gallery/rings.jpg',            caption: 'Para toda la vida',     order: 5 },
  ]);

  await db.insert(DonationInfo).values([
    {
      id: 1,
      personName: 'El Novio',
      bankName: 'Banco Nacional',
      accountHolder: 'Elias Rodríguez',
      accountNumber: '0123-4567-8901-2345',
      accountType: 'Cuenta Corriente',
      transferAlias: 'elias.boda@zelle.com',
      order: 1,
      isActive: true,
    },
    {
      id: 2,
      personName: 'La Novia',
      bankName: 'Banco Popular',
      accountHolder: 'María González',
      accountNumber: '9876-5432-1098-7654',
      accountType: 'Cuenta de Ahorros',
      transferAlias: 'maria.boda@zelle.com',
      order: 2,
      isActive: true,
    },
  ]);
}
