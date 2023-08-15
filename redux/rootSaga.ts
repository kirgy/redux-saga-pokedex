import pokemonSaga from "@/features/pokemon/pokemonSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([pokemonSaga()]);
}
