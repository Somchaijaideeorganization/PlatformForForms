
import React from "react";
import { Separator } from "../ui/separator";

interface AuthDividerProps {
  text: string;
}

export function Divider({ text }: AuthDividerProps) {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <Separator />
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-2 bg-background">{text}</span>
      </div>
    </div>
  );
}
