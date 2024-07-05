<script lang="ts" setup>
const { navItems } = await useArticles();
</script>

<template>
	<div>
		<div
			v-for="nav in navItems"
			:key="nav.title"
		>
			<NuxtLink
				v-if="'_path' in nav"
				:to="nav._path"
			>
				{{ nav.title }}
			</NuxtLink>
			<NuxtLink
				v-else
				:to="nav.url"
				target="_blank"
			>
				{{ nav.title }}
			</NuxtLink>
		</div>
	</div>
</template>
