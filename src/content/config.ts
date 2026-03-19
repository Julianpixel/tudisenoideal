import { defineCollection, z } from 'astro:content';

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.enum(['globos', 'resina', 'letreros', 'styrofoam', 'eventos', 'otros']),
  }),
});

export const collections = {
  gallery: galleryCollection,
};
