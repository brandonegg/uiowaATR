import { Platform, RangeInput, Skill, SkillLevel } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import ResourceTable from "~/components/ResourceTable";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { parseQueryData } from "~/utils/parseSearchForm";

/*
export async function getStaticProps() {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: null,
    },
  });
  await ssg.auditoryResource.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
    revalidate: 1,
  };
}
*/

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
      <main>
        <div className="my-6 sm:px-4 max-w-6xl mx-auto">
          <ResourceTable resources={query.data} currentPage={currentPage} />
        </div>
      </main>
    </>
  );
}

export default Resources;