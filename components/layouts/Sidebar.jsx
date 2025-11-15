"use client";
import React from "react";
import { Book, Calculator, Home, Users, Zap } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const navItems = [
  { id: 1, to: "/", icon: Home, label: "Home" },
  { id: 2, to: "pokedex", icon: Book, label: "Pokedex" },
  { id: 3, to: "/type-calculator", icon: Calculator, label: "Type Calculator" },
  { id: 4, to: "/team-builder", icon: Users, label: "Team Builder" },
  { id: 5, to: "/moves", icon: Zap, label: "Moves" },
];

const Sidebar = () => {
  const router = useRouter();
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r bg-background hidden lg:block">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          return (
            <Button
              key={item.id}
              onClick={() => router.push(item.to)}
              variant="ghost"
              className="w-full flex items-center justify-start"
            >
              <item.icon className="size-4" />
              <span className="ml-2">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
