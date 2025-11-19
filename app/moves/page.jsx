"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Zap } from "lucide-react";

const MovesPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Moves Database</h1>
        <p className="text-muted-foreground">
          Explore all pokemon moves and their effects
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-6" />
            Move Database
          </CardTitle>
          <CardDescription>
            This feature is coming soon! You`ll be able to browse and search all
            pokemon moves.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Zap className="size-16 mx-auto mb-4 opacity-50 " />
            <p>Move Database feature is under development</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovesPage;
