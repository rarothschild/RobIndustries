import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  site: 'https://rarothschild.github.io',
  base: '/RobIndustries',
  integrations: [mdx(), tailwind(), image(), sitemap(), react()],
  markdown: {
    drafts: true
  }
});