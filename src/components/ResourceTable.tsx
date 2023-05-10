import {
  type PlatformLink,
  type PaymentType,
  type AuditoryResource,
  type Skill,
  type SkillLevel,
  type Manufacturer,
} from "@prisma/client";
import {
  CurrencyDollarIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { translateEnumPlatform, translateEnumSkill } from "~/utils/enumWordLut";
import { type ChangeEvent } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { type ParsedUrlQuery, type ParsedUrlQueryInput } from "querystring";
import { useRouter } from "next/router";

export const ResourceInfo = ({
  resource,
  showMoreInfo,
}: {
  resource: AuditoryResource;
  showMoreInfo?: boolean;
}) => {
  const PriceIcons = ({ type }: { type: PaymentType }) => {
    switch (type) {
      case "FREE": {
        return (
          <div className="space-x-1 pt-2" title="Free">
            <span className="rounded-lg border border-neutral-900 bg-amber-100 px-2 py-[1px] italic text-black">
              free
            </span>
          </div>
        );
      }
      case "SUBSCRIPTION_MONTHLY": {
        <div className="space-x-1" title="Monthly recurring subscription">
          <ArrowPathRoundedSquareIcon className="inline h-6 w-6" />
          <CurrencyDollarIcon className="inline h-6 w-6 text-lime-800" />
        </div>;
      }
      case "SUBSCRIPTION_WEEKLY": {
        return (
          <div className="space-x-1" title="Weekly recurring subscription">
            <ArrowPathRoundedSquareIcon className="inline h-6 w-6" />
            <CurrencyDollarIcon className="inline h-6 w-6 text-lime-800" />
          </div>
        );
      }
    }
  };

  const PlatformInfo = ({
    platformLinks,
  }: {
    platformLinks: PlatformLink[];
  }) => {
    const platformsStr = platformLinks
      .map((platformLink) => {
        return translateEnumPlatform(platformLink.platform);
      })
      .join(", ");

    return <p>{platformsStr}</p>;
  };

  return (
    <div className="flex flex-row space-x-4 p-4">
      <div className="my-auto h-full">
        {showMoreInfo ? (
          <Link href={`resources/${resource.id}`}>
            <div className="flex w-20 flex-col justify-center space-y-2 sm:w-28">
              <Image
                className="w-full rounded-xl border border-neutral-400 bg-white drop-shadow-lg"
                src={`/resource_logos/${resource.icon}`}
                alt={`${resource.name} logo`}
                width={512}
                height={512}
              />
              <span className="block rounded-lg border border-neutral-900 bg-neutral-900 py-[1px] text-center text-white hover:bg-neutral-500">
                more info
              </span>
            </div>
          </Link>
        ) : (
          <div className="flex w-20 flex-col justify-center space-y-2 sm:w-28">
            <Image
              className="w-full rounded-xl border border-neutral-400 bg-white drop-shadow-lg"
              src={`/resource_logos/${resource.icon}`}
              alt={`${resource.name} logo`}
              width={512}
              height={512}
            />
          </div>
        )}
      </div>
      <div className="grid place-items-center">
        <div className="">
          <h2 className="text-xs italic text-gray-600">
            {resource.manufacturer?.name}
          </h2>
          <h1 className="text-xl font-bold">{resource.name}</h1>
          <PlatformInfo platformLinks={resource.platform_links} />
          <PriceIcons type={resource?.payment_options[0] ?? "FREE"} />
        </div>
      </div>
    </div>
  );
};

export const ResourceDescription = ({
  manufacturer,
  description,
}: {
  manufacturer: null | Manufacturer;
  description: string;
}) => {
  const ImportantNotice = () => {
    if (!manufacturer) {
      return <></>;
    }

    if (!manufacturer.required && !manufacturer.notice) {
      return <></>;
    }

    return (
      <div className="border-t-[4px] border-neutral-700 bg-neutral-600 p-2">
        <h3 className="text-sm font-bold text-neutral-100">IMPORTANT</h3>
        <p className="text-sm text-neutral-300">
          {manufacturer.notice
            ? manufacturer.notice
            : `This resource requires the patient to have a ${manufacturer.name} device`}
        </p>
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col">
      <ImportantNotice />
      <div className="p-2">
        <p>{description}</p>
      </div>
    </div>
  );
};

const ResourceEntry = ({ resource }: { resource: AuditoryResource }) => {
  const ResourceSkills = ({
    skills,
    skillLevels,
  }: {
    skills: Skill[];
    skillLevels: SkillLevel[];
  }) => {
    const SkillRanking = ({ skillLevels }: { skillLevels: SkillLevel[] }) => {
      return (
        <div className="flex flex-row space-x-2 overflow-x-auto">
          {skillLevels.includes("BEGINNER") ? (
            <div className="rounded-lg border-2 border-green-600 bg-green-300 px-[3px]">
              <h2 className="text-right text-sm italic text-neutral-900">
                Beginner
              </h2>
            </div>
          ) : undefined}
          {skillLevels.includes("INTERMEDIATE") ? (
            <div className="rounded-lg border-2 border-orange-600 bg-orange-300 px-[3px]">
              <h2 className="text-right text-sm italic text-neutral-900">
                Intermediate
              </h2>
            </div>
          ) : undefined}
          {skillLevels.includes("ADVANCED") ? (
            <div className="rounded-lg border-2 border-red-600 bg-red-300 px-[3px]">
              <h2 className="text-right text-sm italic text-neutral-900">
                Advanced
              </h2>
            </div>
          ) : undefined}
        </div>
      );
    };

    const Skill = ({ label }: { label: string }) => {
      return (
        <li className="flex flex-row space-x-2 px-2 py-[1px]">
          <ClipboardDocumentListIcon className="w-4" />
          <div className="inline">
            <h3>{label}</h3>
          </div>
        </li>
      );
    };

    const skillsComponents = skills.map((skill, index) => {
      return <Skill key={index} label={translateEnumSkill(skill)} />;
    });

    return (
      <div className="m-2 flex flex-col space-y-4">
        {skillsComponents.length > 0 ? (
          <div className="rounded-lg border border-neutral-900 bg-gray-100 drop-shadow">
            <ul className="divide-y-2">{skillsComponents}</ul>
          </div>
        ) : (
          <></>
        )}
        <SkillRanking skillLevels={skillLevels} />
      </div>
    );
  };

  return (
    <tr className="divide-x-[1px] divide-slate-400">
      <td className="max-w-xs">
        <ResourceInfo showMoreInfo resource={resource} />
      </td>
      <td className="w-1/4 align-top">
        <ResourceSkills
          skills={resource.skills}
          skillLevels={resource.skill_levels}
        />
      </td>
      <td className="hidden align-top md:table-cell">
        <ResourceDescription
          manufacturer={resource.manufacturer}
          description={resource.description}
        />
      </td>
    </tr>
  );
};

interface PagesNavigationProps {
  query?: ParsedUrlQuery;
  currentPage: number;
  pageCount: number;
  resultsPerPage: number;
}

const PagesNavigation = ({
  query,
  currentPage,
  pageCount,
  resultsPerPage,
}: PagesNavigationProps) => {
  const router = useRouter();
  const PageButton = ({ number }: { number: number }) => {
    const redirectQueryData: ParsedUrlQueryInput = { ...query };
    redirectQueryData.page = number;

    return (
      <li>
        <Link
          className={
            "py m-1 block rounded px-[9px] " +
            (currentPage !== number
              ? "hover:bg-neutral-400 hover:text-white"
              : "bg-neutral-800 text-white")
          }
          href={{ pathname: `/resources`, query: { ...redirectQueryData } }}
        >
          <span className={"text-center text-lg"}>{number}</span>
        </Link>
      </li>
    );
  };

  const pages = Array.from(Array(pageCount).keys()).map((pageNumber) => {
    return <PageButton key={pageNumber} number={pageNumber + 1} />;
  });

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!query) {
      router
        .push({
          pathname: "/resources",
          query: {
            perPage: event.target.value,
          },
        })
        .catch((reason) => {
          console.error(reason);
        });

      return;
    }

    query["perPage"] = event.target.value;
    router
      .push({
        pathname: "/resources",
        query: {
          ...query,
        },
      })
      .catch((reason) => {
        console.error(reason);
      });
  };

  return (
    <div className="flex flex-row justify-between bg-amber-100 py-2 pl-2 pr-4">
      <div className="flex w-64 flex-row space-x-2">
        <div className="relative inline-flex">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
            value={resultsPerPage}
            onChange={handleChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="m-auto">
          <h1 className="text-md"> Results Per Page</h1>
        </div>
      </div>
      <ul className="my-auto flex max-w-[10rem] flex-row overflow-x-auto rounded border border-gray-400 bg-white shadow hover:border-gray-500 sm:max-w-none">
        {pages}
      </ul>
    </div>
  );
};

const ResourceTable = ({
  resources,
  resourcesPerPage,
  currentPage,
  totalPages,
  query,
}: {
  resources: AuditoryResource[];
  resourcesPerPage: number;
  currentPage: number;
  totalPages: number;
  query: ParsedUrlQuery;
}) => {
  const resourceElements =
    resources.map((resource, index) => {
      return <ResourceEntry key={index} resource={resource} />;
    }) ?? [];

  return (
    <div className="w-full">
      <div className="mx-auto overflow-hidden overflow-hidden rounded-xl border border-neutral-400 drop-shadow-md">
        <PagesNavigation
          query={query}
          resultsPerPage={resourcesPerPage}
          currentPage={currentPage}
          pageCount={totalPages}
        />
        <table className="w-full table-fixed border-b border-neutral-400 bg-neutral-200">
          <thead className="bg-gradient-to-t from-neutral-900 to-neutral-700 drop-shadow-md">
            <tr>
              <th className="w-1/3 max-w-xs">
                <span className="block px-4 py-2 text-left text-gray-300">
                  Resource
                </span>
              </th>
              <th className="w-1/4 max-w-xs">
                <span className="block px-4 py-2 text-left text-gray-300">
                  Skills
                </span>
              </th>
              <th className="hidden md:table-cell">
                <span className="block px-4 py-2 text-left text-gray-300">
                  Description
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y-[1px] divide-slate-400 overflow-y-scroll">
            {resourceElements}
          </tbody>
        </table>
        {resources && resources.length > 4 ? (
          <PagesNavigation
            query={query}
            resultsPerPage={resourcesPerPage}
            currentPage={currentPage}
            pageCount={totalPages}
          />
        ) : undefined}
      </div>
    </div>
  );
};

export default ResourceTable;
