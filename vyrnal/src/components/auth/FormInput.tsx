
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export function FormInput({
  id,
  label,
  type: initialType,
  placeholder,
  value,
  onChange,
  error,
  autoComplete,
  required = false,
  icon,
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [type, setType] = useState(initialType);

  const togglePasswordVisibility = () => {
    setType(type === "password" ? "text" : "password");
  };

  const isPassword = initialType === "password";
  const isValid = value && !error;

  return (
    <div className="mb-4">
      <Label htmlFor={id} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className={cn(
            "pl-10 transition-all duration-200 border",
            error ? "border-red-500 focus:ring-red-500" : "focus:ring-primary",
            isFocused ? "ring-2 ring-opacity-50" : "",
            icon ? "pl-10" : ""
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        
        {isPassword && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            {type === "password" ? <Eye size={16} /> : <EyeOff size={16} />}
          </button>
        )}
        
        {isValid && !isPassword && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
            <Check size={16} />
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center mt-1 text-sm text-red-500">
          <AlertCircle size={14} className="mr-1" />
          {error}
        </div>
      )}
    </div>
  );
}
