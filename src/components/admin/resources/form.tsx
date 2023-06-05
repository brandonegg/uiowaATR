import { PaymentType, type AuditoryResource, SkillLevel } from "@prisma/client";
import Image from "next/image";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  MultiSelector,
  MultiSelectorMany,
  MultiSelectorOption,
  SelectedManyContext,
  SelectedUniqueContext,
} from "../../forms/selectors";
import { InfoInputLine } from "~/components/forms/textInput";
import { PriceIcon } from "~/prices/Icons";

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
      <div className="flex mx-auto w-48 flex-col space-y-2">
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

const SkillLevelOption = ({
  type,
  label,
}: {
  type: SkillLevel;
  label: string;
}) => {
  return (
    <MultiSelectorOption value={type}>
      <SelectedManyContext.Consumer>
        {(selected) => (
          <div
            className={
              (selected.includes(type.toString())
                ? "bg-stone-800"
                : "bg-white") +
              " flex flex-row space-x-2 whitespace-nowrap rounded-xl border border-neutral-400 px-2 py-1"
            }
          >
            <span
              className={
                (selected.includes(type.toString())
                  ? "text-white"
                  : "text black") +
                " my-auto inline-block whitespace-nowrap text-sm"
              }
            >
              {label}
            </span>
          </div>
        )}
      </SelectedManyContext.Consumer>
    </MultiSelectorOption>
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
    <div className="space-y-4 px-4">
      <div className="flex flex-row space-x-4 pt-4">
        <div className="flex w-20 flex-col justify-center space-y-2 sm:w-28">
          <SelectImageInput file={resource?.icon} />
        </div>
        <div className="w-full overflow-hidden rounded-xl border border-neutral-400 bg-white drop-shadow-lg">
          <span className="text-md">
            <InfoInputLine
              placeholder="manufacturer"
              value={resource?.manufacturer?.name ?? ""}
              hint="manufacturer"
            />
          </span>
          <InfoInputLine
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
          resource?.payment_options.toString() ?? PaymentType.FREE.toString()
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
        <SkillLevelOption type={SkillLevel.BEGINNER} label="beginner" />
        <SkillLevelOption type={SkillLevel.INTERMEDIATE} label="intermediate" />
        <SkillLevelOption type={SkillLevel.ADVANCED} label="advanced" />
      </MultiSelectorMany>
    </div>
  );
};

// TODO:
// const ResourceDescriptionSubForm = ({
//   resource,
// }: {
//   resource?: AuditoryResource;
// }) => {
//   return <div></div>;
// };

const ResourceForm = ({ resource }: { resource?: AuditoryResource }) => {
  return (
    <div className="flex mx-auto max-w-2xl flex-col flex-col-reverse py-1 sm:flex-row sm:divide-x sm:py-4">
      <div className="flex my-5 mr-4 flex-col justify-end text-lg font-bold">
        <ResourceLinkSubForm /> {/** //resource={resource} /> */}
      </div>
      <div className="justify-left flex mx-auto max-w-lg flex-col pb-5">
        <ResourceSummarySubForm resource={resource} />
      </div>
    </div>
  );
};

export { ResourceForm };
