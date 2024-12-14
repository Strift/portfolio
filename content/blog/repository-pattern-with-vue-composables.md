---
title: 'Implementing repository pattern with Vue composables'
date: 2024-12-13
description: Learn how to implement the repository pattern in Nuxt 3 using Vue composables.
cover: /images/articles/covers/vuejs.jpg
coverAlt: Vue.js logo
lang: 'en'
tags:
  - engineering
components:
  - 'advent-2024'
---

# Implementing repository pattern with Vue composables

In this guide, I'll explain how to implement the repository pattern with Vue composables in a Nuxt 3 application.

Maintaining a clean and flexible data access layer is crucial for scalable applications. The repository pattern provides an abstraction between the data access logic and the rest of the application, making it easier to manage and switch between different data sources.

## Setting up the repository configuration

In the `App.vue`, we set up the repository configuration by providing a centralized repository implementation:

```vue
<script lang="ts" setup>
const config = useRuntimeConfig()
const userRepository = {
  list: () => {
    // some implementation based on database driver
  }
}

provide('user-repository', userRepository)
</script>

<template>
  <div>
    <h1>Users</h1>
    <UserList />
  </div>
</template>
```

> In practice, you might want to create a component dedicated to providing these injections, e.g. `ConfigurationProvider.vue`.
> TypeScript users will also prefer to [add types to provide/inject](https://vuejs.org/guide/typescript/composition-api.html#typing-provide-inject).

This approach allows for flexible dependency injection, enabling easy swapping of data sources based on the runtime configuration, as well as easy swapping for testing.

## Creating a reusable composable

The `useUsers` composable encapsulates the repository logic, providing a clean interface for data retrieval:

```ts
export function useUsers() {
  const userRepository = inject('user-repository')

  if (!userRepository) {
    throw new Error('No user repository provided')
  }

  const list = () => {
    return userRepository.findAll()
  }

  return {
    list
  }
}
```

By using dependency injection, we decouple the data fetching logic from the specific implementation, making the code more modular and testable.

## Consuming the composable in components

In the `UserList.vue`, we demonstrate how easily the composable can be used to fetch and display data:

```vue
<script lang="ts" setup>
const { list } = useUsers()
const { data: users } = await useAsyncData('users', list)
</script>

<template>
  <div v-for="user in users" :key="user.id">
    {{ user.name }}
  </div>
</template>
```

## Conclusion

The repository pattern with Vue composables offers a powerful approach to managing data access in Nuxt 3 applications. By abstracting the data retrieval logic and using dependency injection, we create more maintainable and flexible code that can easily adapt to changing requirements or data sources.
