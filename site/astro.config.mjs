// @ts-check
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://cixiangtao.github.io',
	base: '/cixiangtao',
	trailingSlash: 'always',
	i18n: {
		locales: ['en', 'zh'],
		defaultLocale: 'en',
		routing: {
			prefixDefaultLocale: false,
		},
	},
	devToolbar: {
		enabled: false,
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
