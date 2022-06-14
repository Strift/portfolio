---
title: "State of Vue 2022: Amsterdam recap"
date: 2022-06-14
description: Everything you need to know about Evan You's State of the Vuenion talk at Vue Amsterdam.
cover: /images/articles/covers/state-of-vue-2022-amsterdam-recap.jpg
coverAlt: Firebase functions
lang: 'en'
tags:
  - engineering
---

# State of Vue 2022: Amsterdam recap

Since v3.0 became the fault this February, Vue 3 adoption has grown steadily. NPM downloads have known a 4x increase to reach an average of 800k/week.

Since then, the Vue 3 team has been at work on fixing issues with v3 and improving the SFC playground. Meanwhile, the ecosystem is finally catching up. Let's recap what Evan You discussed during the *State of the Vuenion* talk in Amsterdam two weeks ago.

## Table of contents

- State of the ecosystem
  - [Nuxt 3](#nuxt-3)
  - [Vuetify 3](#vuetify-3)
  - [VitePress 1](#vitepress-1)
  - [Volar](#volar)
- What's coming for Vue?
  - [Back-porting features to Vue 2.7](#back-porting-features-to-vue-27)
  - [Next minor version: Vue 3.3](#next-minor-version-vue-33)
  - [A note on Vite 3](#a-note-on-vite-3)
  - [Experimental: new compilation strategies](#experimental-new-compilation-strategies)

## State of the ecosystem

### Nuxt 3

One of the most anticipated release is probably that of Nuxt 3. Currently in Release Candidate stage, the framework is nearing stability. It seems safe enough to start migrating your development environment. Since the conference, NuxtLabs released RC4—check out the [release notes](https://github.com/nuxt/framework/releases/tag/v3.0.0-rc.4).

**The Nuxt team has announced that Nuxt v3 should release this summer.**

Related: A few weeks ago, the team released [v2 of @nuxt/content](https://content.nuxtjs.org/)—it supports Nuxt 3!

### Vuetify 3

The Material Design framework is currently in beta. The third beta release has been available for a fortnight. Read the [release notes](https://github.com/vuetifyjs/vuetify/releases/tag/v3.0.0-beta.3).

### VitePress 1

The Vue team has long been dog-fooding VitePress with the new Vue.js docs. To prepare for the v1.0 release, core team member Kiaworked on a providing a higher-level API for end users. VitePress is now the recommended solution for Vue 3-powered Static Site Generation.

However, discussion remains on the name and the coexistence with VuePress. Simply put, the question is whether VitePress should replace VuePress 3 or not.

### Volar

Johnson Chu, developer of the [Volar VS Code extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar) joined the Vue.js core team. There are brighter days ahead for IDE tooling as the maintainer of the extension is now sponsored by Vue.

This is a welcome news. With the integration of TypeScript, setup syntax, compile-time macros, and Nuxt 3 auto-imports, tooling is now paramount.

## What's coming for Vue?

### Back-porting features to Vue 2.7

Vue 2.7 aims at back-porting the built-in composition API, the `<script setup>` syntax, and the improvements to TypeScript support to Vue 2.x. As of writing, the composition API has been fully ported, and the team is working on porting `<script setup>`.

Regarding the latter, the team aims at making vue/compiler-sfc adhere to the same interface as its Vue 3 counterpart. The goal is to make it compatible with `vue-loader` 16+ and `@vitejs/plugin-vue` so as to unify loaders across Vue 2 and Vue 3.

**Vue 2.7 will be the last minor release of Vue 2.x.** It will have 18 months of LTS starting from the the 2.7 stable release. Companies can notify interest for extended supported [via this link](https://link.vuejs.org/xlts).

### Next minor version: Vue 3.3

In v3.3, we should expect a stabilized API for `<Suspense>`. The Vue team is collaborating with the Nuxt team that is heavily testing the feature in Nuxt 3. Stability should also come for the [reactivity transforms API](https://vuejs.org/guide/extras/reactivity-transform.html).

Finally, the teams keeps on improving server-side rendering with lazy/conditional hydration and better warnings about SSR mismatch.

### A note on Vite 3

The next major of Vite is development. Although the updates can be considered minor, many will introduce breaking changes. Still, those will be invisible for most end users. Only tools that use Vite directly will need to update, eg. Nuxt, Vitest, etc.

The biggest internal update is [moving Vite itself to full ESM](https://github.com/vitejs/vite/pull/8178) and thus dropping support for Node.js 12. The server-side rendering build will [now default to ESM output](https://github.com/vitejs/vite/pull/8348). With these changes, Vite aims to forward the ecosystem migration to ES modules. Also, Vite will now use esbuild for both dev and prod bundling, to reduce friction when deploying.

### Experimental: new compilation strategies

**⚠️ This is experimental and may never land.**

The team has started experimenting with a new compilation strategy inspired by SolidJS. The idea is moving to a no-virtual DOM approach. This will significantly improve memory usage on top of reducing the runtime size.

Although the adoption strategies aren’t clear — *that is, if these changes ever release* — this would be a great step into transitioning Vue into a more _compiler-oriented_ framework.

A that’s a wrap!

---

Follow [@StriftCodes](https://twitter.com/StriftCodes) on Twitter for more Vue content.  You can watch the original talk [on YouTube](https://www.youtube.com/watch?v=1ntuhMzAzU8) and get the slides [here](https://docs.google.com/presentation/d/1tPaimqwJEXinPYifwUvA4gLCI6SezZsViuJvieWGAug/edit#slide=id.p).

Cheers,