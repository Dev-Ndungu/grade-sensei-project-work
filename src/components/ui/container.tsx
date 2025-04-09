
import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  children: React.ReactNode;
  fluid?: boolean; // Add a fluid prop for edge-to-edge layouts
}

const Container = ({
  as: Component = "div",
  size = "lg",
  className,
  children,
  fluid = false,
  ...props
}: ContainerProps) => {
  return (
    <Component
      className={cn(
        "w-full mx-auto",
        // Only apply padding if not fluid
        !fluid && "px-4 sm:px-6",
        // Only apply max-width constraints if not fluid
        !fluid && {
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
          "max-w-full": size === "full",
        },
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Container };
