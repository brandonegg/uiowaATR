const AdminBarLayout = ({
  actions,
  children,
}: {
  actions: JSX.Element | JSX.Element[];
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <div className="relative">
      <div className="sticky left-0 right-0 top-[71px] z-10 mx-auto mb-6 mt-[15px] flex max-w-4xl flex-row justify-between rounded-xl border border-neutral-600 bg-red-300 drop-shadow-xl">
        <h1 className="rounded-lg px-4 py-2 font-semibold text-black">
          Admin Mode
        </h1>
        <div className="flex flex-row space-x-2 p-1">{actions}</div>
      </div>
      {children}
    </div>
  );
};

export { AdminBarLayout };
