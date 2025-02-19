---
title: Testing Firebase Functions with the emulators suite
date: 2021-07-05
description: Learn to test Firebase functions with Firebase emulators suite. Our guide details setting up Jest and emulating Firebase Auth for robust local integration tests.
cover: /images/articles/covers/firebase-functions.png
coverAlt: Firebase functions
lang: 'en'
tags:
  - engineering
---

# Testing Firebase Functions with the emulators suite

<span class="article-date">July 5th, 2021</span>

Integration tests can be hard to write, especially when using external services. We’ve all heard the “don’t test what you don’t own”. When running serverless, you pretty much own nothing. So how can you test your Firebase functions? Enters the Firebase emulators suite.

## The use case: a function that lists users

Let’s take the example of a simple function. This one is a simple function that returns a list of users' UIDs. Internally, the function uses Firebase Auth to list the users.

```js
// api/listUsers.js

const firebase = require('../services/firebase')

const PAGE_SIZE = 1000

module.exports = async function (data, context) {
 let allUsers = []

 let { users, pageToken } = await firebase.auth().listUsers(PAGE_SIZE)
 do {
   allUsers = allUsers.concat(users.map(user => user.uid))
   if (pageToken) {
     ({ users, pageToken } = await firebase.auth().listUsers(PAGE_SIZE, pageToken))
   }
 } while (pageToken)

 return { users: allUsers }
}
```

Firebase Auth module’s own listUsers function returns a paginated response. So we use the `pageToken` to check if there are more pages and concatenate that in one single response.

## Setting up tests with Jest

We’ve got our function, now let’s set up our testing tools. For this example, I will use Jest.

```sh
yarn add --dev jest # Or `npm install --save-dev jest`
```

If you’re running on VS Code, you will want Intellisense to pick-up Jest global imports. Including Jest types as a development dependency will do the trick.

```sh
yarn add --dev @types/jest # or `npm install --save-dev @types/jest`
```

## Writing the tests

Now that we’re all set, let’s actually write tests, shall we? First, let’s scaffold our test file.

```js
// test/api/listUsers.test.js

const admin = require('firebase-admin')

process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'

const test = require('firebase-functions-test')()

// Mock config values here

const functions = require('../../index.js') // import functions *after* initializing Firebase

describe('listUsers', () => {
 let wrapped

 beforeAll(() => {
   wrapped = test.wrap(functions.listUsers)
 })

 afterAll(() => {
   test.cleanup()
 })

 // tests will go here

})
```

At line 3, we initialize `firebase-functions-test` without parameters. Because of this, all calls to Firebase will be using the project default’s — most likely your production. We obviously don’t want this. That’s why we initialized it after the following line.

```js
process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099'
```

When initialized, Firebase will recognize the environment variable and use the emulator for Auth instead of the production service. We can now safely write our test.

```js
it('returns an empty array when there are no users', async () => {
   const { users } = await wrapped()
   expect(users).toEqual([])
 })
```

At this point, running the tests should fail because Firebase cannot connect to it’s Auth service. You should get an error like the following.

```
Error while making request: connect ECONNREFUSED 127.0.0.1:9099. Error code: ECONNREFUSED```
```

> If you don’t get this error, make sure you’ve updated the environment variable and initialized `firebase-functions-test` without configuration. Your app might be trying to connect to production.

So, how do we get this working? Well, we use the Firebase emulators suite. Like the name suggests, it allows you to emulate Firebase services locally. It’s perfect for local development, but also for testing. Install it by running the following command.

```sh
yarn add --dev firebase-tools # or `npm install -save-dev firebase-tools`
```

We will use the emulator `emulators:exec` command to launch the Auth service emulator and run our tests. For convenience, I included it in my `package.json`.

```json
// package.json

"scripts": {
   "test:run": "jest ./test/",
   // If you're using Yarn
   "test": "firebase emulators:exec --only auth 'yarn test:run'",
   // If you're using NPM
   "test": "firebase emulators:exec --only auth 'npm run test:run'"
}
```

Ta-da! Your tests should now run without any connection issues. This example only uses the Auth service. You can use the same technique to emulate other Firebase services. Just update the `--only` parameter to include the other services you need.

Until next time,
