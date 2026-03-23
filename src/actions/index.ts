import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { db, Guest, Table, Settings, GalleryImage, DonationInfo, eq } from 'astro:db';

// ── Bible verses (Reina Valera 1960) ─────────────────────────────────────────
const BIBLE_VERSES = [
  { text: "El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece.", ref: "1 Corintios 13:4" },
  { text: "Y sobre todas estas cosas vestíos de amor, que es el vínculo perfecto.", ref: "Colosenses 3:14" },
  { text: "El que halló esposa halló el bien, y alcanzó la benevolencia de Jehová.", ref: "Proverbios 18:22" },
  { text: "Amados, amémonos unos a otros; porque el amor es de Dios.", ref: "1 Juan 4:7" },
  { text: "Por tanto, lo que Dios juntó, no lo separe el hombre.", ref: "Marcos 10:9" },
  { text: "Yo soy de mi amado, y mi amado es mío.", ref: "Cantares 6:3" },
  { text: "El amor nunca deja de ser; pero las profecías se acabarán, y cesarán las lenguas.", ref: "1 Corintios 13:8" },
  { text: "Mas yo y mi casa serviremos a Jehová.", ref: "Josué 24:15" },
  { text: "Casa y riquezas son herencia de los padres; mas de Jehová la mujer prudente.", ref: "Proverbios 19:14" },
  { text: "Pon me como un sello sobre tu corazón, como una marca sobre tu brazo; porque fuerte es como la muerte el amor.", ref: "Cantares 8:6" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function normalizeText(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function nameMatches(inputName: string, guestName: string): boolean {
  const inputWords = normalizeText(inputName).split(/\s+/).filter(Boolean);
  const guestWords = normalizeText(guestName).split(/\s+/).filter(Boolean);
  if (inputWords.length < 2) return false; // require at least first name & surname
  
  // Try exact first-name first-surname match
  if (inputWords[0] === guestWords[0] && inputWords[1] === guestWords[1]) return true;
  
  // Try matching any two words (e.g., if they have two names and two surnames in DB)
  let matches = 0;
  for (const iw of inputWords) {
    if (guestWords.includes(iw)) matches++;
  }
  return matches >= 2;
}

const THANK_YOU_MESSAGES = [
  "Gracias por compartir este día tan especial con nosotros.",
  "Nuestra alegría es mayor porque estarás allí.",
  "Agradecemos de corazón tu presencia en nuestra boda.",
  "Gracias por ser parte de nuestra historia de amor.",
  "Tu presencia es el mejor regalo para nosotros."
];

function randomVerse() {
  const verse = BIBLE_VERSES[Math.floor(Math.random() * BIBLE_VERSES.length)];
  const msg = THANK_YOU_MESSAGES[Math.floor(Math.random() * THANK_YOU_MESSAGES.length)];
  return { message: msg, ...verse };
}

// ── Actions ───────────────────────────────────────────────────────────────────
export const server = {
  rsvp: {
    submitByName: defineAction({
      accept: 'form',
      input: z.object({
        guestName: z.string().min(3, 'Por favor ingresa tu nombre completo.'),
        status: z.enum(['confirmed', 'declined']),
        dietaryRestrictions: z.string().optional(),
        notes: z.string().optional()
      }),
      handler: async (input) => {
        const allGuests = await db.select().from(Guest);
        const match = allGuests.find(g => nameMatches(input.guestName, g.name));

        if (!match) {
          throw new Error('Ha ocurrido un error, verifique que haya sido invitado.');
        }

        // ── Family Group Logic ───────────────────────────────────────────────
        let groupGuests = [match];
        if (match.familyGroup) {
          const fg = normalizeText(match.familyGroup);
          groupGuests = allGuests.filter(g => g.familyGroup && normalizeText(g.familyGroup) === fg);
        }
        
        // Use primary match for status check
        if (match.status !== 'pending') {
          const alreadyMsg = match.status === 'confirmed'
            ? '¡Ya confirmaste tu asistencia anteriormente! 🎉 Nos vemos en la boda.'
            : 'Ya indicaste que no podrías asistir. Si necesitas cambiar tu respuesta, contáctanos directamente.';
            
          const groupNamesMsg = groupGuests.length > 1 
            ? `<br/><small>Invitados marcados: ${groupGuests.map(g => g.name).join(', ')}</small>` 
            : '';

          return {
            success: true,
            alreadyResponded: true,
            guestName: match.name,
            message: alreadyMsg + groupNamesMsg,
            bibleVerse: null,
          };
        }

        // Update all guests in the group
        for (const guest of groupGuests) {
          // Add notes/diet to primary match only, to avoid dupes, but status to all
          await db.update(Guest).set({
            status: input.status,
            dietaryRestrictions: guest.id === match.id ? (input.dietaryRestrictions || null) : guest.dietaryRestrictions,
            notes: guest.id === match.id ? (input.notes || null) : guest.notes,
            updatedAt: new Date()
          }).where(eq(Guest.id, guest.id));
        }

        const totalAllowed = groupGuests.reduce((acc, g) => acc + g.partySize, 0);
        const groupNamesMsg = groupGuests.length > 1
          ? `<div style="margin-top:1.5rem; padding:1.25rem; background:rgba(201,169,110,0.15); border: 1px solid rgba(201,169,110,0.4); border-radius:12px; color:white; font-size:1.1rem; line-height:1.5;"><strong>🏛️ Invitación Familiar (${totalAllowed} personas)</strong><br/><span style="font-size:0.95rem; opacity:0.9; display:inline-block; margin-top:0.5rem;">${groupGuests.map(g => g.name).join(', ')}</span></div>`
          : '';

        const statusMsg = input.status === 'confirmed'
          ? `¡Nos alegra que puedas acompañarnos! 🎉${groupNamesMsg}`
          : 'Lamentamos que no puedas estar con nosotros.';

        const verse = match.showBibleVerse && input.status === 'confirmed' ? randomVerse() : null;

        return {
          success: true,
          alreadyResponded: false,
          guestName: match.name,
          message: statusMsg,
          bibleVerse: verse,
        };
      }
    }),

    // Legacy code-based (kept for compat)
    submit: defineAction({
      accept: 'form',
      input: z.object({
        uniqueCode: z.string().min(3),
        status: z.enum(['confirmed', 'declined']),
        dietaryRestrictions: z.string().optional(),
        notes: z.string().optional()
      }),
      handler: async (input) => {
        const [guest] = await db.select().from(Guest).where(eq(Guest.uniqueCode, input.uniqueCode));
        if (!guest) throw new Error('Código de invitado no válido.');
        await db.update(Guest).set({ status: input.status, updatedAt: new Date() }).where(eq(Guest.uniqueCode, input.uniqueCode));
        return { success: true, message: 'RSVP guardado correctamente.' };
      }
    }),
  },

  seating: {
    assign: defineAction({
      accept: 'json',
      input: z.object({ guestId: z.number(), tableId: z.number().nullable() }),
      handler: async (input) => {
        if (input.tableId !== null) {
          const [table] = await db.select().from(Table).where(eq(Table.id, input.tableId));
          if (!table) throw new Error('Mesa no encontrada');
          const currentGuests = await db.select().from(Guest).where(eq(Guest.tableId, input.tableId));
          const [guestToAssign] = await db.select().from(Guest).where(eq(Guest.id, input.guestId));
          if (!guestToAssign) throw new Error('Invitado no encontrado');
          const currentOcc = currentGuests.filter(g => g.id !== input.guestId).reduce((a, g) => a + g.partySize, 0);
          if (currentOcc + guestToAssign.partySize > table.capacity) {
            throw new Error(`Capacidad máxima excedida (falta espacio para ${guestToAssign.partySize} personas).`);
          }
        }
        await db.update(Guest).set({ tableId: input.tableId, updatedAt: new Date() }).where(eq(Guest.id, input.guestId));
        return { success: true };
      }
    })
  },

  tables: {
    create: defineAction({
      accept: 'form',
      input: z.object({ name: z.string().min(1), capacity: z.coerce.number().min(1).max(30) }),
      handler: async (input) => {
        const allTables = await db.select().from(Table);
        const maxOrder = allTables.reduce((m, t) => Math.max(m, t.order), 0);
        await db.insert(Table).values({ name: input.name, capacity: input.capacity, order: maxOrder + 1, type: 'circular' });
        return { success: true };
      }
    }),
    delete: defineAction({
      accept: 'json',
      input: z.object({ tableId: z.number() }),
      handler: async (input) => {
        await db.update(Guest).set({ tableId: null }).where(eq(Guest.tableId, input.tableId));
        await db.delete(Table).where(eq(Table.id, input.tableId));
        return { success: true };
      }
    })
  },

  settings: {
    update: defineAction({
      accept: 'form',
      input: z.object({
        weddingDate: z.string(), ceremonyTime: z.string(), receptionTime: z.string(),
        ceremonyVenue: z.string(), ceremonyAddress: z.string(),
        receptionVenue: z.string(), receptionAddress: z.string(),
        heroTitle: z.string(), heroSubtitle: z.string(), mapEmbedUrl: z.string(),
      }),
      handler: async (input) => {
        await db.update(Settings).set({ ...input, updatedAt: new Date() }).where(eq(Settings.id, 1));
        return { success: true };
      }
    })
  },

  gallery: {
    delete: defineAction({
      accept: 'json',
      input: z.object({ imageId: z.number() }),
      handler: async (input) => {
        await db.delete(GalleryImage).where(eq(GalleryImage.id, input.imageId));
        return { success: true };
      }
    }),
    updateOrder: defineAction({
      accept: 'json',
      input: z.object({ imageId: z.number(), order: z.number() }),
      handler: async (input) => {
        await db.update(GalleryImage).set({ order: input.order }).where(eq(GalleryImage.id, input.imageId));
        return { success: true };
      }
    })
  },

  guests: {
    // toggleBibleVerse — called from admin panel
    toggleBibleVerse: defineAction({
      accept: 'json',
      input: z.object({ guestId: z.number(), value: z.boolean() }),
      handler: async (input) => {
        await db.update(Guest).set({ showBibleVerse: input.value }).where(eq(Guest.id, input.guestId));
        return { success: true };
      }
    }),

    // resetStatus — called from admin to let guest re-submit RSVP
    resetStatus: defineAction({
      accept: 'json',
      input: z.object({ guestId: z.number() }),
      handler: async (input) => {
        await db.update(Guest).set({ status: 'pending', updatedAt: new Date() }).where(eq(Guest.id, input.guestId));
        return { success: true };
      }
    }),
  },

  donations: {
    upsert: defineAction({
      accept: 'form',
      input: z.object({
        id: z.coerce.number().optional(),
        personName: z.string().min(1),
        bankName: z.string().min(1),
        accountHolder: z.string().min(1),
        accountNumber: z.string().min(1),
        accountType: z.string().default('Cuenta Corriente'),
        transferAlias: z.string().optional(),
        order: z.coerce.number().default(0),
      }),
      handler: async (input) => {
        if (input.id) {
          const { id, ...rest } = input;
          await db.update(DonationInfo).set(rest).where(eq(DonationInfo.id, id));
        } else {
          const { id: _id, ...rest } = input;
          await db.insert(DonationInfo).values({ ...rest, isActive: true });
        }
        return { success: true };
      }
    }),
    delete: defineAction({
      accept: 'json',
      input: z.object({ id: z.number() }),
      handler: async (input) => {
        await db.delete(DonationInfo).where(eq(DonationInfo.id, input.id));
        return { success: true };
      }
    }),
  },
};
