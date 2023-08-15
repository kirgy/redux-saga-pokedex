import * as pokemonAPI from "./pokemonApi";
import {
  selectEncounter,
  setLoadingEncounter,
  setPokemonCaptured,
  setPokemonEncountered,
} from "./pokemonReducer";
import { promiseAlert } from "../../utils/promiseAlert";
import { randomInRange } from "../../utils/randomInRange";
import { createAction } from "@reduxjs/toolkit";
import { Alert } from "react-native";
import { SagaIterator } from "redux-saga";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

const POKEMON_ACTIONS = {
  encounter: "pokemon/ENCOUNTER",
  capture: "pokemon/CAPTURE",
};

export function* encounterPokemon(): SagaIterator {
  console.log("# encounterPokemon");

  /**
   * 1. Get random number between 1-151 (the only true pokemon...)
   * 2. Set loading state = true
   * 3. make API request
   * 4. set resulting pokemon
   * 5. set loading state = false
   * 6. handle error
   * 7. ask user to catch
   *  - if yes, catch
   *  - if no, go back
   */

  let getPokemonResult:
    | Awaited<ReturnType<typeof pokemonAPI.getPokemon>>
    | undefined = undefined;

  const randomPokemonNumber = yield call(randomInRange, 1, 151);
  console.log({ randomPokemonNumber });
  yield put(setLoadingEncounter(true));

  try {
    console.log("Calling pokemonAPI.getPokemon", randomPokemonNumber);
    getPokemonResult = yield call(pokemonAPI.getPokemon, randomPokemonNumber);
  } catch (error) {
    // throw erroror
    console.log("oh no!", error);
    Alert.alert("Oh no! An unexpected error occured");
  }
  console.log("Called pokemonAPI.getPokemon");

  yield put(setLoadingEncounter(false));

  if (getPokemonResult == undefined) {
    return;
  }

  console.log(
    `Setting encountered pokemon to ${getPokemonResult.pokemon.name}`
  );

  yield put(
    setPokemonEncountered({
      id: getPokemonResult.pokemon.id,
      name: getPokemonResult.pokemon.name,
      image: getPokemonResult.pokemon.sprites.front_default,
    })
  );
}

export function* capturePokemon(): SagaIterator {
  console.log("# capturePokemon");

  const encounterPokemon: ReturnType<typeof selectEncounter> = yield select(
    selectEncounter
  );

  console.log({ encounterPokemon: encounterPokemon?.name });

  if (encounterPokemon === undefined) {
    return;
  }

  console.log("Calling promiseAlert");

  const confirmed = yield call(promiseAlert, {
    title: "Capture!",
    message: `Throw Master Ball at ${encounterPokemon.name}?`,
    buttonConfirmTitle: "Throw",
    buttonRejectTitle: "Cancel",
  });

  console.log("Promise alert fulfilled");

  if (confirmed) {
    console.log("User confirmed throw");

    yield put(setPokemonCaptured(encounterPokemon));
    Alert.alert(`You caught ${encounterPokemon.name}!`);
  } else {
    console.log("User canceled throw");
  }
}

function* pokemonSaga() {
  yield takeEvery(POKEMON_ACTIONS.encounter, encounterPokemon);
  yield takeLatest(POKEMON_ACTIONS.capture, capturePokemon);
}

export const pokemonEncounterAction = createAction(POKEMON_ACTIONS.encounter);
export const pokemonCaptureAction = createAction(POKEMON_ACTIONS.capture);

export default pokemonSaga;
