---
title: How To Display TwicPics Images When Working Offline With Nuxt.js
date: 2022-06-02
description: A guide detailing the usage of a wrapper component to default to local images when working offline.
cover: /images/articles/covers/how-to-display-twicpics-images-when-working-offline-with-nuxt.jpg
coverAlt: A computer with a black screen
lang: 'en'
tags:
  - engineering
---

# How To Display TwicPics Images When Working Offline With Nuxt.js

TwicPics is an image transformation and optimization SaaS. It works in the cloud, and front-end developers interact with the API via the JavaScript library. But when working in local, you might not want (or be able) to connect to the Internet.

This happened to me, so I wrote a wrapper component around TwicPics that allows me to fallback to local images when necessary. Obviously, this means skipping any image optimization or  transformation. But it provides a quick toggle for switching it off and on, which can be useful when working locally.

## Adding a on/off switch for local images

First, we’ll add a configuration entry to our Nuxt configuration to be able to easily toggle TwicPics.

```js
// nuxt.config.js

export default {
	publicRuntimeConfig: {
		enableOptimization: process.env.NODE_ENV !== 'development'
	}
}
```

In this example, we configure the app to default to local images when we’re in development mode. But we could choose any conditions we like or use a specific environment variable.

## Wrapping our image in a component

Now that we have a configuration toggle, let’s create an component that makes use of it. We’ll go with the straightforward approach: when `enableOptimization` is `false`, we’ll simply display the image; otherwise, we’ll process it with TwicPics.

```html
<!-- components/BaseImage.vue -->
<template>
	<img
		v-if="$config.enableOptimization"
		:src="src"
	/>
	<img
		v-else
		:data-twic-src="`image:${src}`"
	/>
</template>

<script>
export default {
	props: {
		src: { type: String, required: true }
		// In reality, you'd probably have more props to handle transformations, etc.
	}
}
</script>
```

And that’s it!

Your `BaseImage` component will load your local image whenever  `enableOptimization` is false. You don’t have to change your code to keep using TwicPics in production.

Obviously, that's a simplified example. In reality, you'd probably be wrapping a `<TwicImage/>` component instead of base `<img>`. But the overall logic is the same. Read more about `@twicpics/components` in [the documentation](https://www.twicpics.com/docs/components/overview).

---

To go further:
- [Nuxt.js docs](https://nuxtjs.org/)
- [TwicPics docs](https://www.twicpics.com/docs/getting-started/overview)
- Ask me a question [on Twitter](https://twitter.com/StriftCodes)

I’m a web developer working with Nuxt.js & serverless. I’m writing about the stuff I learn. Follow [@StriftCodes](https://twitter.com/StriftCodes) on Twitter for more!

Cheers,

