"use client";

import { forwardRef, useState } from "react";
import { Input } from "./input";

function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").replace(/^7|^8/, "").slice(0, 10);
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 8),
    digits.slice(8, 10),
  ].filter(Boolean);

  let result = "+7";
  if (parts[0]) result += ` (${parts[0]}`;
  if (parts[0] && parts[0].length === 3) result += ")";
  if (parts[1]) result += ` ${parts[1]}`;
  if (parts[2]) result += `-${parts[2]}`;
  if (parts[3]) result += `-${parts[3]}`;
  return result;
}

interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> {
  label?: string;
  error?: string;
  onValueChange?: (value: string) => void;
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ label = "Телефон", error, onValueChange, ...props }, ref) => {
    const [value, setValue] = useState("+7");

    return (
      <Input
        ref={ref}
        label={label}
        error={error}
        type="tel"
        inputMode="tel"
        placeholder="+7 (___) ___-__-__"
        value={value}
        onChange={(e) => {
          const formatted = formatPhone(e.target.value);
          setValue(formatted);
          onValueChange?.(formatted);
        }}
        onKeyDown={(e) => {
          if (e.key === "Backspace" && value === "+7") {
            e.preventDefault();
          }
        }}
        {...props}
      />
    );
  }
);
PhoneInput.displayName = "PhoneInput";
