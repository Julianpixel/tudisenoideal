import { defineDb, defineTable, column, NOW } from 'astro:db';

const Table = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    capacity: column.number(),
    order: column.number({ default: 0 }),
    zone: column.text({ optional: true }),
    type: column.text({ optional: true }),
  }
});

const Guest = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    uniqueCode: column.text({ unique: true }),
    name: column.text(),
    familyGroup: column.text({ optional: true }),
    partySize: column.number({ default: 1 }),
    dietaryRestrictions: column.text({ optional: true }),
    notes: column.text({ optional: true }),
    status: column.text({ default: 'pending' }), // pending | confirmed | declined
    tableId: column.number({ optional: true, references: () => Table.columns.id }),
    showBibleVerse: column.boolean({ default: false }), // show special verse on RSVP confirm
    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ default: NOW }),
  }
});

const Settings = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    weddingDate: column.text({ default: '2026-12-20' }),
    ceremonyTime: column.text({ default: '16:00' }),
    receptionTime: column.text({ default: '18:00' }),
    ceremonyVenue: column.text({ default: 'Parroquia de San Miguel' }),
    ceremonyAddress: column.text({ default: 'Av. Principal 123, Centro Histórico' }),
    receptionVenue: column.text({ default: 'Hacienda La Estancia' }),
    receptionAddress: column.text({ default: 'Camino Real km 4.5, Valle Verde' }),
    heroTitle: column.text({ default: 'Elias & María' }),
    heroSubtitle: column.text({ default: '20 de Diciembre, 2026' }),
    mapEmbedUrl: column.text({ default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15053.81640989012!2d-99.133208!3d19.432608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ce0026db097507%3A0x54061076265ee841!2sCiudad%20de%20M%C3%A9xico!5e0!3m2!1ses!2smx!4v1689230000000!5m2!1ses!2smx' }),
    updatedAt: column.date({ default: NOW }),
  }
});

const GalleryImage = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    url: column.text(),
    caption: column.text({ optional: true }),
    order: column.number({ default: 0 }),
    createdAt: column.date({ default: NOW }),
  }
});

const DonationInfo = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    personName: column.text(),        // "El Novio", "La Novia", etc.
    bankName: column.text(),
    accountHolder: column.text(),
    accountNumber: column.text(),
    accountType: column.text({ default: 'Cuenta Corriente' }),
    transferAlias: column.text({ optional: true }),  // Zelle, PayPal, etc.
    order: column.number({ default: 0 }),
    isActive: column.boolean({ default: true }),
  }
});

export default defineDb({
  tables: { Guest, Table, Settings, GalleryImage, DonationInfo }
});
