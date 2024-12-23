---
title: 'Implementing the Dependency Injection pattern in Vue 3'
date: 2024-12-23
description: Learn Dependency Injection in Vue 3 with this step-by-step guide. Master IoC containers, plugins, and composables for maintainable, testable apps.
cover: /images/articles/covers/vuejs.jpg
coverAlt: Vue.js logo
lang: 'en'
tags:
  - engineering
---

# Implementing the Dependency Injection pattern in Vue 3

**Dependency Injection** is a design pattern where objects or modules do not create their own dependencies. Instead, dependencies are “injected” from the outside, often through a constructor or function parameters.

In this guide, we will see how to implement this pattern with Vue 3. We will explain how this helps decouple logic to improve code maintainability and testability.

## The IoC container

In the context of **Dependency Injection**, IoC stands for **Inversion of Control**. The IoC container is thus named because it centralizes the responsibility of creating dependencies, which is opposite to modules creating their own.

The **container** is the central place where you register, configure, and resolve the different services or dependencies used throughout your application.

### The `Container` class

This class instantiates the different services used by the application. The instantiation process is typically based on environment configuration or other application settings, such as database drivers.

**src/container.ts**:

```ts
import { UserService } from './services/UserService';

export class Container {
  userService: UserService;

  constructor() {
    this.userService = new UserService(/* some config */);
  }
}
```

> To further decouple logic, consider instantiating services that implement the [repository pattern](/blog/repository-pattern-with-vue-composables).

### Binding the container to our Vue app

To integrate the IoC container into a Vue app, we’ll create a [Vue plugin](https://vuejs.org/guide/reusability/plugins.html) that uses [app-level provide](https://vuejs.org/guide/components/provide-inject.html#app-level-provide). This allows us to make the container available throughout the entire application.

**src/plugins/containerPlugin.ts**:

```ts
import { App } from 'vue';
import { containerInjectionKey } from '@/constants';
import { Container } from '@/services/container';

export default {
  install(app: App) {
    const container = new Container();
    app.provide(containerInjectionKey, container);
  },
};
```

In this example, we use a `containerInjectionKey` imported from `@/constants` to ensure the provided container is fully typed. See [how to type provide/inject](https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject) for more details.

**src/types.ts**:

```ts
import type { Container } from '@/container';
import { InjectionKey } from 'vue';

export const containerInjectionKey = Symbol() as InjectionKey<Container>;
```

### Registering the Plugin

With our plugin defined, let’s register it when creating the Vue app:

**src/main.ts**:

```ts
import { createApp } from 'vue';
import containerPlugin from '@/plugins/containerPlugin';

const app = createApp({});

app.use(containerPlugin);
```

Now, the container is accessible throughout the entire application. Components and composables can leverage it without needing to know the details of how services are built or configured.

> For smaller applications, you can simplify this approach by directly binding services to the Vue app instance, making the Vue app your IoC container.

## Dependency injection in Vue composables

Dependency injection makes it easier to use services in Vue composables without needing to know how these services are instantiated or configured. This abstraction is particularly useful when working with shared logic.

### Using dependencies in a composable

Here’s how we can define a composable that uses the _UserService_ to fetch and manage user data:

**src/composables/useUsers.ts**:

```ts
import { containerInjectionKey } from "@/constants";
import { inject } from 'vue';

export function useUsers() {
  const container = inject(containerInjectionKey);

  if (!container?.userService) {
    throw new Error('No user service bound to the container');
  }

  const list = async () => {
    return container.userService.findAll();
  };

  const getById = async (id: number) => {
    return container.userService.find(id);
  };

  return {
    list,
    getById,
  };
}
```

This composable uses the injected container to access the _UserService_. It provides methods to fetch all users (`list`) and fetch a user by ID (`getById`), abstracting the implementation details of the service.

### Using the composable in a component

To illustrate how this composable is used, let’s create a UserList component that displays a list of users. This demonstrates how dependency injection simplifies accessing and managing services.

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

This component fetches the user list using the `useUsers` composable and renders it in a simple loop.

## Conclusion

We have implemented the Dependency Injection design pattern in a Vue application. This allows the decoupling of logic in three identified areas:
- Services creation — in the container
- Business logic — in the composable
- Rendering logic — in the component

This decoupled approach promotes reusability and makes testing easier, as different modules can be mocked or replaced without affecting the consuming code.
