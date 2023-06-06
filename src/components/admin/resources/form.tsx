import { PaymentType, SkillLevel, Skill } from "@prisma/client";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  MultiSelector,
  MultiSelectorMany,
  MultiSelectorOption,
  SelectedUniqueContext,
  SimpleSelectorManyOption,
} from "../../forms/selectors";
import { InfoInputLine } from "~/components/forms/textInput";
import { PriceIcon } from "~/prices/Icons";
import { useState } from "react";
import { type UseFormRegister } from "react-hook-form";
import { type RouterInputs } from "~/utils/api";

export type ResourceUpdateInput = RouterInputs["auditoryResource"]["update"];

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
      <h1 className="mb-2 border-b border-neutral-400 text-xl">Links</h1>
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

const PaymentTypeOption = ({
  type,
  label,
}: {
  type: PaymentType;
  label: string;
}) => {
  return (
    <MultiSelectorOption value={type}>
      <SelectedUniqueContext.Consumer>
        {(selected) => (
          <div
            className={
              (selected === type ? "bg-stone-800" : "bg-white") +
              " flex flex-row space-x-2 whitespace-nowrap rounded-xl border border-neutral-400 py-[1px] pl-[1px] pr-2"
            }
          >
            <span className="rounded-[10px] bg-white p-1">
              <PriceIcon type={type} />
            </span>
            <span
              className={
                (selected === type ? "text-white" : "text black") +
                " my-auto inline-block whitespace-nowrap text-sm"
              }
            >
              {label}
            </span>
          </div>
        )}
      </SelectedUniqueContext.Consumer>
    </MultiSelectorOption>
  );
};

/**
 * Resource summary inputs - ie description, manufacturer, etc.
 */
function ResourceSummarySubForm({
  register,
  resource,
}: {
  register: UseFormRegister<ResourceUpdateInput>;
  resource?: ResourceUpdateInput;
}) {
  return (
    <div className="space-y-4 px-4">
      <div className="flex flex-row space-x-4 sm:mt-4">
        <div className="flex w-20 flex-col justify-center space-y-2 sm:w-28">
          <SelectImageInput file={resource?.icon} />
        </div>
        <div className="flex flex-col justify-center overflow-hidden rounded-xl border border-neutral-400 bg-white drop-shadow-lg sm:w-[300px] md:w-[400px]">
          <h2 className="border-b border-neutral-300 px-2 text-center font-semibold">
            Resource Details
          </h2>
          <span className="text-md">
            <InfoInputLine
              details={register("manufacturer.name", { required: true })}
              placeholder="manufacturer"
              value={resource?.manufacturer?.name ?? ""}
              hint="manufacturer"
            />
          </span>
          <InfoInputLine
            details={register("name", { required: true })}
            placeholder="name"
            value={resource?.name ?? ""}
            hint="name"
          />
          <span className="my-1 block w-full text-center text-xs italic text-neutral-400">
            Edit the fields above
          </span>
        </div>
      </div>
      <MultiSelector
        label="Price Category"
        defaultValue={
          resource?.payment_options?.toString() ?? PaymentType.FREE.toString()
        }
      >
        <PaymentTypeOption type={PaymentType.FREE} label="Free" />
        <PaymentTypeOption
          type={PaymentType.SUBSCRIPTION_MONTHLY}
          label="Monthly Subscription"
        />
        <PaymentTypeOption
          type={PaymentType.SUBSCRIPTION_WEEKLY}
          label="Weekly Subscription"
        />
      </MultiSelector>

      <MultiSelectorMany
        label="Skill Level"
        defaultValues={resource?.skill_levels ?? []}
      >
        {Object.values(SkillLevel).map((skillLevel, index) => {
          return (
            <SimpleSelectorManyOption
              key={index}
              type={skillLevel}
              label={skillLevel.toLowerCase()}
            />
          );
        })}
      </MultiSelectorMany>

      <MultiSelectorMany
        label="Skills Covered"
        defaultValues={resource?.skills ?? []}
      >
        {Object.values(Skill).map((skill, index) => {
          return (
            <SimpleSelectorManyOption
              key={index}
              type={skill}
              label={skill.toLowerCase()}
            />
          );
        })}
      </MultiSelectorMany>
    </div>
  );
}

const ResourceDescriptionSubForm = ({
  register,
  resource,
}: {
  register: UseFormRegister<ResourceUpdateInput>;
  resource?: ResourceUpdateInput;
}) => {
  const [dropdownOpen, toggleDropdown] = useState(false);

  return (
    <div className="mx-4">
      <label className="text-md font-semibold">Description</label>
      <div className="relative mt-4 overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 text-left shadow">
        <button
          type="button"
          onClick={() => {
            toggleDropdown(!dropdownOpen);
          }}
          className="group flex w-full flex-row justify-between border-b-[4px] border-neutral-700 bg-neutral-600 p-2 align-middle"
        >
          <section className="space-x-2">
            <h3 className="inline text-sm font-bold text-neutral-100">
              IMPORTANT
            </h3>
            <span className="inline italic text-neutral-300">open to edit</span>
          </section>
          <ChevronDownIcon className="mx-2 my-auto w-4 text-white group-hover:animate-bounce" />
        </button>
        <textarea
          {...register("description", { required: true })}
          className={
            "h-48 w-full rounded-b-xl p-2" + (dropdownOpen ? " hidden" : "")
          }
        />
        <textarea
          {...register("manufacturer.notice")}
          className={
            "h-48 w-full rounded-b-xl bg-neutral-800 p-2 text-white" +
            (dropdownOpen ? "" : " hidden")
          }
        />
      </div>
    </div>
  );
};

const ResourceForm = ({
  resource,
  register,
  error,
}: {
  resource?: ResourceUpdateInput;
  register: UseFormRegister<ResourceUpdateInput>;
  error?: string;
}) => {
  return (
    <form className="mx-auto flex max-w-2xl flex-col flex-col-reverse py-1 sm:flex-row sm:divide-x sm:py-4">
      <div className="my-5 mr-4 flex flex-col text-lg font-bold">
        <ResourceLinkSubForm /> {/** //resource={resource} /> */}
      </div>
      <div>
        <h1 className="mx-4 mb-2 border-b border-neutral-400 text-xl font-bold sm:hidden">
          General
        </h1>
        <div className="justify-left mx-auto flex max-w-lg flex-col space-y-4 pb-5">
          <ResourceSummarySubForm register={register} resource={resource} />
          <ResourceDescriptionSubForm register={register} resource={resource} />
        </div>
      </div>
    </form>
  );
};

export { ResourceForm };
