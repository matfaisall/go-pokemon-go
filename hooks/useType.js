import { pokemonApi } from "@/services/pokemonApi";
import { useQuery } from "@tanstack/react-query";
import { typeApi } from "@/services/typeApi";

export const useType = (selectedType, enabled) => {
  return useQuery({
    queryKey: ["pokemon", "type", selectedType],
    queryFn: async () => typeApi.getTypeById(selectedType),
    enabled: enabled && !!selectedType,
    staleTime: 1000 * 60 * 5, // 5 menit
  });
};
