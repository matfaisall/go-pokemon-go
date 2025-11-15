"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Book, Calculator, Users, Zap, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const features = [
    {
      icon: Book,
      title: "Pokédex",
      description:
        "Browse through all Pokemon with detailed information, stats, and evolutions",
      path: "/pokedex",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Calculator,
      title: "Type Calculator",
      description:
        "Calculate type effectiveness and weaknesses for battle strategies",
      path: "/type-calculator",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Team Builder",
      description: "Build your perfect Pokemon team and analyze type coverage",
      path: "/team-builder",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      title: "Move Database",
      description:
        "Explore all Pokemon moves with power, accuracy, and effects",
      path: "/moves",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="space-y-12">
      {/* hero section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duation: 0.5 }}
        className="text-center space-y-4 py-12"
      >
        <h1 className="text-5xl md:text-5xl font-bold  bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to Go Pokemon Go
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your comprehensive Pokemon companion for exploring, analyzing, and
          building the perfect team
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => router.push("/pokedex")}>
            Explore Pokedex
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("team-builder")}
          >
            Build Team
          </Button>
        </div>
      </motion.div>

      {/* features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className="cursor-pointer group hover:shadow-lg transition-all duration-300"
                onClick={() => router.push(feature.path)}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-linear-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="size-4 text-white" />
                  </div>
                  <CardTitle className="flex items-center justify-between">
                    {feature.title}
                    <ArrowRight className="ml-2 size-4" />
                  </CardTitle>
                </CardHeader>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* stats section */}
      <Card>
        <CardHeader>
          <CardTitle>Database Stats</CardTitle>
          <CardDescription>
            Comprehansive Pokemon data powerd by PokeAPI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                1000+
              </div>
              <div className="text-sm text-muted-foreground">Pokemon</div>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                18
              </div>
              <div className="text-sm text-muted-foreground">Types</div>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                800+
              </div>
              <div className="text-sm text-muted-foreground">Moves</div>
            </div>
            <div className="text-center p-4 bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                300+
              </div>
              <div className="text-sm text-muted-foreground">Abilities</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
