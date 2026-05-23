import { HTMLAttributes } from "react";

type Direction = "r" | "l" | "br" | "bl";

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  from?: string;
  to?: string;
  via?: string;
  direction?: Direction;
}

export function GradientText({
  from = "primary",
  to = "secondary",
  via,
  direction = "r",
  className = "",
  ...props
}: GradientTextProps) {
  const dirMap: Record<Direction, string> = {
    r: "bg-gradient-to-r",
    l: "bg-gradient-to-l",
    br: "bg-gradient-to-br",
    bl: "bg-gradient-to-bl",
  };

  const viaClass = via ? `via-${via}` : "";

  return (
    <span
      className={`text-transparent bg-clip-text ${dirMap[direction]} from-${from} ${viaClass} to-${to} ${className}`}
      {...props}
    />
  );
}
