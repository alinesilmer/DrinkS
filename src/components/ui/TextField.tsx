interface TextFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  error?: string;
  type?: "text" | "email";
  /** Renders a textarea instead of a single line. */
  multiline?: boolean;
  autoComplete?: string;
  /** "box" is a bordered input; "line" is written on a ruled line, like a letter. */
  look?: "box" | "line";
}

/** Labelled form field with its error message wired up for screen readers. */
export function TextField(props: TextFieldProps) {
  const { id, label, value, onChange, maxLength, error, type = "text", multiline, autoComplete, look = "box" } = props;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: id,
    value,
    maxLength,
    autoComplete,
    className: "field__control",
    "aria-invalid": !!error,
    "aria-describedby": error ? errorId : undefined,
  };

  return (
    <div className={`field field--${look}`}>
      <label className="field__label" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={5} onChange={(e) => onChange(e.target.value.slice(0, maxLength))} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value.slice(0, maxLength))} />
      )}
      {error && (
        <p id={errorId} className="field__error">
          {error}
        </p>
      )}
    </div>
  );
}
