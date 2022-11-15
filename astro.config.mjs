import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	site: 'https://rarothschild.github.io',
  	base: '/RobIndustires',
	integrations: [mdx(), tailwind()],
});
