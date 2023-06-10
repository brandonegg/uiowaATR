import { createContext, useContext, useState } from "react";
import {
  type InternalFieldName,
  useFormContext,
  type UseFormRegisterReturn,
} from "react-hook-form";

// generics
interface ToStringable {
  toString: () => string;
}

// Define contexts
const SelectorContext = createContext<{
  type: "one" | "many";
  updateCallback: (_value: string) => void;
}>({
  type: "one",
  updateCallback: (_value: string) => {
    return;
  },
});
const SelectedUniqueContext = createContext<string>("");
const SelectedManyContext = createContext<string[]>([]);

function MultiSelectorMany<T extends ToStringable>({
  label,
  defaultValues,
  children,
  details,
}: {
  label: string;
  defaultValues: T[];
  children: undefined | JSX.Element | JSX.Element[];
  details: UseFormRegisterReturn<string>;
}) {
  const { setValue } = useFormContext();
  const [selected, setSelected] = useState<string[]>(
    defaultValues.map((value) => {
      return value.toString();
    })
  );

  const updateCallback = (value: string) => {
    if (selected.includes(value)) {
      const filteredSelected = selected.filter((selectedValue) => {
        return selectedValue !== value;
      });

      setValue(details.name, filteredSelected);
      setSelected(filteredSelected);
      return;
    }

    setValue(details.name, [value, ...selected]);
    setSelected([value, ...selected]);
  };

  return (
    <SelectorContext.Provider value={{ type: "many", updateCallback }}>
      <SelectedManyContext.Provider value={selected}>
        <div className="flex flex-col">
          <label className="text-md block font-semibold">{label}</label>
          <span className="block text-sm italic text-neutral-400">
            Select all that apply
          </span>
          <input {...details} readOnly type="text" className="hidden" />
          <div className="mt-2 space-x-2 space-y-2 overflow-x-auto">
            {children}
          </div>
        </div>
      </SelectedManyContext.Provider>
    </SelectorContext.Provider>
  );
}

function MultiSelector<T extends ToStringable>({
  label,
  defaultValue,
  children,
  details,
}: {
  label: string;
  defaultValue: T;
  children: undefined | JSX.Element | JSX.Element[];
  details: UseFormRegisterReturn<string>;
}) {
  const [selected, setSelected] = useState<string>(defaultValue.toString());
  const { setValue } = useFormContext();

  return (
    <SelectorContext.Provider
      value={{
        type: "one",
        updateCallback: (value) => {
          setSelected(value);
          setValue(details.name, value);
        },
      }}
    >
      <SelectedUniqueContext.Provider value={selected}>
        <div className="flex flex-col">
          <label className="text-md block font-semibold">{label}</label>
          <span className="block text-sm italic text-neutral-400">
            Select one from below
          </span>
          <input {...details} readOnly type="text" className="hidden" />
          <div className="space-x-2 space-y-2 overflow-x-auto">{children}</div>
        </div>
      </SelectedUniqueContext.Provider>
    </SelectorContext.Provider>
  );
}

function MultiSelectorOption<T extends ToStringable>({
  value,
  children,
}: {
  value: T;
  children: undefined | JSX.Element | JSX.Element[];
}) {
  const { updateCallback } = useContext(SelectorContext);

  return (
    <button
      type="button"
      onClick={() => {
        updateCallback?.(value.toString());
      }}
    >
      {children}
    </button>
  );
}

function SimpleSelectorManyOption<T extends ToStringable>({
  type,
  label,
}: {
  type: T;
  label: string;
}) {
  return (
    <MultiSelectorOption value={type}>
      <SelectedManyContext.Consumer>
        {(selected) => (
          <div
            className={
              (selected.includes(type.toString())
                ? "bg-stone-800"
                : "bg-white") +
              " flex flex-row space-x-2 whitespace-nowrap rounded-xl border border-neutral-400 px-2 py-1"
            }
          >
            <span
              className={
                (selected.includes(type.toString())
                  ? "text-white"
                  : "text black") +
                " my-auto inline-block whitespace-nowrap text-sm"
              }
            >
              {label}
            </span>
          </div>
        )}
      </SelectedManyContext.Consumer>
    </MultiSelectorOption>
  );
}

interface SelectorOption<
  T extends string | number | readonly string[] | undefined
> {
  label: string;
  value: T;
}

function DropdownSelector<
  TFieldName extends InternalFieldName,
  T extends string | number | readonly string[] | undefined
>({
  options,
  label,
  placeholder,
  details,
}: {
  options: SelectorOption<T>[];
  label: string;
  placeholder?: string;
  details: UseFormRegisterReturn<TFieldName>;
}) {
  return (
    <section className="space-y-1">
      <label className="text-md block px-1 font-semibold text-neutral-600">
        {label}
      </label>
      <select
        className="block h-8 w-full rounded-lg border border-neutral-600 px-2 py-1"
        {...details}
        placeholder={placeholder}
      >
        {options.map((option, key) => {
          return <option key={key} {...option} />;
        })}
      </select>
    </section>
  );
}

export {
  SelectedUniqueContext,
  SelectorContext,
  SelectedManyContext,
  MultiSelectorMany,
  MultiSelector,
  MultiSelectorOption,
  SimpleSelectorManyOption,
  DropdownSelector,
};
