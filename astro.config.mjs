import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  site: 'https://rarothschild.github.io',
  base: '/RobIndustries',
  integrations: [mdx(), tailwind(), image()],
  markdown: {
    drafts: true,
  },
});