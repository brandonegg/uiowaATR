import { type InferGetStaticPropsType, type GetStaticPropsContext } from "next";
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";

const ResourceViewPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { id } = props;
  const resourceQuery = api.auditoryResource.byId.useQuery({ id });

  return <>
    <div>
      {resourceQuery.data?.name ?? 'loading..'}
    </div>
  </>
};
  
export const getStaticPaths = async () => {
  //const amountPerPage = 10;
  const resources = (await prisma.auditoryResource.findMany({
    select: {
      id: true,
    }
  }));
  //const pages = Math.ceil(objectCount / amountPerPage);

  return {
    paths: resources.map((resource) => ({
      params: {
        id: resource.id,
      }
    })),
    fallback: 'blocking',
  }
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>,
) {
  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: null,
    },
  });
  const id = context.params?.id as string;

  await ssg.auditoryResource.byId.prefetch({id});

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

export default ResourceViewPage