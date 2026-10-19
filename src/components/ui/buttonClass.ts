import { cx } from "@/lib/text";

export type ButtonVariant = "primary" | "link" | "round" | "bag" | "icon" | "plain";

export interface ButtonLook {
  variant?: ButtonVariant;
}

/** Class list for anything that should look like a button (see styles/components/_button.scss). */
export const buttonClass = ({ variant = "plain" }: ButtonLook, extra?: string) =>
  cx("btn", variant !== "plain" && `btn--${variant}`, extra);
