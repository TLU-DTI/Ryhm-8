import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
	plugins: [sveltekit(), ViteImageOptimizer({
    /* pass your config */
  }),],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
