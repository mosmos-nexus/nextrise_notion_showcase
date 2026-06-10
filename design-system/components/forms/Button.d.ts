import * as React from "react";

/**
 * Mosmos primary action control. Leads with the result, never with hype —
 * use the primary variant for the single clear CTA per section.
 *
 * @startingPoint section="Forms" subtitle="Primary / secondary / outline / ghost button" viewport="700x160"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Visual emphasis. @default "primary" */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Control height: sm 36 / md 44 / lg 52. @default "md" */
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Stretch to container width. @default false */
  fullWidth?: boolean;
  /** Fully rounded pill shape instead of radius-md. @default false */
  pill?: boolean;
  /** Icon node rendered before the label. */
  leftIcon?: React.ReactNode;
  /** Icon node rendered after the label. */
  rightIcon?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
export default Button;
