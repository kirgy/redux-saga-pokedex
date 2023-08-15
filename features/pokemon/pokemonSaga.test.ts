import _ from "lodash";
import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import {
  initialState as initialPokemonState,
  setLoadingEncounter,
  setPokemonEncountered,
} from "./pokemonReducer";
import pokemonSaga, { encounterPokemon } from "./pokemonSaga";
import * as pokemonAPI from "./pokemonApi";
import { randomInRange } from "./../../utils/randomInRange";
import { call } from "redux-saga/effects";

const storeState = {
  pokemon: initialPokemonState,
};

const mockedGetPokemonResponse = {
  pokemon: {
    id: 123,
    name: "some pokemon",
    sprites: {
      front_default: "http://example.com/some-pokemon",
    },
  },
  status: 200,
};

describe("pokemonSaga", () => {
  it("encountering a pokemon sets the state with the pokemon returned by the API", () => {
    const mockedStore = _.cloneDeep(storeState);
    const mockedRandonPokemonId = 123;

    return expectSaga(encounterPokemon)
      .withState(mockedStore)
      .provide([
        [matchers.call.fn(randomInRange), mockedRandonPokemonId],
        [matchers.call.fn(pokemonAPI.getPokemon), mockedGetPokemonResponse],
      ])
      .call(randomInRange, 1, 151)
      .call(pokemonAPI.getPokemon, mockedRandonPokemonId)
      .put(setLoadingEncounter(true))
      .put(
        setPokemonEncountered({
          id: mockedGetPokemonResponse.pokemon.id,
          name: mockedGetPokemonResponse.pokemon.name,
          image: mockedGetPokemonResponse.pokemon.sprites.front_default,
        })
      )
      .put(setLoadingEncounter(false))
      .run();
  });
});
