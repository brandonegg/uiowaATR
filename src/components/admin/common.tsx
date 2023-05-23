import Link from "next/link";

const AdminActionLink = ({
  label,
  href,
  symbol,
}: {
  label: string;
  href: string;
  symbol: JSX.Element | undefined;
}) => {
  return (
    <Link
      className="py-auto group my-auto h-full space-x-2 rounded-lg border border-neutral-400 bg-neutral-800 px-2 hover:border-neutral-800 hover:bg-white"
      href={href}
    >
      <span className="my-auto inline-block h-fit align-middle text-sm leading-8 text-white group-hover:text-black">
        {label}
      </span>
      <span className="inline-block align-middle text-white group-hover:text-black">
        {symbol}
      </span>
    </Link>
  );
};

export { AdminActionLink };
