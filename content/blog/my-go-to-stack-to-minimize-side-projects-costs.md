---
title: Optimizing Side-Projects Costs With Serverless and the Jamstack
description: How I'm using the Jamstack to minimize monthly fees and optimize for time spent shipping features.
date: 2022-05-10
cover: /images/articles/covers/my-go-to-stack-to-minimize-side-projects-costs.jpeg
coverAlt: 'A computer displaying a code editor'
highlight: true
tags:
  - engineering
---

# Optimizing Side-Projects Costs With Serverless & Jamstack

I'm running a [recruitment platform](/articles/launching-a-recruitment-platform-for-classic-guilds/) for WoW guilds that has been online for more than a year. As with most side-projects, I knew my investment could change over time. So before starting, I tried envisioning what it would be like to maintain it six months later. 

I realized that to make the project viable in the middle term, I needed to **optimize money & time costs**.

So the first goal was **minimizing monthly fees**, so that the project could live without any financial need for ‘success’. The second goal was to **spend the most time shipping features**—shorten the time from idea to production.

## The Case for Serverless Applications

Luckily, I found one common solution to these two constraints, **serverless applications**.

The pricing formula for serverless is simple: you only pay for what you use. That's great, because if no uses your site, it costs you nothing. Plus, by freeing yourself from infrastructure management tasks, you also gain time to spend on things that matter. 

Basically, **less time worrying about infrastructure** and **more time developing features**. :)

## Where JAMstack Meets Serverless

Serverless holds great promises. But building apps this way brings new constraints too. The back-end is now _as a service_ and [development requires a slight paradigm shift](https://strift.medium.com/handling-schema-evolution-with-cloud-firestore-22d94fb9722f). Serverless architecture is most **well complemented by the JAMstack**.

> JAMstack stands for JavaScript, APIs, and Markup.

I chose what I was most comfortable with at the time, [Nuxt](https://nuxtjs.org/) and [Firebase](https://firebase.google.com/) for the back-end. The final project stack was:
- Nuxt.js to statically generate the site
- Firebase Auth for user authentication
- Firebase Functions to handle oauth
- Cloud Firestore as NoSQL real-time database
- Firebase Hosting for serving the app through CDN

With JAMstack, the website is just a front-end app. The backend is fully managed and available on-demand. To allow new features, we can **plug in dedicated APIs**. Adding unforeseen features will not require infrastructure changes. 

The best part? These third-party services fees often scale by usage too! So we've got no infrastructure overhead and we're only paying for what we're using.

✅ Minimizing monthly fees <br>
✅ Maximizing time spent shipping features

---

**Read more**

- [Testing Firebase Functions with the emulators suite](/articles/testing-firebase-functions-with-emulators-suite/)
- [Handling schema evolution with Cloud Firestore](https://strift.medium.com/handling-schema-evolution-with-cloud-firestore-22d94fb9722f)

You can also [read all articles](/articles/), follow me [on Twitter](https://twitter.com/StriftCodes), or subscribe 💌 to the newsletter below for more.