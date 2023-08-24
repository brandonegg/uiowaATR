import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

export const ErrorNotice = ({header, body, icon}: {header?: string, body?: string, icon?: boolean}) => {
  return <>
    {header ? (
      <div className="rounded-xl mx-auto w-fit px-4 py-4 bg-red-100 border-red-300 border text-center font-semibold text-red-600">
        {icon ? (
          <div className="mx-auto grid place-items-center">
            <ExclamationTriangleIcon className="w-10 h-10" />
          </div>
        ) : undefined}
        <span className="text-lg font-semibold text-red-500">{header}</span>
        {body ? (<p className="font-normal text-stone-600 text-sm mx-8 my-2">{body}</p>) : undefined}
      </div>
    ) : undefined}
    </>
}