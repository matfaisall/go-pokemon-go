"use client";

import React, { use, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePokemon, usePokemonSpecies } from "@/hooks/usePokemon";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TYPE_COLORS } from "@/lib/constants/colors";
import PokemonState from "./components/PokemonState";

const PokemonDetailPage = ({ params }) => {
  const { name } = use(params);
  const router = useRouter();
  const [showShiny, setShowShiny] = useState(false);

  const { data: pokemon, isLoading, isError } = usePokemon(name || "");
  const { data: species } = usePokemonSpecies(name || "", !!pokemon);

  // console.log(name);

  // console.log("species", species);
  // console.log("pokemon", !!pokemon);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-96" />
          <Skeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (isError || !pokemon) {
    return (
      <div className="text-center py-12">
        <h1 className="text-lg text-red-500 mb-4">Pokemon not found</h1>
        <Button onClick={() => router.push("/pokedex")}>Back to Pokedex</Button>
      </div>
    );
  }

  const imageUrl = showShiny
    ? pokemon.sprites.other?.["official-artwork"]?.front_shiny ||
      pokemon.sprites.front_shiny
    : pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default;

  const flavorText = species?.flavor_text_entries
    .find((entry) => entry.language.name === "en")
    ?.flavor_text.replace(/\f/g, " ");

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push("/pokedex")}>
          <ArrowLeft className="mr-2 size-4" />
          Back to pokedex
        </Button>

        <div className="flex gap-2">
          <Button
            variant={showShiny ? "default" : "outline"}
            size="sm"
            onClick={() => setShowShiny(!showShiny)}
          >
            <Sparkles className="mr-2 size=4" />
            {showShiny ? "Shainy" : "Normal"}
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="size-4" />
          </Button>
        </div>
      </div>

      {/* main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <Image
                  src={imageUrl || "/pokemon-placeholder.png"}
                  alt={pokemon.name}
                  width={300}
                  height={300}
                  className="w-full h-96 object-contain drop-shadow-2xl"
                />
              </motion.div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-3xl capitalize">
                  {pokemon.name}
                </CardTitle>
                <span className="text-2xl font-mono text-muted-foreground">
                  #{String(pokemon.id).padStart(3, "0")}
                </span>
              </div>
              <div className="flex gap-2 pt-2">
                {pokemon.types.map((type) => (
                  <Badge
                    key={type.type.name}
                    style={{
                      backgroundColor: TYPE_COLORS[type.type.name] || "#68A090",
                      color: "white",
                    }}
                    className="text-sm font-medium px-4 py-1"
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {flavorText && (
                <p className="text-muted-foreground italic">{flavorText}</p>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Height</div>
                  <div className="text-lg font-medium">
                    {(pokemon.height / 10).toFixed(1)} m
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="text-lg font-medium">
                    {(pokemon.weight / 10).toFixed(1)} kg
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Base Experience
                  </div>
                  <div className="text-lg font-medium">
                    {pokemon.base_experience}
                  </div>
                </div>
                {species && (
                  <div>
                    <div className="text-sm text-muted-foreground">
                      Capture Rate
                    </div>
                    <div className="text-lg font-medium">
                      {species.capture_rate}
                    </div>
                  </div>
                )}
              </div>

              {/* abilities */}
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Abilities
                </div>
                <div className="flex flex-wrap gap-2">
                  {pokemon.abilities.map((ability) => (
                    <Badge
                      key={ability.ability.name}
                      variant={ability.is_hidden ? "secondary" : "outline"}
                    >
                      {ability.ability.name.replace("-", " ")}
                      {ability.is_hidden && " (Hidden)"}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/*  */}
        <div>
          <PokemonState pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
