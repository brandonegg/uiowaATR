import { LinkIcon } from "@heroicons/react/20/solid";
import { PrinterIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import ResourceTable from "~/components/ResourceTable";
import { api } from "~/utils/api";
import { parseQueryData } from "~/utils/parseSearchForm";
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";
import { type AuditoryResource } from "@prisma/client";
import { QueryWaitWrapper } from "~/components/LoadingWrapper";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import { AdminActionLink } from "~/components/admin/common";

const PageHeader = ({ printLink }: { printLink: string }) => {
  return (
    <div className="mb-2 flex flex-row justify-between p-2 print:hidden sm:mb-4 sm:p-4">
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">All Resources</h1>
        <div className="">
          <p className="inline">Fill out the </p>
          <Link
            href="/resources/search"
            className="inline rounded-lg border border-neutral-800 bg-neutral-200 px-2 py-[4px] hover:bg-neutral-900 hover:text-white"
          >
            search form
            <LinkIcon className="inline w-4" />
          </Link>
          <p className="inline">
            {" "}
            for a list of auditory training resource recommendations.
          </p>
        </div>
      </section>

      <section className="mt-auto">
        <Link
          href={printLink}
          className="inline-block whitespace-nowrap rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md print:hidden sm:space-x-2"
        >
          <span className="hidden sm:inline-block">Print Results</span>
          <PrinterIcon className="inline-block w-6" />
        </Link>
      </section>
    </div>
  );
};

const Resources = () => {
  const router = useRouter();

  const queryData = parseQueryData(router.query);
  const currentPage = queryData.page;

  const resourceQuery = api.auditoryResource.search.useQuery({
    skip: (queryData.page - 1) * queryData.perPage,
    take: queryData.perPage,
    ages: queryData.age,
    platforms: queryData.platforms,
    skill_levels: queryData.skill_levels,
    skills: queryData.skills,
  });

  const printQueryStr =
    router.asPath.split("?").length === 2
      ? router.asPath.split("?").at(-1) ?? ""
      : "";
  const printLink = `${router.route}/print?${printQueryStr}`;

  const ConditionalTable = (data: {
    count: number;
    resources: AuditoryResource[];
  }) => {
    const totalPages = Math.ceil(data.count / queryData.perPage);

    return (
      <ResourceTable
        resourcesPerPage={queryData.perPage}
        resources={data.resources}
        totalPages={totalPages}
        query={router.query}
        currentPage={currentPage}
      />
    );
  };

  return (
    <HeaderFooterLayout>
      <AdminBarLayout
        actions={[
          <AdminActionLink
            key="cancel"
            symbol={<PlusCircleIcon className="w-4" />}
            label="Create New"
            href={`/resources/create`}
          />,
        ]}
      >
        <div className="mx-auto mb-12 mt-6 w-full max-w-6xl md:px-2">
          <PageHeader printLink={printLink} />

          <QueryWaitWrapper query={resourceQuery} Render={ConditionalTable} />
        </div>
      </AdminBarLayout>
    </HeaderFooterLayout>
  );
};

export default Resources;
