import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SocialButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  provider: string;
  className?: string;
}

export function SocialButton({
  onClick,
  icon,
  provider,
  className,
}: SocialButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 h-10 px-4 py-2 rounded-md transition-all duration-200",
        className
      )}
    >
      {icon}
      <span className="sr-only md:not-sr-only md:inline-block">{provider}</span>
    </Button>
  );
}
