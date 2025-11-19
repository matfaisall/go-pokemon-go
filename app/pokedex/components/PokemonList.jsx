"use client";

import React, { useEffect, useRef } from "react";
import { usePokemonInfinite, usePokemon } from "@/hooks/usePokemon";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import PokemonCard from "./PokemonCard";

export const PokemonList = () => {
  const observerTarget = useRef(null);
  const router = useRouter();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = usePokemonInfinite(20);

  // console.log("ini data", data);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton key={index} className="h-96 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">
          Error loading Pokemon. Please try again.
        </p>
      </div>
    );
  }

  const allPokemon = data?.pages.flatMap((page) => page.results) || [];
  // console.log("allPokemon", allPokemon);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allPokemon.map((pokemon) => {
          return (
            <PokemonCardWrapper
              key={pokemon?.name}
              pokemonUrl={pokemon?.url}
              // isFavorite={}
              onNavigate={() => router.push(`/pokemon/${pokemon?.name}`)}
            />
          );
        })}
      </div>

      {/* infinite scroll trigger */}
      <div
        ref={observerTarget}
        className="h-20 flex items-center justify-center"
      >
        {isFetchingNextPage && (
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-72" />
            ))}
          </div>
        )}
      </div>

      {!hasNextPage && (
        <div className="text-center py-8 text-muted-foreground">
          <p>You`ve reached the end!</p>
        </div>
      )}
    </>
  );
};

export const PokemonCardWrapper = ({
  pokemonUrl,
  // isFavorite,
  onNavigate,
}) => {
  const pokemonId = pokemonUrl.split("/").slice(-2, -1)[0];
  // console.log("pokemonId", pokemonId);

  const { data: pokemon, isLoading } = usePokemon(pokemonId, true);

  if (isLoading || !pokemon) return <Skeleton className="h-96 w-full" />;

  return <PokemonCard pokemon={pokemon} onClick={onNavigate} />;
};
