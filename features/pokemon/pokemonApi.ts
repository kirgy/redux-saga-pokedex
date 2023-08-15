import axios from "axios";

/**
 * Interacts with the unoffical pokemon API:
 * https://pokeapi.co/
 */

type Pokemon = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

type GetPokemonResponse = Pokemon;

export async function getPokemon(pokedexNumber: number) {
  const { data, status } = await axios.get<GetPokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  return { pokemon: data, status };
}

export default {
  getPokemon,
};
