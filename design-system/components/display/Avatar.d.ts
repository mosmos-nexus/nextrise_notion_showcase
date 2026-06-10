import * as React from "react";

/**
 * User / companion avatar. Falls back to gradient initials when no image.
 * Set `ring` for the gradient "Mos companion" frame.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image URL. Omit to render gradient initials. */
  src?: string;
  /** Used for alt + initials fallback. */
  name?: string;
  /** Pixel size of the avatar. @default 48 */
  size?: number;
  /** @default "circle" */
  shape?: "circle" | "rounded" | "pill";
  /** Brand-gradient ring (marks a Mos companion). @default false */
  ring?: boolean;
}

export function Avatar(props: AvatarProps): JSX.Element;
export default Avatar;
