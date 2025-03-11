---
title: 'Implementing the Dependency Injection pattern in Vue 3'
date: 2024-12-23
updatedAt: 2025-01-21
description: Learn Dependency Injection in Vue 3 with this step-by-step guide. Master IoC containers, plugins, and composables for maintainable, testable apps.
cover: /images/articles/covers/vuejs.jpg
coverAlt: Vue.js logo
lang: 'en'
tags:
  - engineering
components:
  - 'advent-2024'
---

# Implementing the Dependency Injection pattern in Vue 3

**Dependency Injection** is a design pattern where objects or modules do not create their own dependencies. Instead, dependencies are “injected” from the outside, often through a constructor or function parameters.

```ts
// This function creates its `database` dependency
function getUserById (id: number) {
	const db = new Database(/* config */)
	return db.getUserById(id)
}

// This function's `database` dependency is injected
function getUserById (database: Database, id: number) {
	return db.getUserById(id)
}
```

Thanks to dependency injection, functions or classes can a dependenciy without knowing how it's instantiated or configured. In this guide, we will see how to implement this pattern with **Vue 3**. We will explain how this helps decouple logic to improve code maintainability and testability.

## The IoC container

### Using the Vue instance

In the context of **Dependency Injection**, IoC stands for **Inversion of Control**. The IoC container centralizes the responsibility of creating and configuring dependencies. Centralization makes it easier to swap services implementation for tests or migrations.

While it’s common for applications the pattern to create a _Container_ class representing the IoC container, this approach might not be necessary with Vue. Indeed, Vue comes with the dedicated [Provide / Inject API](https://vuejs.org/guide/components/provide-inject).

This allows us to directly bind dependencies to the Vue instance, effectively **using the Vue app as an IoC container**. To make them accessible in the entire app, we will use a **[Vue Plugin](https://vuejs.org/guide/reusability/plugins)**.

### Writing the dependency plugin

To bind our dependency to the Vue app, we’ll leverage [app-level provide](https://vuejs.org/guide/components/provide-inject.html#app-level-provide). This allows us to make the *DatabaseService* instance available to all components and composables in the application.

**src/plugins/database.ts**:

```ts
import { App } from 'vue';
import { databaseInjectionKey } from '@/keys';
import { DatabaseService } from '@/services/DatabaseService';

export default {
  install(app: App) {
    const database = new DatabaseService(/* some config */)
    app.provide(databaseInjectionKey, database);
  },
};
```

In this example, we use a `databaseInjectionKey` imported from `@/keys` to ensure the provided dependency is fully typed. See [how to type provide/inject](https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject) for more details.

**src/keys.ts**:

```ts
import type { DatabaseService } from '@/services/DatabaseService';
import { InjectionKey } from 'vue';

export const databaseInjectionKey = Symbol() as InjectionKey<DatabaseService>;
```

With our Plugin defined, let’s register it.

### Registering the Plugin

We will register our Plugin when creating the Vue app.

**src/main.ts**:

```ts
import { createApp } from 'vue';
import dbPlugin from '@/plugins/database';

const app = createApp({});

app.use(dbPlugin);
```

After registration, the _DatabaseService_ instance accessible throughout the entire application. Components and composables can use it without knowing how it's created.

## Dependency injection in Vue composables

### Using dependencies (in a composable)

Let's use our injected database dependency in one of our composable. Here’s how we can define a composable that uses the _DatabaseService_ to get data about users:

**src/composables/useUsers.ts**:

```ts
import { databaseInjectionkey } from "@/constants";
import { inject } from 'vue';

export function useUsers() {
  const db = inject(databaseInjectionKey);

  if (!db) {
    throw new Error('No database bound to the container');
  }

  const list = async () => {
    return database.users.findAll();
  };

  const getById = async (id: number) => {
    return database.users.find(id);
  };

  return {
    list,
    getById,
  };
}
```

It uses the _DatabaseService_ without caring about about how it’s instantiated. This is particularly useful when working with shared logic like accessing the database.

For brevity, we directly pulled the container from the Vue app. In practice, I recommend [wrapping dependencies in a composable](/blog/dependency-helper-composable) for better type safety and consistent error handling.

### Using the composable in a component

To illustrate how this composable is used, let’s create a _UserList_ component that displays a list of users.

**src/components/UserList.vue**:

```vue
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useUsers } from '@/composables/useUsers';
const { list } = useUsers();

const	users = await list();
</script>

<template>
  <div v-for="user in users" :key="user.id">
    {{ user }}
  </div>
</template>
```

This component fetches the user list using the `useUsers` composable and renders it in a simple loop. The composable abstracts away the implementation details of how users are retrieved.

## Writing tests

Sorry, I didn't get to write this yet. But I explained it in my [Vue.js Nation 2025 talk](https://www.youtube.com/watch?v=aki7mLNAgzk). You can watch it directly here:

<iframe class="mx-auto" width="560" height="315" src="https://www.youtube-nocookie.com/embed/aki7mLNAgzk?si=SRgbyybJvIOd_ymo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Conclusion

We have implemented the Dependency Injection design pattern in a Vue application. This allows the decoupling of logic in three identified areas:
- Services creation — in the container
- Business logic — in the composable
- Rendering logic — in the component

This decoupled approach promotes reusability and makes testing easier, as different modules can be mocked or replaced without affecting the consuming code.
