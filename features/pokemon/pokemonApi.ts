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
  // try {
  // 👇️ const data: GetUsersResponse
  const { data, status } = await axios.get<GetPokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  // console.log(JSON.stringify(data, null, 4));
  return { pokemon: data, status };
  // } catch (error) {
  //   if (axios.isAxiosError(error)) {
  //     console.log('error message: ', error.message);
  //     return error.message;
  //   } else {
  //     console.log('unexpected error: ', error);
  //     return 'An unexpected error occurred';
  //   }
  // }
}

export default {
  getPokemon,
};
