---
title: 'UX review: Netflix empty search results'
date: 2024-12-18
description: "Why Netflix does not have an empty search results page"
cover: /images/articles/covers/netflix.jpg
coverAlt: Netflix logo
lang: 'en'
tags:
  - engineering
  - user experience
components:
  - 'advent-2024'
---

# UX review: Netflix empty search results

Since I started working at [Meilisearch](https://meilisearch.com?ref=laurentcazanove.com), I became much more aware of how products implement search features in their application. Today, I want to take a look at **Netflix**.

## Empty state page

In most applications, it’s common to have a "empty state" design prepared. It is used when there is no content to show to the user, which in most SaaS usually means the user is just getting started. Products often take the opportunity to display some onboarding instructions to help the users get started.

However, sometimes the empty state page follows a user interaction, like a search. In this case, most apps simply display something like “no results found for this query” or similar. But that’s not what Netflix chooses to do.

Instead, they also took this as an opportunity to **engage users**. Let’s see how.

## Displaying recommendations

Rather than showing a “no results” page, Netflix opts to display… recommendations!

Here’s an example of how Netflix responds to a search for “Harry Potter”:

<article-image src="/images/articles/screenshot-netflix-search-harry-potter.png" alt="Screenshot of Netflix search results for the ’harry potter’ query showing many movies related to magic, but not Harry Potter" title="Netflix search results">
Searching for ”harry potter” on Netflix
</article-image>

On the top-right side of the screenshot, we can see that the user input “Harry Potter” in the search bar. However, because the movie is not available on the platform (at least in their region), none of the eight Harry Potter movies appear in the results.

Instead of displaying a “no results” page, Netflix simply suggests a bunch of recommendations related to Harry Potter. We can imagine that they are using **similarity search** because most of the movies are either related to magic or to the Harry Potter universe.

> Similarity search leverages **vector search** to find items with related characteristics, such as theme, genre, or context.

## Reviewing this UX pattern

By displaying similar movie recommendations, Netflix circumvents the fact that their catalog doesn’t include the movie the user is searching for. Instead, they’re hoping that the user will settle for a movie with a similar theme or from the same universe.

While looking for an item and being provided only with _similar_ items can be frustrating in a search experience, in the case of Netflix, users have probably gotten used to this behavior. They likely understand that this means the movie is not part of the catalog.

Moreover, Netflix being Netflix, they have likely AB-tested this and probably saw **improved conversions** in the app variants that included the feature.
