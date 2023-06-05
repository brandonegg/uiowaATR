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
      showPageBar={false}
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
  const [printPreviewLoaded, setPrintPreviewLoaded] = useState(false);

  const queryData = parseQueryData(router.query);

  const resourceQuery = api.auditoryResource.search.useQuery({
    skip: (queryData.page - 1) * queryData.perPage,
    take: queryData.perPage,
    ages: queryData.age,
    platforms: queryData.platforms,
    skill_levels: queryData.skill_levels,
    skills: queryData.skills,
  });

  useEffect(() => {
    if (printPreviewLoaded) {
      window.onafterprint = () => {
        router.back();
      };
      window.print();
    }
  }, [printPreviewLoaded, router]);

  if (!resourceQuery.data) {
    return <></>;
  }

  return (
    <>
      <Header />
      <main className="mx-auto my-6 max-w-6xl md:px-4">
        <PrintResourceTable
          setLoaded={setPrintPreviewLoaded}
          totalResources={resourceQuery.data.count}
        />
      </main>
      <Footer />
    </>
  );
};

export default Resources;
