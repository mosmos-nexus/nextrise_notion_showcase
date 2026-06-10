import * as React from "react";

/**
 * Single-line text / email field with label, helper text and status states.
 * The core of the waitlist capture — keep it to one field + one CTA.
 */
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Field label rendered above the control. */
  label?: string;
  /** Input type (text, email, …). @default "text" */
  type?: string;
  /** Helper / validation message below the field. */
  helper?: string;
  /** Validation state — drives border + helper color. @default "default" */
  status?: "default" | "error" | "success";
  /** Control height: sm 36 / md 44 / lg 52. @default "md" */
  size?: "sm" | "md" | "lg";
  /** Optional leading icon node. */
  leftIcon?: React.ReactNode;
  disabled?: boolean;
}

export function Input(props: InputProps): JSX.Element;
export default Input;
