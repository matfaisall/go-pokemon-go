import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { pokemonApi } from "@/services/pokemonApi";

// infinite scroll pokemon list
export const usePokemonInfinite = (limit) => {
  return useInfiniteQuery({
    queryKey: ["pokemon", "infinite", limit],
    queryFn: async ({ pageParam }) =>
      pokemonApi.getPokemonList(limit, pageParam),
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined;
      const url = new URL(lastPage.next);
      return Number(url.searchParams.get("offset"));
    },
    initialPageParam: 0,
  });
};

// get single pokemon by id or name
export const usePokemon = (idOrName, enabled) => {
  return useQuery({
    queryKey: ["pokemon", idOrName],
    queryFn: async () => pokemonApi.getPokemonById(idOrName),
    enabled: enabled && !!idOrName,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
};
