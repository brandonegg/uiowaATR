import { type InferGetStaticPropsType, type GetStaticPropsContext } from "next";
import { GlobeAltIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";
import { ResourceDescription, ResourceInfo } from "~/components/ResourceTable";
import { type PlatformLink } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import { AdminActionLink } from "~/components/admin/common";
import { useRouter } from "next/router";

export const getStaticPaths = async () => {
  const resources = await prisma.auditoryResource.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: resources.map((resource) => ({
      params: {
        id: resource.id,
      },
    })),
    fallback: "blocking",
  };
};

export async function getStaticProps(
  context: GetStaticPropsContext<{ id: string }>
) {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: null,
    },
  });

  const id = context.params?.id as string;

  await helpers.auditoryResource.byId.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
    revalidate: 1,
  };
}

const PlatformLinkButton = ({
  platformLink,
}: {
  platformLink: PlatformLink;
}) => {
  const Inner = () => {
    switch (platformLink.platform) {
      case "APP_ANDROID": {
        return (
          <Image
            className="w-full"
            src={`/google-play-badge.png`}
            alt={`Download on the Apple AppStore`}
            width={512}
            height={216}
          />
        );
      }
      case "APP_IOS": {
        return (
          <Image
            className="w-full"
            src={`/app-store-badge.png`}
            alt={`Download on the Apple AppStore`}
            width={512}
            height={216}
          />
        );
      }
      case "PDF": {
        return (
          <div className="flex h-16 flex-row space-x-2 rounded-lg border-2 border-neutral-900 bg-amber-300 px-2 align-middle hover:bg-amber-200">
            <DocumentIcon className="w-6" />
            <span className="my-auto text-sm font-bold">Document</span>
          </div>
        );
      }
      case "WEBSITE": {
        return (
          <div className="flex h-14 flex-row space-x-2 rounded-lg border-2 border-neutral-900 bg-amber-300 px-2 align-middle hover:bg-amber-200">
            <GlobeAltIcon className="w-6" />
            <span className="my-auto text-sm font-bold">Website</span>
          </div>
        );
      }
    }
  };

  return (
    <Link href={platformLink.link} target="_blank" rel="noopener noreferrer">
      <Inner />
    </Link>
  );
};

const DownloadButtons = ({
  platformLinks,
}: {
  platformLinks: PlatformLink[];
}) => {
  const buttons = platformLinks.map((paltformLink, index) => {
    return <PlatformLinkButton key={index} platformLink={paltformLink} />;
  });

  return <div className="mx-auto flex w-48 flex-col space-y-2">{buttons}</div>;
};

const ResourceViewPage = (
  props: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const { id } = props;
  const resourceQuery = api.auditoryResource.byId.useQuery({ id });
  const router = useRouter();

  if (!resourceQuery.data) {
    return <></>;
  }

  return (
    <>
      <div className="min-h-screen">
        <Header />
        <AdminBarLayout
          actions={
            <AdminActionLink
              symbol={<PencilSquareIcon className="w-4" />}
              label="Edit Page"
              href={`${router.asPath}/edit`}
            />
          }
        >
          <main className="mb-12">
            <div className="mx-auto flex max-w-2xl flex-col flex-col-reverse divide-x py-4 sm:flex-row">
              <div className="my-5 mr-4 flex flex-col justify-end text-lg font-bold">
                <div className="mx-4">
                  <h1 className="mb-2 border-b border-neutral-400">Links</h1>
                  <DownloadButtons
                    platformLinks={resourceQuery.data.platform_links}
                  />
                </div>
              </div>
              <div className="justify-left flex flex-col pb-5">
                <ResourceInfo resource={resourceQuery.data} />
                <div className="mx-4 overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 text-left shadow">
                  <ResourceDescription
                    manufacturer={resourceQuery.data.manufacturer}
                    description={resourceQuery.data.description}
                  />
                </div>
                <div className="ml-4 mr-auto mt-4 rounded-lg border-2 border-neutral-900 bg-neutral-600">
                  <span className="px-2 py-2 text-sm text-neutral-200">
                    Ages {resourceQuery.data.ages.min}
                    {resourceQuery.data.ages.max >= 100
                      ? "+"
                      : `-${resourceQuery.data.ages.max}`}
                  </span>
                </div>
              </div>
            </div>
          </main>
        </AdminBarLayout>
        <Footer />
      </div>
    </>
  );
};

export default ResourceViewPage;
