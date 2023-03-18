import { type InferGetStaticPropsType, type GetStaticPropsContext } from "next";
import { GlobeAltIcon } from '@heroicons/react/24/solid';
import { createProxySSGHelpers } from '@trpc/react-query/ssg';
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { ResourceInfo } from "~/components/ResourceTable";
import { type PlatformLink } from "@prisma/client";
import Image from 'next/image';
import Link from "next/link";

export const getStaticPaths = async () => {
  const resources = (await prisma.auditoryResource.findMany({
    select: {
      id: true,
    }
  }));

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

const PlatformLinkButton = ({platformLink}: {platformLink: PlatformLink}) => {
  switch (platformLink.platform) {
    case "APP_ANDROID": {
      return (
        <Link href={platformLink.link}>
          <a target="_blank" rel="noopener noreferrer">
            <Image className="w-full" src={`/google-play-badge.png`} alt={`Download on the Apple AppStore`} width={512} height={216}/>
          </a>
        </Link>
      )
    }
    case "APP_IOS": {
      return (
        <Link href={platformLink.link}>
          <Image className="w-full" src={`/app-store-badge.png`} alt={`Download on the Apple AppStore`} width={512} height={216}/>
        </Link>
      )
    }
    case "PDF": {
      return (
        <Link href={platformLink.link}>
          <div className="bg-amber-300 border-2 px-2 h-12 align-middle border-neutral-900 rounded-lg flex flex-row space-x-2">
            <GlobeAltIcon className="w-6" />
            <span className="font-bold text-sm my-auto">
              Website
            </span>
          </div>
        </Link>
      )
    }
    case "WEBSITE": {
      return <></>;
    }
  }
}

const DownloadButtons = ({platformLinks}: {platformLinks: PlatformLink[]}) => {
  const buttons = platformLinks.map((paltformLink, index) => {
    return (
      <PlatformLinkButton key={index} platformLink={paltformLink} />
    )
  });
  
  return (
    <div className="w-48 mx-auto">
      {buttons}
    </div>
  )
}

const ResourceViewPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { id } = props;
  const resourceQuery = api.auditoryResource.byId.useQuery({ id });

  if (!resourceQuery.data) {
    return <>
    </>
  }

  return <>
    <div className="flex py-4 flex-col flex-col-reverse sm:flex-row divide-x max-w-2xl mx-auto">
      <div className="text-lg flex flex-col justify-end font-bold my-5 mr-4">
        <div className="mx-4">
          <h1 className="border-b mb-2 border-neutral-400">Links</h1>
          <DownloadButtons platformLinks={resourceQuery.data.platform_links} />
        </div>
      </div>
      <div className="flex pb-5 flex-col justify-left">
        <ResourceInfo resource={resourceQuery.data} />
        <div className="mx-4 text-left border border-neutral-400 rounded-xl p-4 bg-neutral-200 shadow">
          <p>
            {resourceQuery.data.description}
          </p>
        </div>
        <div className="ml-4 mt-4 mr-auto border-2 border-neutral-900 rounded-lg bg-neutral-600">
          <span className="text-neutral-200 text-sm px-2 py-2">Ages {resourceQuery.data.ages.min}{resourceQuery.data.ages.max >= 100 ? "+" : `-${resourceQuery.data.ages.max}`}</span>
        </div>
      </div>
    </div>
  </>
};

export default ResourceViewPage