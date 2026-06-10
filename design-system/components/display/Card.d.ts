import * as React from "react";

/**
 * Soft, cozy container. Pass icon/title/description for a feature card,
 * or just children for a plain surface.
 *
 * @startingPoint section="Display" subtitle="Feature card with icon, title, body" viewport="700x260"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Feature-card icon node (rendered in an accent tile). */
  icon?: React.ReactNode;
  /** Feature-card heading (NanumSquare H3). */
  title?: string;
  /** Feature-card body copy. */
  description?: string;
  /** Accent tile color behind the icon. @default "blue" */
  accent?: "blue" | "purple" | "cyan" | "none";
  /** Resting elevation. @default "e1" */
  elevation?: "e1" | "e2" | "e3" | "flat";
  /** Lift + raise shadow on hover. @default false */
  interactive?: boolean;
  /** Inner padding (CSS value). @default var(--space-lg) */
  padding?: string;
}

export function Card(props: CardProps): JSX.Element;
export default Card;
