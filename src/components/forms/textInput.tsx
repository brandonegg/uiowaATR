import { type HTMLInputTypeAttribute, useState } from "react";
import {
  type UseFormRegisterReturn,
  type InternalFieldName,
} from "react-hook-form";

/**
 * Single line input for the fields found to the right of the
 * resource logo.
 */
function InfoInputLine<TFieldName extends InternalFieldName>({
  value,
  placeholder,
  hint,
  details,
}: {
  value?: string | undefined;
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

function GenericInput<TFieldName extends InternalFieldName>({
  label,
  placeholder,
  type = "text",
  details,
}: {
  label: string;
  placeholder?: string;
  type: HTMLInputTypeAttribute;
  details: UseFormRegisterReturn<TFieldName>;
}) {
  return (
    <section className="w-full space-y-1">
      <label className="text-md block px-1 font-semibold text-neutral-600">
        {label}
      </label>
      <input
        className="block h-8 w-full rounded-lg border border-neutral-600 px-2 py-1"
        {...details}
        placeholder={placeholder}
        type={type}
      ></input>
    </section>
  );
}

export { InfoInputLine, GenericInput };
