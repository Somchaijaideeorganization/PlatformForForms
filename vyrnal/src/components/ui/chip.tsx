import React from "react";

interface ChipProps {
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export function Chip({ children, onClose, className }: ChipProps) {
  return (
    <div className={`inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 ${className}`}>
      <span className="text-sm">{children}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="text-xs text-muted-foreground hover:text-destructive focus:outline-none"
        >
          ×
        </button>
      )}
    </div>
  );
}
