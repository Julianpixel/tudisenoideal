import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const galleryCollection = defineCollection({
  // Use the glob loader to load all markdown files from the gallery folder
  loader: glob({ pattern: "**/*.md", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    image: z.string(),
    category: z.enum(['globos', 'resina', 'letreros', 'styrofoam', 'eventos', 'otros']),
  }),
});

export const collections = {
  gallery: galleryCollection,
};
