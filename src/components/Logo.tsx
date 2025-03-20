
import React from "react";
import { cn } from "@/lib/utils";
import { GraduationCap } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "white";
  showText?: boolean;
}

const Logo = ({
  className,
  size = "md",
  variant = "primary",
  showText = true,
}: LogoProps) => {
  const sizes = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2",
        sizes[size],
        variant === "white" ? "text-white" : "text-primary",
        className
      )}
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
        <div className="relative bg-white dark:bg-black/40 backdrop-blur-sm rounded-full p-1.5 border border-primary/30">
          <GraduationCap
            size={iconSizes[size]}
            className="text-primary"
            strokeWidth={2.5}
          />
        </div>
      </div>
      {showText && (
        <h1 className={cn("font-bold tracking-tight whitespace-nowrap")}>
          GradeSensei
        </h1>
      )}
    </div>
  );
};

export { Logo };
