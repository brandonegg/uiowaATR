import { createContext, useContext, useState } from "react";

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

function MultiSelectorMany<T extends { toString: () => string }>({
  label,
  defaultValues,
  children,
}: {
  label: string;
  defaultValues: T[];
  children: undefined | JSX.Element | JSX.Element[];
}) {
  const [selected, setSelected] = useState<string[]>(
    defaultValues.map((value) => {
      return value.toString();
    })
  );

  const updateCallback = (value: string) => {
    if (selected.includes(value)) {
      setSelected(
        selected.filter((selectedValue) => {
          return selectedValue !== value;
        })
      );
      return;
    }

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
          <input
            readOnly
            type="text"
            className="hidden"
            value={selected ?? ""}
          />
          <div className="flex mt-2 flex-row space-x-2 overflow-x-auto">
            {children}
          </div>
        </div>
      </SelectedManyContext.Provider>
    </SelectorContext.Provider>
  );
}

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
    <SelectorContext.Provider
      value={{ type: "many", updateCallback: setSelected }}
    >
      <SelectedUniqueContext.Provider value={selected}>
        <div className="flex flex-col">
          <label className="text-md block font-semibold">{label}</label>
          <span className="block text-sm italic text-neutral-400">
            Select one from below
          </span>
          <input
            readOnly
            type="text"
            className="hidden"
            value={selected ?? ""}
          />
          <div className="flex mt-2 flex-row space-x-2 overflow-x-auto">
            {children}
          </div>
        </div>
      </SelectedUniqueContext.Provider>
    </SelectorContext.Provider>
  );
}

function MultiSelectorOption<T extends { toString: () => string }>({
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

export {
  SelectedUniqueContext,
  SelectorContext,
  SelectedManyContext,
  MultiSelectorMany,
  MultiSelector,
  MultiSelectorOption,
};
