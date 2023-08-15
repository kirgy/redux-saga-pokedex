# Pokedex: Redux Saga example in React Native

<img src="https://github.com/kirgy/redux-saga-pokedex/blob/main/README-app-example.gif" width="200">

This repo demonstrates a basic working example of redux-sagas using a Pokedex mini-game as means to show the advantages.

In the app you'll find 3 tab views:

- an example using redux, without redux sagas
- an example using redux, with redux sagas
- a simple list of the pokemon you've caught

In the git history you'll find 4 commits:

- feat: adds working capture pokemon game using basic react
  - demonstrates a tradition redux approach to building system logic in React Native
- feat: adds redux saga for encountering & capturing pokemon
  - demonstrates how to build the exact same logic, but using redux sagas
- test: adds unit test for redux saga
  - demonstrates how we can unit test redux sagas
- doc: adds README to project

Part of the power of redux-sagas is the testability - an example unit test using the [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan) library here:

```
features/pokemon/pokemonSaga.test.ts
```

You can run tests using:

```
yarn run test
```

## Setup dev environment

Run the following, you'll need to follow the normal Expo setup instructions:

https://docs.expo.dev/get-started/installation/

Then run the following, which is typical to a normal managed Expo app;

1.  `yarn`
2.  `yarn run ios` or `yarn run android`
