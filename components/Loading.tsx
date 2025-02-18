import React from "react";
import { Icons } from "../utils/icons";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-2">
        <Icons.Loader className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Chargement...</p>
      </div>
    </div>
  );
}
