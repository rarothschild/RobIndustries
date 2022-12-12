import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://rarothschild.github.io',
  integrations: [mdx(), tailwind(), image(), sitemap(), react(), solidJs()],
  markdown: {
    drafts: true
  }
});