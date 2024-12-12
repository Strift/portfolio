---
title: 'Applying a transformation to all object properties in TypeScript'
date: 2024-12-12
description: Learn how to transform object properties in TypeScript with a type-safe approach using Object.entries() and reduce().
cover: /images/articles/covers/typescript.jpg
coverAlt: The Typescript logo
lang: 'en'
tags:
  - engineering
components:
  - 'advent-2024'
---

# Applying a transformation to all object properties in TypeScript

Let’s consider the following JavaScript object:

```ts
type PreTax = Record<string, { preTaxValue: number }>;

const preTaxBill: PreTax | undefined = {
  meal: { preTaxValue: 100 },
  drink: { preTaxValue: 50 },
};
```

> The `preTaxBill` is optionally `undefined` to demonstrate how to handle such scenarios.

Our goal is to transform the object by adding a new property: the post-tax value. After the transformation, the object should conform to the following type:

```ts
type PostTax = Record<string, { preTaxValue: number; postTaxValue: number }>;
```

## Writing the transformation

Here’s how we can implement the transformation:

```ts
type PreTax = Record<string, { preTaxValue: number }>;

type PostTax = Record<string, { preTaxValue: number; postTaxValue: number }>;

const preTaxBill: PreTax | undefined = {
  meal: { preTaxValue: 100 },
  drink: { preTaxValue: 50 },
};

const postTaxBill = (
  Object.entries(preTaxBill || {}) as Array<[keyof PreTax, PreTax[keyof PreTax]]>
).reduce(
  (acc, [key, value]) => ({
    ...acc,
    [key]: {
      ...value,
      postTaxValue: value.preTaxValue * 1.2, // Example tax computation
    },
  }),
  {} as PostTax
);
```

## Algorithm explanation

Here’s a step-by-step breakdown:

**1. Extracting Key-Value pairs**:

Using `Object.entries()`, we create an array of `[key, value]` pairs from the object. For `preTaxBill`, this results in: `[['meal', { preTaxValue: 100 }], ['drink', { preTaxValue: 50 }]]`.

**2. Transforming with `reduce()`**:

We use `reduce()` to iterate over this array and build a new object. During each iteration, we:
- Copy the existing accumulator object.
- Add a new entry for the current key, including both the original properties and the computed `postTaxValue`.

## Type considerations

### Handling undefined

Since `preTaxBill` can be undefined, we provide an empty object (`{}`) as a fallback to `Object.entries()`. This avoids runtime errors and ensures the code handles empty objects gracefully.

### Ensuring type-safety

**`Object.entries()` type annotation**:

By default, `Object.entries()` returns an array of `Array<[string, any]>`. To maintain type safety, we explicitly cast it as `Array<[keyof PreTax, PreTax[keyof PreTax]]>`. This ensures type consistency, especially if the transformation logic expects specific types.

**Accumulator initialization**:

We specify that the initial accumulator object (`{}`) is of type `PostTax` to help TypeScript infer the final result's type correctly.

## Conclusion

This approach applies a transformation across all properties of the object while ensuring full type safety. By leveraging TypeScript's robust type system, we prevent runtime errors and maintain clear, predictable behavior.
