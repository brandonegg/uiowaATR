import { Platform, RangeInput, Skill, SkillLevel } from "@prisma/client";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import ResourceTable from "~/components/ResourceTable";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

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

interface ViewDetails {
  page?: number;
}

interface SearchQuery {
  age?: RangeInput,
  platforms?: Platform[],
  skill_levels?: SkillLevel[],
  skills?: Skill[],
}

const parseQueryData = (query: ParsedUrlQuery): SearchQuery & ViewDetails => {
  const view = {
    page: Number(query["page"] ?? 1),
  }
  const filter: SearchQuery = {};

  if (query["ages"]) {
    const ages: number[] = [];

    if (Array.isArray(query["ages"])) {
      const validRanges = query["ages"].filter((value) => {
        return value.split("-").length == 2;
      });

      validRanges.forEach((value) => {
        const split = value.split("-");
        ages.push(Number(split[0]));
        ages.push(Number(split[1]));
      });
    } else {
      const split = query["ages"].split("-");
      ages.push(Number(split[0]));
      ages.push(Number(split[1]));
    }

    filter.age = {
      min: Math.min(...ages),
      max: Math.max(...ages),
    }
  }

  if (query["platforms"])

  return {...filter, ...view};
}

const Resources = () => {
  const router = useRouter()

  const queryData = parseQueryData(router.query);
  const currentPage = queryData.page;

  const query = api.auditoryResource.getAll.useQuery();
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