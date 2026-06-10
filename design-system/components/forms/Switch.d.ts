import * as React from "react";

/**
 * Pill toggle for binary settings (theme, notifications). Controlled or uncontrolled.
 */
export interface SwitchProps {
  /** Controlled on/off state. Omit to use defaultChecked. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  /** @default "md" */
  size?: "sm" | "md";
  /** Optional trailing label. */
  label?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
export default Switch;
