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

  const query = api.auditoryResource.search.useQuery({
    ages: queryData.age,
    platforms: queryData.platforms,
    skill_levels: queryData.skill_levels,
    skills: queryData.skills,
  });

  if (!query.data) {
    return <></>
  }

  return (
    <>
      <Head>
        <title>ATR</title>
        <meta name="description" content="University of Iowa Center for Auditory Training Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="my-6 sm:px-4 max-w-6xl mx-auto">
        <div className="mb-4 p-4 space-y-2">
          <h1 className="text-3xl font-bold">All Resources</h1>
          <div className="">
            <p className="inline">Fill out the </p>
            <Link href="/resources/survey"
                  className="hover:bg-neutral-900 hover:text-white inline rounded-lg bg-neutral-200 border border-neutral-800 px-2 py-[4px]">
              survey
              <LinkIcon className="w-4 inline" />
            </Link>
            <p className="inline"> for specific resource recommendations.</p>
          </div>
        </div>
        <ResourceTable query={router.query} resources={query.data} currentPage={currentPage} />
      </main>
    </>
  );
}

export default Resources;