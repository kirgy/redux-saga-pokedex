import pokemonReducer from "@/features/pokemon/pokemonReducer";
import pokemonSaga from "@/features/pokemon/pokemonSaga";
import rootSaga from "@/redux/rootSaga";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

// create the saga middleware
// const sagaMiddleware = createSagaMiddleware();
// // mount it on the Store
// const store = configureStore({
//   reducer: {
//     pokemon: pokemonReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(sagaMiddleware),
// });

// // then run the saga
// sagaMiddleware.run(pokemonSaga);

const rootReducers = {
  pokemon: pokemonReducer,
};

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(sagaMiddleware);
  },
});

// middleware: getDefaultMiddleware => {
//   return getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: persistStoreSerializableActions,
//     },
//   }).prepend(sagaMiddleware);
// },

sagaMiddleware.run(rootSaga);

// export type RootState = Record<
//   keyof typeof rootReducers,
//   ReturnType<typeof pokemonReducer>
// >;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
