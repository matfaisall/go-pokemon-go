"use client";

import React from "react";
import { PokemonList } from "./components/PokemonList";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Pokedex</h1>
        <p className="text-muted-foreground">
          Browse through all Pokemon from Generation 1 to the latest generation
        </p>
      </div>

      {/* pokemon list */}
      <PokemonList />
    </div>
  );
};

export default page;
