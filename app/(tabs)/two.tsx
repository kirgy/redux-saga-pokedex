import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/components/Themed";
import { useSelector } from "react-redux";
import { selectCaptured } from "@/features/pokemon/pokemonReducer";
import PokemonImage from "@/components/PokemonImage/PokemonImage";

export default function TabTwoScreen() {
  const capturedPokemon = useSelector(selectCaptured);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {capturedPokemon.map((pokemon, index) => {
        return (
          <View
            key={index}
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              borderColor: "#555",
              borderWidth: 2,
              borderRadius: 20,
            }}
          >
            <Text style={styles.title}>{`${pokemon.id}: ${pokemon.name}`}</Text>
            <PokemonImage url={pokemon.image} />
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },
  contentContainer: {
    gap: 20,
    padding: 20,
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
