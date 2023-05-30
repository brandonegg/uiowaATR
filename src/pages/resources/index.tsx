import { LinkIcon } from "@heroicons/react/20/solid";
import { PrinterIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import router, { useRouter } from "next/router";
import ResourceTable from "~/components/ResourceTable";
import { api } from "~/utils/api";
import { parseQueryData } from "~/utils/parseSearchForm";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

/**
 * Quick extension of the resource table designed to query all elements so they can be printed
 */
const PrintResourceTable = ({
  totalResources,
  setLoaded,
}: {
  totalResources: number;
  setLoaded: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryData = parseQueryData(router.query);

  const resourceQuery = api.auditoryResource.search.useQuery({
    skip: 0,
    take: totalResources,
    ages: queryData.age,
    platforms: queryData.platforms,
    skill_levels: queryData.skill_levels,
    skills: queryData.skills,
  });

  useEffect(() => {
    if (resourceQuery.data) {
      setLoaded(true);
    }
  }, [resourceQuery, setLoaded]);

  if (!resourceQuery.data) {
    return <></>;
  }

  return (
    <ResourceTable
      resourcesPerPage={queryData.perPage}
      resources={resourceQuery.data.resources}
      totalPages={1}
      query={router.query}
      currentPage={1}
    />
  );
};

const Resources = () => {
  const router = useRouter();
  const [printMode, setPrintMode] = useState(false);
  const [printPreviewLoaded, setPrintPreviewLoaded] = useState(false);

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

  useEffect(() => {
    const handlePrint = (event: Event) => {
      if (!printMode) {
        event.preventDefault();
        setPrintMode(true);
      }
    };

    window.addEventListener("beforeprint", handlePrint);

    return () => {
      window.removeEventListener("beforeprint", handlePrint);
    };
  }, [printMode]);

  useEffect(() => {
    if (printPreviewLoaded && printMode) {
      window.onafterprint = () => {
        setPrintMode(false);
        setPrintPreviewLoaded(false);
      };
      window.print();
    }
  }, [printPreviewLoaded, printMode]);

  if (!resourceQuery.data) {
    return <></>;
  }

  const totalPages = Math.ceil(resourceQuery.data.count / queryData.perPage);

  return (
    <>
      <Header />
      <main className="mx-auto my-6 max-w-6xl md:px-4">
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
            <button
              onClick={() => {
                setPrintMode(true);
              }}
              className="inline-block space-x-2 rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md print:hidden"
            >
              <span className="inline">Print Results</span>
              <PrinterIcon className="inline w-6" />
            </button>
          </section>
        </div>
        {printMode ? (
          <PrintResourceTable
            setLoaded={setPrintPreviewLoaded}
            totalResources={resourceQuery.data.count}
          />
        ) : (
          <ResourceTable
            resourcesPerPage={queryData.perPage}
            resources={resourceQuery.data.resources}
            totalPages={totalPages}
            query={router.query}
            currentPage={currentPage}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Resources;
