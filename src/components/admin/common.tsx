import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { type ButtonHTMLAttributes, useEffect, useState } from "react";

const AdminActionBody = ({
  label,
  symbol,
}: {
  label: string;
  symbol: JSX.Element | undefined;
}) => {
  return (
    <>
      <span className="my-auto inline-block h-fit align-middle text-sm leading-8 text-white group-hover:text-black">
        {label}
      </span>
      <span className="inline-block align-middle text-white group-hover:text-black">
        {symbol}
      </span>
    </>
  );
};

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
      <AdminActionBody label={label} symbol={symbol} />
    </Link>
  );
};

const AdminActionConfirmButton = ({
  label,
  onConfirm,
  symbol,
  type = "button",
}: {
  label: string;
  onConfirm?: () => void;
  symbol: JSX.Element | undefined;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) => {
  const [isConfirmView, setConfirmView] = useState(false);

  useEffect(() => {
    if (!isConfirmView) {
      return;
    }

    setTimeout(() => {
      if (isConfirmView) {
        setConfirmView(false);
      }
    }, 5000);
  }, [isConfirmView]);

  if (isConfirmView) {
    return (
      <AdminActionButton
        symbol={<ExclamationCircleIcon className="w-4 animate-ping" />}
        label={`Confirm ${label}`}
        onClick={onConfirm}
        type={type}
      />
    );
  }

  return (
    <AdminActionButton
      symbol={symbol}
      label={label}
      onClick={() => {
        setConfirmView(true);
      }}
    />
  );
};

const AdminActionButton = ({
  label,
  onClick,
  symbol,
  type = "button",
}: {
  label: string;
  onClick?: () => void;
  symbol: JSX.Element | undefined;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) => {
  return (
    <button
      type={type}
      className="py-auto group my-auto h-full space-x-2 rounded-lg border border-neutral-400 bg-neutral-800 px-2 hover:border-neutral-800 hover:bg-white"
      onClick={onClick}
    >
      <span className="my-auto inline-block h-fit align-middle text-sm leading-8 text-white group-hover:text-black">
        {label}
      </span>
      <span className="inline-block align-middle text-white group-hover:text-black">
        {symbol}
      </span>
    </button>
  );
};

export { AdminActionLink, AdminActionButton, AdminActionConfirmButton };
