---
title: 'My go-to stack to minimize side-projects costs'
description: How the JAMstack allows me to minimize monthly fees and maximize the time spent developing features.
date: 2021-03-12
cover: /images/articles/covers/my-go-to-stack-to-minimize-side-projects-costs.jpeg
coverAlt: 'A computer displaying a code editor'
highlight: true
tags:
  - engineering
---

# My go-to stack to minimize side-projects costs

My most recent side-project was a [recruitment platform](/articles/launching-a-recruitment-platform-for-classic-guilds/). As with most side-projects, it's likely that my interest will decrease over time. So I tried to envision what it'd be like to maintain it in six months. Before starting, I set myself two goals.
 
The first was **minimizing monthly fees**. The second goal was to **maximize the time spent developing features**. Luckily, I found one common solution to these two constraints: **serverless applications**.
 
The base principle for serverless is that you only pay for what you use. Great. If no one ended up using my site, it would cost me nothing. Now, freeing myself from infrastructure management would actually increase my productivity too. More time spent developing, less time running ops.
 
Okay, serverless holds great promises. But building apps this way brings new constraints too. So what should I choose to keep things easy? Because I'm most confortable using Vue as a front-end, I chose to build an all-JavaScript app. Here's the stack I chose:
- Nuxt.js to statically generate the site
- Firebase Auth for user authentication
- Firebase Functions to handle oauth
- Cloud Firestore as NoSQL real-time database
- Firebase Hosting for serving the app through CDN

The idea is simple; the website is just a front-end app. And if I ever need to extend, I will look for dedicated APIs or headless services. The best part? These services fees scale by usage too! No infrastructure overhead. Only paying for what I use.

✅ Minimizing monthly fees <br>
✅ Maximizing time spent shipping features

---

**Read more**

- [Handling schema evolution with Cloud Firestore](https://strift.medium.com/handling-schema-evolution-with-cloud-firestore-22d94fb9722f)
- [All my articles](/articles/) about code, esports, and writing
- I post my thoughts about code and other stuff [on my Twitter](https://twitter.com/lau_cazanove)