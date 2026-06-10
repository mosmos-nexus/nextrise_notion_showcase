import * as React from "react";

/**
 * Small pill label — status tags, category chips, "베타" markers.
 */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** Semantic color. @default "neutral" */
  tone?: "neutral" | "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info";
  /** Fill style. @default "soft" */
  variant?: "soft" | "solid" | "outline";
  /** @default "md" */
  size?: "sm" | "md";
  /** Show a leading status dot. @default false */
  dot?: boolean;
}

export function Badge(props: BadgeProps): JSX.Element;
export default Badge;
