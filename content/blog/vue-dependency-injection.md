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

<article-image src="/images/articles/dependency-injection/diagram-dark.svg" title="The dependency injection pattern" class="hidden dark:block" alt="Example of dependency injection with a UserRepository and UserService">
</article-image>

<article-image src="/images/articles/dependency-injection/diagram-light.svg" title="The dependency injection pattern" class="dark:hidden" alt="Example of dependency injection with a UserRepository and UserService">
</article-image>

In the diagram above, *UserService* is a dependency of *UserRepository*. The latter needs the former to work. Thanks to dependency injection, *UserRepository* can **use the dependency without knowing how it’s instantiated or configured**.

In this guide, we will see how to implement this pattern with **Vue 3**. We will explain how this helps decouple logic to improve code maintainability and testability.

## The IoC container

In the context of **Dependency Injection**, IoC stands for **Inversion of Control**. The IoC container is thus named because it centralizes the responsibility of creating dependencies. The converse is the modules instantiating their own dependencies as needed.

```ts
// This function creates its dependency
const getUserById(id: number) => {
	const db = new Database(/* config */)
	return db.getUserById(id)
}

// This function's dependency is injected
const getUserById(database: Database, id: number) => {
	return db.getUserById(id)
}
```

The **container** is the central place where you register, configure, and resolve the different services or dependencies used throughout your application. Having a central place for creating dependencies makes it easier to perform migrations or swap them during tests.

### The `Container` class

It is common for application implementing dependency injection to centralize dependencies in a `Container` class, representing the IoC container. Let’s see how we can build this in TypeScript.

The *Container* class instantiates the different services used by the application. This process is typically based on environment configuration or other application settings.

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

To integrate the IoC container into a Vue app, we’ll create a [Vue plugin](https://vuejs.org/guide/reusability/plugins.html) that uses [app-level provide](https://vuejs.org/guide/components/provide-inject.html#app-level-provide). This allows us to make the *Container* instance available throughout the entire application.

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

> For smaller applications, you can simplify this approach by directly binding services to the Vue app instance, effectively **using the Vue app as an IoC container**.

## Dependency injection in Vue composables

Dependency injection makes it easier to use services in Vue composables without needing to know how these services are instantiated or configured. This abstraction is particularly useful when working with shared logic.

### Using dependencies (in a composable)

Now let's use our injected dependency (the user service) in one of our composable. Here’s how we can define a composable that uses the _UserService_ to fetch and manage user data:

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

> For brevity, we directly pulled the container from the Nuxt app. For better type safety and consistent error handling, I recommend [wrapping dependencies in a composable](/blog/dependency-helper-composable).

NB: You *could* use the dependency directly in the component, but in this I want to separate the rendering logic from the state.

### Using the composable in a component

To illustrate how this composable is used, let’s create a UserList component that displays a list of users. This demonstrates how dependency injection simplifies accessing and managing services.

**src/App.vue**:

```vue
<script lang="ts" setup>
import { useUsers } from '@/composables/useUsers';
const { list } = useUsers();

const	users = await list();
</script>

<template>
  <div>
    <UserList :users="users" />
  </div>
</template>
```

This component fetches the list of users with the `useUsers` composable and renders it with the *UserList* component.

## Conclusion

We have implemented the Dependency Injection design pattern in a Vue application. This allows the decoupling of logic in three identified areas:
- Services creation — in the `Container` class
- Business logic — in the `useUsers` composable
- Rendering logic — in the `UserList` component

This decoupled approach promotes reusability and makes testing easier, as different modules can be mocked or replaced without affecting the consuming code.
