import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export const ErrorNotice = ({
  header,
  body,
  icon,
}: {
  header?: string;
  body?: string;
  icon?: boolean;
}) => {
  return (
    <>
      {header ? (
        <div className="mx-auto w-fit rounded-xl border border-red-300 bg-red-100 px-4 py-4 text-center font-semibold text-red-600">
          {icon ? (
            <div className="mx-auto grid place-items-center">
              <ExclamationTriangleIcon className="h-10 w-10" />
            </div>
          ) : undefined}
          <span className="text-lg font-semibold text-red-500">{header}</span>
          {body ? (
            <p className="mx-8 my-2 text-sm font-normal text-stone-600">
              {body}
            </p>
          ) : undefined}
        </div>
      ) : undefined}
    </>
  );
};
