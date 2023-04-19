/**
 * Styled black background gradient label used to label a widget.
 * Widget refers to one of the isolated rounded containers (such as search form or table).
 */
const TopLabel = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <div className="mx-auto overflow-hidden bg-gradient-to-t from-neutral-900 to-neutral-700 px-4 py-2">
      {children}
    </div>
  );
};

export { TopLabel };
