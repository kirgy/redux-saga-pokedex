import { Alert, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Button, Text, View } from "@/components/Themed";
import { useCallback } from "react";
import pokemonAPI from "@/features/pokemon/pokemonApi";
import { randomInRange } from "@/utils/randomInRange";
import { useDispatch, useSelector } from "react-redux";
import {
  Pokemon,
  selectEncounter,
  setPokemonCaptured,
  setPokemonEncountered,
} from "@/features/pokemon/pokemonReducer";
import PokemonImage from "@/components/PokemonImage/PokemonImage";
import {
  pokemonCaptureAction,
  pokemonEncounterAction,
} from "@/features/pokemon/pokemonSaga";

export default function TabOneScreen() {
  const dispatch = useDispatch();
  const encounteredPokemon = useSelector(selectEncounter);

  const requestEncounter = useCallback(() => {
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
    console.log(pokemonEncounterAction());
    dispatch(pokemonEncounterAction());
  }, [dispatch]);

  const requestCapture = useCallback(() => {
    dispatch(pokemonCaptureAction());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Button onPress={requestEncounter}>Walk in grass</Button>
        <Button onPress={requestCapture} disabled={!encounteredPokemon}>
          Capture!
        </Button>
      </View>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Text>
        {encounteredPokemon
          ? `A wild ${encounteredPokemon.name} appeared!`
          : ""}
      </Text>
      <PokemonImage url={encounteredPokemon?.image ?? undefined} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
