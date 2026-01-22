import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [tailwindcss(), enhancedImages(), sveltekit()],
	ssr: {
		noExternal: ['liquid-glass-svelte', 'bits-ui', 'griddy-icons']
	},
	resolve: {
		alias: {
			$images: resolve(__dirname, 'static/images')
		}
	}
});
