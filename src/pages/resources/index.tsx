import { LinkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import ResourceTable from "~/components/ResourceTable";
import { api } from "~/utils/api";
import { parseQueryData } from "~/utils/parseSearchForm";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

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

  if (!resourceQuery.data) {
    return <></>;
  }

  const totalPages = Math.ceil(resourceQuery.data.count / queryData.perPage);

  return (
    <>
      <Header />
      <main className="my-6 mx-auto max-w-6xl md:px-4">
        <div className="mb-2 space-y-2 p-2 sm:mb-4 sm:p-4">
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
        </div>
        <ResourceTable
          resourcesPerPage={queryData.perPage}
          resources={resourceQuery.data.resources}
          totalPages={totalPages}
          query={router.query}
          currentPage={currentPage}
        />
      </main>
      <Footer />
    </>
  );
};

export default Resources;
