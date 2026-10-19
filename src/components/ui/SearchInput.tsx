import { type KeyboardEvent } from "react";
import { Icon } from "@/components/ui/Icon";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  label: string;
  placeholder?: string;
}

const MAX_LENGTH = 60;

/** Search field. The value is plain text, length-limited, and only ever rendered as text. */
export function SearchInput({ value, onChange, onSubmit, label, placeholder }: SearchInputProps) {
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <label className="search">
      <Icon name="search" />
      <input
        className="search__input"
        type="search"
        value={value}
        maxLength={MAX_LENGTH}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
        onChange={(e) => onChange(e.target.value.slice(0, MAX_LENGTH))}
        onKeyDown={onKeyDown}
      />
    </label>
  );
}
