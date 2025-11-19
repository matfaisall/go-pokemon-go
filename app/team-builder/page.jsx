import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Users } from "lucide-react";
import React from "react";

const TeamBuilderPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Team Builder</h1>
        <p className="text-muted-foreground">
          Build and analyze your perfect Pokemon team
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-6" />
            Team Builder
          </CardTitle>
          <CardDescription>
            This feature is coming soon! You`ll be able to build teams and
            analyze type coverage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <Users className="size-16 mx-auto mb-4 opacity-50 " />
            <p>Team Builder feature is uder development</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamBuilderPage;
