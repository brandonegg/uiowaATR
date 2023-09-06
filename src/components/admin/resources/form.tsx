import {
  PaymentType,
  SkillLevel,
  Skill,
  type PlatformLink,
  Platform,
} from "@prisma/client";
import {
  PencilSquareIcon,
  XCircleIcon as XCircleSolid,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  TrashIcon,
  XCircleIcon as XCircleOutline,
} from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  DropdownSelector,
  MultiSelectorMany,
  MultiSelectorOption,
  SelectedManyContext,
  SimpleSelectorManyOption,
} from "../../forms/selectors";
import { GenericInput, InfoInputLine } from "~/components/forms/textInput";
import { PriceIcon } from "~/prices/Icons";
import {
  type Dispatch,
  type SetStateAction,
  useState,
  useEffect,
  type ChangeEvent,
} from "react";
import {
  type UseFormReturn,
  FormProvider,
  useFormContext,
  useForm,
} from "react-hook-form";
import Modal from "react-modal";
import { type RouterInputs } from "~/utils/api";
import { PlatformLinkButton } from "~/pages/resources/[id]";
import { ResourcePhoto } from "~/components/ResourcePhoto";
import { FieldLabel } from "~/components/forms/inputLabel";

// Required for accessibility
// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
Modal.setAppElement("#__next");

export type ResourceUpdateInput = RouterInputs["auditoryResource"]["update"];
export type ResourceCreateInput = RouterInputs["auditoryResource"]["create"];

/**
 * Renders the image selector for resource form.
 *
 * File needs to be path relative to resource_logos/
 */
const SelectImageInput = () => {
  const { setValue, setError, watch } = useFormContext<ResourceUpdateInput>();
  const name = watch("name");
  const photo = watch("photo");
  const icon = watch("icon");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result || !(reader.result instanceof ArrayBuffer)) {
        setError("photo.data", { message: "Failed uploading the photo data." });
        return;
      }

      setValue("photo", {
        name: file.name,
        data: Buffer.from(reader.result),
      });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <label
        htmlFor="resource-image-file"
        className="bg-whit group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-400 drop-shadow-lg"
      >
        {photo ? (
          <>
            <ResourcePhoto
              name={name ?? "unknown resource logo"}
              photo={photo}
              src={icon}
            />
            <div className="absolute bottom-0 left-0 right-0 top-0 hidden place-items-center group-hover:grid group-hover:bg-white/70">
              <PencilSquareIcon className="w-16 text-black/50" />
            </div>
          </>
        ) : (
          <div className="grid aspect-square place-items-center hover:bg-white/70">
            <PencilSquareIcon className="h-16 w-16 text-black/50" />
          </div>
        )}
      </label>
      <input
        onChange={onChange}
        accept="image/*"
        id="resource-image-file"
        type="file"
        className="hidden"
      ></input>
    </>
  );
};

