import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import Head from "next/head";
import Link from "next/link";
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

const Resources = () => {
  const query = api.auditoryResource.getAll.useQuery();

  return (
    <>
      <Head>
        <title>ATR</title>
        <meta name="description" content="University of Iowa Center for Auditory Training Resources" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="my-6 sm:px-4 max-w-6xl mx-auto">
          <div className="flex flex-row justify-between mb-4 p-4 bg-amber-100 rounded-xl border border-neutral-300">
            <h1 className="font-bold">Pages</h1>
            <ul className="flex flex-row">
              <li>
                <Link href="" />
              </li>
            </ul>
          </div>
          <ResourceTable resources={query.data} />
        </div>
      </main>
    </>
  );
}

export default Resources;