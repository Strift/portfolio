---
title: 'React vs Vue: conditional styling'
date: 2024-12-16
description: Learn how to implement conditional styling using React and Vue.
cover: /images/articles/covers/vuejs-reactjs.jpg
coverAlt: Vue.js and React.js logos
lang: 'en'
tags:
  - engineering
components:
  - 'advent-2024'
---

# React vs Vue: conditional styling

I recently started learning about React again. This journey brought me to discover the `clsx` library. This allows to **conditionally applies classes**.

Let's take the example of an InvoiceStatus component. This component accepts a `status` string as prop. I want the component to apply different CSS classes based on the value of `status`. Let's see how we can build it with the two frameworks.

## With React.js

Here's how you can achieve this with React:

```jsx
import clsx from 'clsx';

export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
      { status }
    </span>
  )
}
```

## With Vue.js

Here is how you can achieve this with Vue:

```vue
<script lang="ts" setup>
defineProps<{ status: string }>()
</script>

<template>
  <span
    :class="[
      'rounded-full px-2 py-1 text-sm',
      {
        'bg-gray-100 text-gray-500': status === 'pending',
        'bg-green-500 text-white': status === 'paid',
      }
    ]"
  >
    {{ status }}
  </span>
</template>
```

---

I like that Vue.js doesn't require to use a library for this case.

Is this really the recommended approach in React, or did I over complicate it?