const LinkModal = ({
  isOpen,
  setOpen,
}: {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { setValue, getValues } = useFormContext<ResourceUpdateInput>();
  const {
    register,
    handleSubmit,
    setValue: setLocalFormValue,
  } = useForm<PlatformLink>();
  const platformTypeOptions = [
    {
      label: "Website",
      value: Platform.WEBSITE,
    },
    {
      label: "iOS App",
      value: Platform.APP_IOS,
    },
    {
      label: "Android App",
      value: Platform.APP_ANDROID,
    },
    {
      label: "PDF Document",
      value: Platform.PDF,
    },
  ];

  const onSubmit = (data: PlatformLink) => {
    const values = getValues().platform_links ?? [];

    values.push(data);
    setValue("platform_links", values);
    setOpen(false);
    setLocalFormValue("platform", Platform.WEBSITE);
    setLocalFormValue("link", "");
  };

  return (
    <Modal
      style={{
        content: {
          width: "400px",
          height: "300px",
          margin: "auto",
          padding: 0,
          overflow: "hidden",
          boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
          borderRadius: ".8rem",
          border: ".1rem solid #d4d4d4",
        },
        overlay: {
          zIndex: 60,
        },
      }}
      isOpen={isOpen}
      contentLabel="link details"
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <div className="h-full bg-neutral-200">
        <section className="relative bg-gradient-to-t from-neutral-800 to-neutral-600 p-2 drop-shadow-xl">
          <h1 className="text-center text-lg font-bold text-neutral-200">
            Platform Details
          </h1>

          <button
            onClick={() => {
              setOpen(false);
            }}
            type="button"
            className="group absolute bottom-0 right-0 top-0 h-full px-4"
          >
            <XCircleSolid className="hidden h-6 w-6 text-white group-hover:block" />
            <XCircleOutline className="block h-6 w-6 text-white group-hover:hidden" />
          </button>
        </section>

        <form
          onSubmit={(event) => {
            handleSubmit(onSubmit)(event).catch((error) => {
              console.error(error);
            });
          }}
          className="space-y-4 p-4"
        >
          <DropdownSelector
            options={platformTypeOptions}
            label="Type"
            details={register("platform", { required: true })}
          />
          <GenericInput
            placeholder="platform URL"
            label="Link"
            type="text"
            details={register("link", { required: true })}
          />
          <section className="py-4">
            <button
              type="submit"
              className="mx-auto block w-fit rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
            >
              <span className="hidden sm:inline-block">Create</span>
            </button>
          </section>
        </form>
      </div>
    </Modal>
  );
};

/**
 * Contains the input fields for editing the links for a resource
 * @returns
 */
const ResourceLinkSubForm = () => {
  const { setValue, getValues, watch } = useFormContext<ResourceUpdateInput>();
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [selectedLinks, setSelectedLinks] = useState<PlatformLink[]>(
    getValues().platform_links ?? []
  );

  useEffect(() => {
    watch((value, { name }) => {
      if (name === "platform_links") {
        const validLinks = value.platform_links?.filter((value) => {
          return value?.link && value?.platform;
        }) as unknown as PlatformLink[];
        setSelectedLinks(validLinks);
      }
    });
  }, [watch]);

  const removeLink = (key: number) => {
    const newLinks = [...selectedLinks];
    newLinks.splice(key, 1);

    setValue("platform_links", newLinks);
  };

  return (
    <div className="mx-4">
      <LinkModal isOpen={linkModalOpen} setOpen={setLinkModalOpen} />
      <div className="mb-2 flex flex-row justify-between space-x-2 border-b border-neutral-400">
        <h1 className="text-xl">Links</h1>
        <button
          type="button"
          className="flex h-6 flex-row items-center rounded-full border border-neutral-900 bg-neutral-200 px-2 leading-tight drop-shadow-sm hover:bg-yellow-400"
          onClick={() => {
            setLinkModalOpen(!linkModalOpen);
          }}
        >
          <span className="text-sm font-normal leading-3 text-neutral-700">
            Add
          </span>
          <PlusIcon className="w-4 leading-3" />
        </button>
      </div>

      <div className="mx-auto flex w-48 flex-col space-y-2">
        {selectedLinks.map((link, index) => {
          return (
            <section key={index} className="flex flex-row space-x-2">
              <span className="grow-1 w-full">
                <PlatformLinkButton platformLink={link} />
              </span>
              <button
                onClick={() => {
                  removeLink(index);
                }}
                type="button"
                className="my-auto h-9 w-9 grow-0 rounded-xl border border-red-100 bg-red-300 p-1 hover:bg-red-500"
              >
                <TrashIcon className="m-auto w-6" />
              </button>
            </section>
          );
        })}
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
      <SelectedManyContext.Consumer>
        {(selected) => (
          <div
            className={
              (selected.includes(type) ? "bg-stone-800" : "bg-white") +
              " flex flex-row space-x-2 whitespace-nowrap rounded-xl border border-neutral-400 py-[1px] pl-[1px] pr-2"
            }
          >
            <span className="rounded-[10px] bg-white p-1">
              <PriceIcon type={type} />
            </span>
            <span
              className={
                (selected.includes(type) ? "text-white" : "text black") +
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
function ResourceSummarySubForm({
  resource,
}: {
  resource?: ResourceUpdateInput;
}) {
  const { register } = useFormContext<ResourceUpdateInput>();

  return (
    <div className="space-y-4 px-4">
      <div className="flex flex-row space-x-4 sm:mt-4">
        <div className="flex w-20 flex-col justify-center space-y-2 sm:w-28">
          <SelectImageInput />
        </div>
        <div className="flex flex-col justify-center overflow-hidden rounded-xl border border-neutral-400 bg-white drop-shadow-lg sm:w-[300px] md:w-[400px]">
          <h2 className="border-b border-neutral-300 px-2 text-center font-semibold">
            Resource Details
          </h2>
          <span className="text-md">
            <InfoInputLine
              details={register("manufacturer.name", {
                required: "Field required",
              })}
              placeholder="manufacturer"
              hint="manufacturer"
              value={resource?.name}
            />
          </span>
          <InfoInputLine
            details={register("name", { required: "Field required" })}
            placeholder="name"
            value={resource?.name}
            hint="name"
          />
          <span className="my-1 block w-full text-center text-xs italic text-neutral-400">
            Edit the fields above
          </span>
        </div>
      </div>

      <div>
        <FieldLabel
          heading="Age Range"
          subheading="Specify the minimum and maximum age range supported by the resource"
        />
        <div className="mt-4 flex flex-row space-x-4">
          <GenericInput
            type="number"
            placeholder="minimum age"
            details={register("ages.min", {
              required: "Field required",
              valueAsNumber: true,
            })}
          />
          <span className="text-xl">-</span>
          <GenericInput
            type="number"
            placeholder="maximum age"
            details={register("ages.max", {
              required: "Field required",
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      <MultiSelectorMany
        details={register("payment_options", { required: "Field required" })}
        label="Price Category"
        defaultValues={resource?.payment_options ?? []}
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
      </MultiSelectorMany>

      <MultiSelectorMany
        details={register("skill_levels", { required: "Field required" })}
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
        details={register("skills", { required: "Field required" })}
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

const ResourceDescriptionSubForm = () => {
  const [dropdownOpen, toggleDropdown] = useState(false);
  const { register } = useFormContext();

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
          {...register("description", { required: "Field required" })}
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
  methods,
  resource,
  error,
}: {
  resource?: ResourceUpdateInput;
  methods: UseFormReturn<ResourceUpdateInput>;
  error?: string;
}) => {
  return (
    <FormProvider {...methods}>
      {error ? (
        <h1 className="text-center font-semibold text-red-600">
          Error Updating Resource:{" "}
          <span className="font-normal text-red-400">{error}</span>
        </h1>
      ) : undefined}
      <form className="mx-auto flex max-w-2xl flex-col flex-col-reverse py-1 sm:flex-row sm:divide-x sm:py-4">
        <div className="my-5 mr-4 flex flex-col text-lg font-bold">
          <ResourceLinkSubForm />
        </div>
        <div>
          <h1 className="mx-4 mb-2 border-b border-neutral-400 text-xl font-bold sm:hidden">
            General
          </h1>
          <div className="justify-left mx-auto flex max-w-lg flex-col space-y-4 pb-5">
            <ResourceSummarySubForm resource={resource} />
            <ResourceDescriptionSubForm />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export { ResourceForm };
