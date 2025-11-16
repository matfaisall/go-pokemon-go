"use client";

import React from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { TYPE_COLORS } from "@/lib/constants/colors";

const PokemonCard = ({ pokemon, onClick, showShiny = true }) => {
  const imageUrl = showShiny
    ? pokemon.sprites.other?.["official-artwork"]?.front_shiny ||
      pokemon.sprites.front_shiny
    : pokemon.sprites.other?.["official-artwork"]?.front_default ||
      pokemon.sprites.front_default;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        onClick={onClick}
        className="cursor-pointer overflow-hidden relative group hover:shadow-lg transition-shadow"
      >
        <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
          <div className="relative w-full h-48 flex items-center justify-center">
            <Image
              src={imageUrl || "/pokemon-placeholder.png"}
              alt={pokemon.name}
              fill
              className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground font-mono">
              #{String(pokemon.id).padStart(3, "0")}
            </span>
          </div>

          <h3 className="text-lg font-bold capitalize mb-3">{pokemon.name}</h3>

          <div className="flex gap-2 flex-wrap">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                style={{
                  backgroundColor: TYPE_COLORS[type.type.name] || "#68A090",
                  color: "white",
                }}
                className="text-xs font-medium"
              >
                {type.type.name}
              </Badge>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
            <div className="text-center">
              <div className="font-medium">Height</div>
              <div>{(pokemon.height / 10).toFixed(1)}m</div>
            </div>
            <div className="text-center">
              <div className="font-medium">Weight</div>
              <div>{(pokemon.weight / 10).toFixed(1)}kg</div>
            </div>
            <div className="text-center">
              <div className="font-medium">XP</div>
              <div>{pokemon.base_experience}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PokemonCard;
