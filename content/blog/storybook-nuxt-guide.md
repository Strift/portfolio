---
title: How to setup Storybook for Nuxt 3 and Vite
date: 2023-02-10
description: Learn to configure Storybook 7 to work with Nuxt 3, Vite, and TypeScript.
cover: /images/articles/covers/storybook-nuxt-guide.jpg
coverAlt: Storybook + Nuxt
lang: 'en'
tags:
  - engineering
---

# How to setup Storybook for Nuxt 3, Vite, and TypeScript

Last week, I spent a lot of time configuring Storybook to work with Nuxt 3 and Vite. So I wrote a little guide so you don’t have to go digging through Github issues to find the answers.

## Project setup

First, let’s setup your Vue project:

```bash
npx nuxi init nuxt3-storybook-guide

cd nuxt3-storybook-guide

yarn install
```

As storybook does not support Nuxt 3 for now, you need to specify the configuration.

Install Storybook for Vue 3 & Vite:

```sh
npx storybook@next init --type vue3 --builder vite
```

That's all for the initial installation . Your Storybook should be working—at least with the example components.

Let's get into the Nuxt 3 configuration!

## Handling auto-imports

Nuxt 3 makes a heavy use of auto imports for both components and composables. By default, Storybook will not be able to perform the same magic. Writing stories for components that use auto-imports will trigger runtime errors.

To work around, we'll make sure the Storybook builder has the same configuration as our Nuxt app.

To test our configuration, let's create a example component:

```html
<!-- components/MyComponent.vue -->

<template>
  <div>This is an auto-imported component!</div>
</template>

```

And update our `app.vue` to use it:

```html
<!-- app.vue -->

<template>
  <div>
    <MyComponent/>
  </div>
</template>
```

Now that we have the example, let's write a story for our App.

```ts
// stories/app.stories.ts

import { Meta, StoryObj } from '@storybook/vue3'
import App from '~/App.vue' // Imported with '~' shorthand syntax

const meta: Meta<typeof App> = {
 component: App,
 render: args => ({
   components: { App }, // Notice that `MyComponent` is not imported here
   setup: () => ({ args }),
   template: `
	 <App/>
   `
 })
}

export default meta

type Story = StoryObj<typeof App>

export const Default: Story = {
}

```

If we opened the Storybook now, we would see that the auto-imported code is not loaded. We will update our Storybook configuration to handle this.

First, install the packages we need to handle auto-importing:

```sh
yarn add --dev unplugin-auto-import unplugin-vue-components
```

Now, we'll create a Vite configuration file for Storybook to use:

```ts
// vite.config.ts

import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: ['./composables'],
      vueTemplate: true
    }),
    Components({
      dirs: [
        './components/'
        // Component folders that should be auto-imported
      ],
      dts: true,
      directoryAsNamespace: true
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url))
      // Add any other aliases you use in your code base
      // https://nuxt.com/docs/api/configuration/nuxt-config/#alias
    }
  }
})

```

Finally, we can update your Storybook config to use our new Vite config:

```js
// .storybook/main.js

import path from 'path'
import { loadConfigFromFile, mergeConfig } from 'vite'

/** @type { import('@storybook/vue3-vite').StorybookConfig } */
export default {
  // Other configuration options

  async viteFinal(baseConfig) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts")
    )

    return mergeConfig(baseConfig, userConfig)
  }
}

```

_Et voilà!_ Storybook should now be able to load your story. Open your Storybook by running:

```sh
yarn storybook
```

## Installing Vue plugins

Another source of code that Storybook couldn't load are Vue plugins. Nuxt modules often install Vue plugins under the hood, so it's likely that you'll have to handle this.

Fortunately, adding plugins to the Vue instance created by Storybook is straightforward. You only need to... well, install those plugins.

Here's an example:

```js
// .storybook/preview.js

import { setup } from '@storybook/vue3'

import MyPlugin from 'example-vue-plugin'

setup(app => {
  app.use(MyPlugin, {
    secret: import.meta.env.STORYBOOK_PLUGIN_SECRET
  })
})
```

You'll notice that this code sample use an environment variable. Plugin often require settings that can vary from one environment to another, e.g. domain URLs. You can make environment variables accessible to Storybook by prefixing them with `STORYBOOK_`.

## Going further

This solution currently has an annoying limitation.  You will need to maintain a Vite config that replicates the configuration used by Nuxt. Ideally, you’d want that to be handled automatically.

From my understanding, this should be possible by building a Nuxt module. Using the [@nuxt/kit utilities](https://nuxt.com/docs/guide/going-further/kit), you could theoritically pull the underlying Vite configuration and use that to generate your Storybook config.

If you have a working solution to this or a proof of concept, I’d love to hear from you. Also, feel free to report any issues or comments with this guide.

The easiest way to reach me is via Twitter: [@StriftCodes](https://twitter.com/StriftCodes).

I'll see you there,

---

PS. Thanks to Github user @lautr for their [Nuxt, Tailwind & Storybook starter](https://github.com/lautr/initium-nuxt)!

Read more:
- [Testing Firebase Functions with the emulators suite](/blog/testing-firebase-functions-with-emulators-suite)
- [Why League of Legends needs to step up its data game](/blog/why-league-of-legends-needs-to-step-up-its-data-game)
- [State of Vue 2022: Amsterdam recap](/blog/state-of-vue-2022-amsterdam-recap)
