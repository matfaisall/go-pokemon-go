"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import { POKEMON_TYPES } from "@/lib/constants/pokemonTypes";
import { Button } from "@/components/ui/button";
import { TYPE_COLORS } from "@/lib/constants/colors";
import { useType } from "@/hooks/useType";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const TypeCalculatorPage = () => {
  const [selectedType, setSelectedType] = useState("");

  const { data: typeData, isLoading } = useType(selectedType, !!selectedType);
  // console.log("typeData", typeData);
  // console.log(typeData?.damage_relations?.double_damage_to);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Type Calculator</h1>
        <p className="text-muted-foreground">
          Select a type to see its strenghs and wekknesses
        </p>
      </div>

      {/* type selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Type</CardTitle>
          <CardDescription>Choose a Pokemon type to analyze</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {POKEMON_TYPES.map((type) => (
              <Button
                key={type}
                size="sm"
                onClick={() => setSelectedType(type)}
                className={`transition-all border-0 ${
                  selectedType === type
                    ? "ring-2  ring-white scale-105"
                    : "hover:scale-105"
                }`}
                style={{ backgroundColor: TYPE_COLORS[type], color: "white" }}
              >
                <p className="font-medium capitalize text-sm">{type}</p>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* result type */}
      {!selectedType ? (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            Select a type above to see its effectiveness
          </CardContent>
        </Card>
      ) : (
        <>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Skeleton className="h-64" />
              <Skeleton className="h-64" />
            </div>
          ) : typeData ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge
                      style={{
                        backgroundColor: TYPE_COLORS[selectedType],
                        color: "white",
                      }}
                    >
                      {selectedType}
                    </Badge>
                    Attacking
                  </CardTitle>
                  <CardDescription>
                    Effectiveness when {selectedType} type attacks
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* super effective */}
                  {typeData.damage_relations.double_damage_to.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-green-400 mb-2">
                        Super Effective Against (2x)
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.double_damage_to.map(
                          (type) => (
                            <Badge
                              key={type.name}
                              style={{
                                backgroundColor: TYPE_COLORS[type.name],
                                color: "white",
                              }}
                            >
                              {type.name}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* not very effective */}
                  {typeData.damage_relations.half_damage_to.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-orange-400 mb-2">
                        Not Very Effective Aginst (0.5x)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.half_damage_to.map(
                          (type) => (
                            <Badge
                              key={type.name}
                              style={{
                                backgroundColor: TYPE_COLORS[type.name],
                                color: "white",
                              }}
                            >
                              {type.name}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* no effect */}
                  {typeData.damage_relations.no_damage_to.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-400 mb-2">
                        No Effect Against (0x)
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.no_damage_to.map((type) => (
                          <Badge
                            key={type.name}
                            style={{
                              backgroundColor: TYPE_COLORS[type.name],
                              color: "white",
                            }}
                          >
                            {type.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge
                      style={{
                        backgroundColor: TYPE_COLORS[selectedType],
                        color: "white",
                      }}
                    >
                      {selectedType}
                    </Badge>
                    Defending
                  </CardTitle>
                  <CardDescription>
                    Effectiveness when {selectedType} type is attacked
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Weak To */}
                  {typeData.damage_relations.double_damage_from.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                        Weak To (2x damage taken)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.double_damage_from.map(
                          (type) => (
                            <Badge
                              key={type.name}
                              style={{
                                backgroundColor: TYPE_COLORS[type.name],
                                color: "white",
                              }}
                            >
                              {type.name}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resistant To */}
                  {typeData.damage_relations.half_damage_from.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                        Resistant To (0.5x damage taken)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.half_damage_from.map(
                          (type) => (
                            <Badge
                              key={type.name}
                              style={{
                                backgroundColor: TYPE_COLORS[type.name],
                                color: "white",
                              }}
                            >
                              {type.name}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {/* Immune To */}
                  {typeData.damage_relations.no_damage_from.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                        Immune To (0x damage taken)
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {typeData.damage_relations.no_damage_from.map(
                          (type) => (
                            <Badge
                              key={type.name}
                              style={{
                                backgroundColor: TYPE_COLORS[type.name],
                                color: "white",
                              }}
                            >
                              {type.name}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default TypeCalculatorPage;
