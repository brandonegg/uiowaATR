import { createContext, useContext, useState } from "react";

// Define contexts
const MultiSelectorContext = createContext({
  selected: "",
  updateCallback: (_value: string) => {
    return;
  },
});

function MultiSelector<T extends { toString: () => string }>({
  label,
  defaultValue,
  children,
}: {
  label: string;
  defaultValue: T;
  children: undefined | JSX.Element | JSX.Element[];
}) {
  const [selected, setSelected] = useState<string>(defaultValue.toString());

  return (
    <MultiSelectorContext.Provider
      value={{ selected, updateCallback: setSelected }}
    >
      <div className="flex flex-col">
        <label className="text-md block font-semibold">{label}</label>
        <span className="block text-sm italic text-neutral-400">
          Select one from below
        </span>
        <input readOnly type="text" className="hidden" value={selected ?? ""} />
        <div className="mt-2 flex flex-row space-x-2 overflow-x-auto">
          {children}
        </div>
      </div>
    </MultiSelectorContext.Provider>
  );
}

function MultiSelectorOption<T extends { toString: () => string }>({
  value,
  children,
}: {
  value: T;
  children: undefined | JSX.Element | JSX.Element[];
}) {
  const { updateCallback } = useContext(MultiSelectorContext);

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

export { MultiSelectorContext, MultiSelector, MultiSelectorOption };
