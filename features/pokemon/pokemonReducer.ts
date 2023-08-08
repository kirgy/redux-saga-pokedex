import { RootState } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type AppState = {
  encounter?: Pokemon;
  captured: Array<Pokemon>;
};

export type Pokemon = {
  id: number;
  name: string;
  image: string;
};

// initial state
const initialState: AppState = {
  encounter: undefined,
  captured: [],
};

// reducers
const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setPokemonEncountered: (state, { payload }: PayloadAction<Pokemon>) => {
      console.log({ payload });
      state.encounter = payload;
    },
    setPokemonCaptured: (state, { payload }: PayloadAction<Pokemon>) => {
      console.log({ payload });
      state.captured.push(payload);
      state.encounter = undefined;
    },
  },
});

export const selectEncounter = (
  rootState: RootState
): AppState["encounter"] => {
  return rootState.pokemon.encounter;
};

export const selectCaptured = (rootState: RootState): AppState["captured"] => {
  return rootState.pokemon.captured;
};

export const { setPokemonEncountered, setPokemonCaptured } = slice.actions;

export default slice.reducer;
