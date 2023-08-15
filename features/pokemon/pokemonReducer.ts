import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type PokemonState = {
  encounter?: Pokemon;
  captured: Array<Pokemon>;
  loadingEncounter: boolean;
};

export type Pokemon = {
  id: number;
  name: string;
  image: string;
};

// initial state
export const initialState: PokemonState = {
  encounter: undefined,
  captured: [],
  loadingEncounter: false,
};

// reducers
const slice = createSlice({
  name: "pokemon",
  initialState: initialState,
  reducers: {
    setPokemonEncountered: (state, { payload }: PayloadAction<Pokemon>) => {
      state.encounter = payload;
    },
    setPokemonCaptured: (state, { payload }: PayloadAction<Pokemon>) => {
      state.captured.push(payload);
      state.encounter = undefined;
    },
    setLoadingEncounter: (state, { payload }: PayloadAction<boolean>) => {
      state.loadingEncounter = payload;
    },
  },
});

export const selectEncounter = (
  rootState: RootState
): PokemonState["encounter"] => {
  return rootState.pokemon.encounter;
};

export const selectCaptured = (
  rootState: RootState
): PokemonState["captured"] => {
  return rootState.pokemon.captured;
};

export const {
  setPokemonEncountered,
  setPokemonCaptured,
  setLoadingEncounter,
} = slice.actions;

export default slice.reducer;
