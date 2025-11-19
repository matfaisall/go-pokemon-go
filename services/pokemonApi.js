import axiosInstance from "@/lib/axios";

export const pokemonApi = {
  getPokemonList: async (limit, offset) => {
    const response = await axiosInstance.get(
      `/pokemon?limit=${limit}&offset=${offset}`
    );

    return response.data;
  },

  getPokemonById: async (idOrName) => {
    const response = await axiosInstance.get(`/pokemon/${idOrName}`);
    return response.data;
  },

  // get pokemon species by id
  getPokemonSpecies: async (idOrName) => {
    const response = await axiosInstance.get(`/pokemon-species/${idOrName}`);
    return response.data;
  },
};
