import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cx } from "@/lib/text";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
  /** What is being counted, for screen readers: "Ron blanco". */
  label: string;
  lessLabel: string;
  moreLabel: string;
  size?: "md" | "sm";
}

/** − 2 + : going below 1 is allowed and means "remove". */
export function QuantityStepper({ value, onChange, max, label, lessLabel, moreLabel, size = "md" }: QuantityStepperProps) {
  return (
    <div className={cx("stepper", size === "sm" && "stepper--sm")} role="group" aria-label={label}>
      <Button variant="icon" aria-label={lessLabel} onClick={() => onChange(value - 1)}>
        <Icon name="minus" />
      </Button>
      <output className="stepper__value" aria-live="polite">
        {value}
      </output>
      <Button variant="icon" aria-label={moreLabel} disabled={value >= max} onClick={() => onChange(value + 1)}>
        <Icon name="plus" />
      </Button>
    </div>
  );
}
