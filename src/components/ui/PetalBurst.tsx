import { cssVars } from "@/lib/cssVars";
import { cx } from "@/lib/text";

// One fat teardrop pointing up from the centre, bulb at the far end (drawn in a -100 → 100 box).
const DROP = "M0 -10C-8 -26 -22 -44 -19 -66C-16 -92 16 -92 19 -66C22 -44 8 -26 0 -10Z";
const TONES = ["orange", "amber", "salmon", "peach"] as const;

// Twelve petals, a long one then a short one, in the four warm colours of the logo.
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  angle: i * 30,
  length: i % 2 === 0 ? 1 : 0.72,
  tone: TONES[i % TONES.length],
}));

/** The splash of petals behind the logo, as a decoration. Size it with the className. */
export function PetalBurst({ className }: { className?: string }) {
  return (
    <svg className={cx("petals", className)} viewBox="-100 -100 200 200" aria-hidden="true" focusable="false">
      {PETALS.map((petal, i) => (
        <path
          key={petal.angle}
          className={`petals__petal petals__petal--${petal.tone}`}
          d={DROP}
          style={cssVars({ "--a": petal.angle, "--l": petal.length, "--i": i })}
        />
      ))}
    </svg>
  );
}
