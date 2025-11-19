"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { getStatColor } from "@/lib/constants/colors";

const PokemonState = ({ pokemon }) => {
  console.log(pokemon);

  const statsData = pokemon.stats.map((stat) => ({
    stat: stat.stat.name
      .replace("special-", "sp. ")
      .replace("-", " ")
      .toUpperCase(),
    value: stat.base_stat,
    fullMark: 255,
  }));

  const totalStats = pokemon.stats.reduce(
    (sum, stat) => sum + stat.base_stat,
    0
  );

  const avgStat = Math.round(totalStats / pokemon.stats.length);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Base Stats</span>
          <div className="text-sm font-normal text-muted-foreground">
            Total :{" "}
            <span className="font-bold text-foreground">{totalStats}</span> |
            Avg: <span className="font-bold text-foreground">{avgStat}</span>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={statsData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="stat" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 255]}
                  tick={{ fontSize: 10 }}
                />
                <Radar
                  name="Base Stats"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Bars */}
          <div className="space-y-4">
            {pokemon.stats.map((stat) => {
              const percentage = (stat.base_stat / 255) * 100;
              const statName = stat.stat.name
                .replace("special-", "Sp. ")
                .replace("-", " ")
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");

              return (
                <div key={stat.stat.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{statName}</span>
                    <span className="text-muted-foreground">
                      {stat.base_stat}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: getStatColor(stat.base_stat),
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonState;
