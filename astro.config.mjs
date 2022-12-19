import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import m2dx from 'astro-m2dx';
import tailwind from '@astrojs/tailwind';
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import solidJs from "@astrojs/solid-js";

/** @type {import('astro-m2dx').Options} */
const m2dxOptions = {
  // activate any required feature here
};

// https://astro.build/config
export default defineConfig({
  site: 'https://robrothschild.com',
  integrations: [mdx(), tailwind(), image(), sitemap(), react(), solidJs()],
  markdown: {
    drafts: true,
    remarkPlugins: [[m2dx, m2dxOptions]],
    //               ^^^^
    extendDefaultPlugins: true,
  }
});