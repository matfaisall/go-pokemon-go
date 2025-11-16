"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import InputSearch from "@/components/shared/InputSearch";

const Header = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      console.log("fitur masih belum ada");
      // router.push(`/pokemon/${search.trim().toLowerCase()}`);
      setSearch("");
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/50 backdrop-blur ">
      <div className="container h-16 flex items-center px-4">
        <div className="flex flex-1 items-center gap-6">
          <Button variant="ghost" className="" onClick={() => router.push("/")}>
            <Image
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
              alt="Go Pokemon Go Logo"
              width={30}
              height={30}
              className="object-cover"
            />
            <span className="hidden sm:inline">Go Pokemon Go</span>
          </Button>

          <form onSubmit={handleSearch}>
            <InputSearch
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
