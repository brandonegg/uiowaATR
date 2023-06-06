import { useState } from "react";
import {
  type UseFormRegisterReturn,
  type InternalFieldName,
} from "react-hook-form";

/**
 * Single line input for the fields found to the right of the
 * resource logo.
 */
function InfoInputLine<
  TFieldName extends InternalFieldName = InternalFieldName
>({
  value,
  placeholder,
  hint,
  details,
}: {
  value: string;
  placeholder: string;
  hint?: string;
  details: UseFormRegisterReturn<TFieldName>;
}) {
  const [curValue, setCurValue] = useState(value);

  return (
    <div className="relative">
      <input
        {...details}
        onChange={(event) => {
          setCurValue(event.target.value);
          details.onChange(event).catch((e) => {
            console.error(e);
          });
        }}
        placeholder={placeholder}
        type="text"
        className="w-full border-b border-neutral-300 px-2"
      />
      <label className="absolute bottom-0 right-2 top-0 text-right text-sm">
        {curValue !== "" ? (
          <span className="italic text-neutral-400">{hint}</span>
        ) : undefined}
      </label>
    </div>
  );
}

export { InfoInputLine };
