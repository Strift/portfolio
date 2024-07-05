// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: [
		'@nuxt/content',
		'@nuxt/image',
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		'@nuxt/fonts',
	],
	compatibilityDate: '2024-07-05',
	eslint: {
		config: {
			stylistic: {
				indent: 2,
				semi: true,
			},
		},
	},
	fonts: {
		families: [
			{ name: 'Poppins', weights: ['800'] },
		],
	},
});
