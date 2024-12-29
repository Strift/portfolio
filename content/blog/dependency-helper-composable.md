---
title: 'Wrapping dependencies in a composable with Nuxt and Vue'
date: 2024-12-24
description: Learn to solve dependency injection challenges in Nuxt and Vue with a simple composable helper.
cover: /images/articles/covers/vuejs.jpg
coverAlt: Vue.js logo
lang: 'en'
tags:
  - engineering
  - vue
components:
  - 'advent-2024'
---

# Wrapping dependencies in a composable with Nuxt and Vue

[Dependency injection](/blog/vue-dependency-injection) is a core pattern in Nuxt and Vue for managing shared services across your application. However, the consuming code cannot know if the dependency has been properly provided. So we need to check for its existence.

Here’s a tip I always use to centralize dependency access and error handling to ensure consistency in my Nuxt 3 applications.

> Looking for vanilla Vue examples? [Jump to the final section](#vue-differences)!

## The problem: Ensuring dependencies are properly provided

Say you have a [Nuxt Plugin](https://nuxt.com/docs/guide/directory-structure/plugins), that provides a service to your Nuxt app:

**plugins/auth.ts**

```ts
export default defineNuxtPlugin(() => {
	 const authService = new AuthService();
	 return {
		 provide: {
			 auth: authService
		 }
	 }
 });
```

At runtime, there's no guarantee that the service will be provided. So before using it, you need to test if it has been provided:

**composables/useAuth.ts:**

```ts
export function useAuth() {
  const { $auth } = useNuxtApp();

  if (!$auth) {
    throw new Error('No auth service injected');
  }

  // your composable logic
}
```

This gets redundant as you need check in every composable using the service. Throwing error codes becomes the responsibility of each composable, leading to potential inconsistency in error messages and debugging.

## The solution: a centralized helper composable

The solution is simple, create a centralized helper composable to access the dependency:

**composables/useAuth.ts:**

```ts
import { useNuxtApp } from '#app'

export function useAuth() {
  const { $auth } = useNuxtApp()

  if (!$auth) {
    throw new Error('[Dependency Injection] $auth is not injected. Please ensure the plugin is properly configured.')
  }

  return $auth
}
```

Now, you can safely use your auth service without additional null checks in your composables. Tada 🎉

**Key benefits of using a centralized helper composable:**
- Centralizes error handling, ensuring consistency
- Eliminates redundant null checks across the application
- Adheres to DRY principles for cleaner, maintainable code

Using a centralized composable also makes it easier to enforce type safety, making the code more predictable and easier to debug.

Want to dive deeper into how to dependency injection works in Vue? Read my guide on [Implementing the Dependency Injection pattern in Vue](/blog/vue-dependency-injection).

---

Continue reading to learn how can achieve this in a standalone Vue application.

## Vue differences

In a vanilla Vue application, you typically provide dependencies by using a Vue Plugin with app-level provide:

**src/plugins/auth-plugin.ts:**

```ts
import type { App } from 'vue';
import { AuthService } from '@/services/auth.ts';

export default {
  install(app: App) {
    const authService = new AuthService();
    app.provide('auth', authService);
  },
};
```

In a vanilla Vue application, you can retrieve the provided dependency using `inject`:

**src/composables/useUsers.ts:**

```ts
export function useUsers() {
  const authService = inject('auth');

  if (!authService) {
    throw new Error('No auth service injected');
  }

  // your composable logic
}
```

The solution is the same—wrapping the dependency retrieval logic in a dedicated composable!
