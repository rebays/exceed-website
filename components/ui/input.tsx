import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const fieldClasses =
  "w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-[15px] text-foreground placeholder:text-subtle-foreground outline-none transition-colors focus:border-primary focus:bg-white/[0.07]";

export function Input({ label, error, className = "", id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/[^a-z]+/g, "-");

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm text-muted-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        aria-invalid={!!error}
        className={`${fieldClasses} ${error ? "border-red-500/70 focus:border-red-500" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
