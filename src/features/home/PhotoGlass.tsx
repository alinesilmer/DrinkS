import { type ReactNode, useId } from "react";
import { type GlassShape } from "@/features/home/glassShapes";

interface PhotoGlassProps {
  shape: GlassShape;
  className?: string;
  /** The drink, in the photo's pixels. It is cut to the inside of the glass. */
  children: ReactNode;
}

/**
 * A glass of your photos with a drink in it: the photo, the drink in front of it (it multiplies with what stands
 * in the glass, so a straw or a stick shows through), the depth and the sides of the drink, and (for glasses that are
 * clear inside) the glass's own shine over all of it. The depth and the sides are drawn only where there is drink:
 * the drink is the mask.
 */
export function PhotoGlass({ shape, className, children }: PhotoGlassProps) {
  const id = useId().replace(/:/g, "");
  const { src, width, height, inside, transform, hole, front = true, shade = 1, bounds } = shape;
  const box = { x: bounds.left, y: bounds.top, width: bounds.right - bounds.left, height: bounds.bottom - bounds.top };

  return (
    <svg className={className} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={`${id}-in`}>
          <path d={inside} transform={transform} />
        </clipPath>
        <clipPath id={`${id}-front`}>
          <path d={hole ? `${inside} ${hole}` : inside} transform={transform} clipRule="evenodd" />
        </clipPath>
        <mask id={`${id}-drink`} style={{ maskType: "alpha" }}>
          <g>{children}</g>
        </mask>
        {/* depth: a little light at the top, darker towards the bottom */}
        <linearGradient id={`${id}-depth`} gradientUnits="userSpaceOnUse" x1="0" y1={bounds.top} x2="0" y2={bounds.bottom}>
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" style={{ stopColor: "var(--ink)" }} stopOpacity={0.36 * shade} />
        </linearGradient>
        {/* sides: darker where the drink meets the glass, a soft light on the left */}
        <linearGradient id={`${id}-side`} gradientUnits="userSpaceOnUse" x1={bounds.left} y1="0" x2={bounds.right} y2="0">
          <stop offset="0" style={{ stopColor: "var(--ink)" }} stopOpacity={0.34 * shade} />
          <stop offset="0.13" style={{ stopColor: "var(--ink)" }} stopOpacity="0" />
          <stop offset="0.24" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="0.36" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.87" style={{ stopColor: "var(--ink)" }} stopOpacity="0" />
          <stop offset="1" style={{ stopColor: "var(--ink)" }} stopOpacity={0.3 * shade} />
        </linearGradient>
      </defs>
      <image href={src} width={width} height={height} />
      <g clipPath={`url(#${id}-in)`}>
        <g className="photo-glass__drink">{children}</g>
        <g mask={`url(#${id}-drink)`}>
          <rect {...box} fill={`url(#${id}-depth)`} />
          <rect {...box} fill={`url(#${id}-side)`} />
        </g>
      </g>
      {front && <image href={src} width={width} height={height} clipPath={`url(#${id}-front)`} />}
    </svg>
  );
}
