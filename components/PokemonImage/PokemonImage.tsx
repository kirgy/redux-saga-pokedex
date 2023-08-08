import { StyleSheet } from "react-native";
import { Image } from "expo-image";

type PokemonImageProps = {
  url?: string;
};

const PokemonImage = ({ url }: PokemonImageProps) => {
  return (
    <Image
      style={styles.image}
      source={url}
      contentFit="fill"
      transition={1000}
      placeholder={require("./not-found.png")}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    margin: 20,
    width: 200,
    height: undefined,
    aspectRatio: 1,
    backgroundColor: "#0553",
  },
});

export default PokemonImage;
