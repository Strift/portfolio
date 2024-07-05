// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ['@nuxt/content', '@nuxt/image', '@nuxt/eslint'],
	compatibilityDate: '2024-07-05',
	eslint: {
		config: {
			stylistic: {
				indent: 2,
				semi: true,
			},
		},
	},
});
