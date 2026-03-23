// @ts-check
import { defineConfig } from 'astro/config';

import db from '@astrojs/db';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [db(), react()],

  adapter: vercel(),

  vite: {
    optimizeDeps: {
      include: ['react', 'react-dom/client', 'react-dom']
    }
  }
});