import { type AuditoryResource } from "@prisma/client";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

/**
 * Renders the image selector for resource form.
 *
 * File needs to be path relative to resource_logos/
 */
const SelectImageInput = ({ file }: { file?: string }) => {
  return (
    <>
      <label
        htmlFor="resource-image-file"
        className="bg-whit group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-400 drop-shadow-lg"
      >
        <Image
          className="w-fulle"
          src={`/resource_logos/${file ?? ""}`}
          alt={`resource logo`}
          width={512}
          height={512}
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 hidden place-items-center group-hover:grid group-hover:bg-white/70">
          <PencilSquareIcon className="w-16 text-black/50" />
        </div>
      </label>
      <input
        accept="image/*"
        id="resource-image-file"
        type="file"
        className="hidden"
      ></input>
    </>
  );
};

/**
 * Contains the input fields for editing the links for a resource
 * @returns
 */
const ResourceLinkSubForm = ({}) => {
  return (
    <div className="mx-4">
      <h1 className="mb-2 border-b border-neutral-400">Links</h1>
      <div className="mx-auto flex w-48 flex-col space-y-2">
        {/** Insert existing links here */}
        <button type="button">
          <div className="flex h-14 flex-row space-x-2 rounded-lg border-2 border-neutral-900 bg-amber-300 px-2 align-middle hover:bg-amber-200">
            <span className="my-auto text-sm font-bold">Add link</span>
          </div>
        </button>
      </div>
    </div>
  );
};

/**
 * Single line input for the fields found to the right of the
 * resource logo.
 */
const InfoInputLine = ({
  value,
  placeholder,
}: {
  value: string;
  placeholder: string;
}) => {
  const [currentValue, setCurrentValue] = useState<string>(value);

  return (
    <input
      onChange={(event) => {
        setCurrentValue(event.target.value);
      }}
      placeholder={placeholder}
      value={currentValue}
      type="text"
      className="w-full border-b border-neutral-300 px-2"
    />
  );
};

/**
 * Resource summary inputs - ie description, manufacturer, etc.
 */
const ResourceSummarySubForm = ({
  resource,
}: {
  resource?: AuditoryResource;
}) => {
  return (
    <>
      <div className="flex flex-row space-x-4 p-4">
        <div className="flex w-20 flex-col justify-center space-y-2 sm:w-28">
          <SelectImageInput file={resource?.icon} />
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-neutral-400 bg-white drop-shadow-lg">
          <span className="text-sm">
            <InfoInputLine
              placeholder="manufacturer"
              value={resource?.manufacturer?.name ?? ""}
            />
          </span>
          <InfoInputLine placeholder="name" value={resource?.name ?? ""} />
          <span className="my-2 block w-full text-center text-sm italic text-neutral-400">
            Edit the fields above
          </span>
        </div>
      </div>
      <div className="mx-4 overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 text-left shadow"></div>
      <div className="ml-4 mr-auto mt-4 rounded-lg border-2 border-neutral-900 bg-neutral-600">
        <span className="px-2 py-2 text-sm text-neutral-200">
          Ages {/** Age range here */}
        </span>
      </div>
    </>
  );
};

const ResourceForm = ({ resource }: { resource?: AuditoryResource }) => {
  return (
    <div className="mx-auto flex max-w-2xl flex-col flex-col-reverse divide-x py-4 sm:flex-row">
      <div className="my-5 mr-4 flex flex-col justify-end text-lg font-bold">
        <ResourceLinkSubForm /> {/** //resource={resource} /> */}
      </div>
      <div className="justify-left flex flex-col pb-5">
        <ResourceSummarySubForm resource={resource} />
      </div>
    </div>
  );
};

export { ResourceForm };
