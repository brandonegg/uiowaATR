import Head from "next/head";
import { LinkIcon } from '@heroicons/react/20/solid';
import Link from "next/link";
import { useRouter } from "next/router";
import ResourceTable from "~/components/ResourceTable";
import { api } from "~/utils/api";
import { parseQueryData } from "~/utils/parseSearchForm";

const Resources = () => {
  const router = useRouter()

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
  
  if (!resourceQuery.data) {
      return <></>
  }

  const totalPages = Math.ceil(resourceQuery.data.count / queryData.perPage);

  return (
    <>
      <main className="my-6 md:px-4 max-w-6xl mx-auto">
        <div className="sm:mb-4 mb-2 sm:p-4 p-2 space-y-2">
          <h1 className="text-3xl font-bold">All Resources</h1>
          <div className="">
            <p className="inline">Fill out the </p>
            <Link href="/resources/search"
                  className="hover:bg-neutral-900 hover:text-white inline rounded-lg bg-neutral-200 border border-neutral-800 px-2 py-[4px]">
              search form
              <LinkIcon className="w-4 inline" />
            </Link>
            <p className="inline"> for a list of auditory training resource recommendations.</p>
          </div>
        </div>
        <ResourceTable resourcesPerPage={queryData.perPage} resources={resourceQuery.data.resources} totalPages={totalPages} query={router.query} currentPage={currentPage} />
      </main>
    </>
  );
}

export default Resources;