import { useState } from "react";

/**
 * Single line input for the fields found to the right of the
 * resource logo.
 */
const InfoInputLine = ({
  value,
  placeholder,
  hint,
}: {
  value: string;
  placeholder: string;
  hint?: string;
}) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  return (
    <div className="relative">
      <input
        onChange={(event) => {
          setCurrentValue(event.target.value);
        }}
        placeholder={placeholder}
        value={currentValue}
        type="text"
        className="w-full border-b border-neutral-300 px-2"
      />
      <label className="absolute bottom-0 right-2 top-0 text-right text-sm">
        {currentValue !== "" ? (
          <span className="italic text-neutral-400">{hint}</span>
        ) : undefined}
      </label>
    </div>
  );
};

export { InfoInputLine };
