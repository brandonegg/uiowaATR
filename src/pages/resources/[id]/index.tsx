import { GlobeAltIcon, DocumentIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { api } from "~/utils/api";
import { ResourceDescription, ResourceInfo } from "~/components/ResourceTable";
import { type AuditoryResource, type PlatformLink } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import {
  AdminActionConfirmButton,
  AdminActionLink,
} from "~/components/admin/common";
import { useRouter } from "next/router";
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";
import { QueryWaitWrapper } from "~/components/LoadingWrapper";
import { TrashIcon } from "@heroicons/react/24/outline";

export const PlatformLinkButton = ({
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

const ResourceViewPage = () => {
  const router = useRouter();
  const id = router.query["id"]?.toString() ?? "";

  const resourceQuery = api.auditoryResource.byId.useQuery(
    { id },
    {
      retry(_failureCount, error) {
        return error.data?.httpStatus !== 404;
      },
    }
  );

  const { mutate: mutateDelete } = api.auditoryResource.delete.useMutation({
    onSuccess: async () => {
      await router.push(`/resources`);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const ConditionalView = (data: AuditoryResource) => {
    return (
      <div className="mx-auto flex max-w-2xl flex-col flex-col-reverse divide-x py-4 sm:flex-row">
        <div className="my-5 mr-4 flex flex-col justify-end text-lg font-bold">
          <div className="mx-4">
            <h1 className="mb-2 border-b border-neutral-400">Links</h1>
            <DownloadButtons platformLinks={data.platform_links} />
          </div>
        </div>
        <div className="justify-left flex flex-col pb-5">
          <ResourceInfo resource={data} />
          <div className="mx-4 overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 text-left shadow">
            <ResourceDescription
              manufacturer={data.manufacturer}
              description={data.description}
            />
          </div>
          <div className="ml-4 mr-auto mt-4 rounded-lg border-2 border-neutral-900 bg-neutral-600">
            <span className="px-2 py-2 text-sm text-neutral-200">
              Ages {data.ages.min}
              {data.ages.max >= 100 ? "+" : `-${data.ages.max}`}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <HeaderFooterLayout>
      <AdminBarLayout
        actions={[
          <AdminActionLink
            key="edit"
            symbol={<PencilSquareIcon className="w-4" />}
            label="Edit Page"
            href={`${router.asPath}/edit`}
          />,
          <AdminActionConfirmButton
            key="delete"
            label="Delete"
            symbol={<TrashIcon className="w-4" />}
            onConfirm={() => {
              mutateDelete({
                id,
              });
            }}
          />,
        ]}
      >
        <div className="mb-12">
          <QueryWaitWrapper query={resourceQuery} Render={ConditionalView} />
        </div>
      </AdminBarLayout>
    </HeaderFooterLayout>
  );
};

export default ResourceViewPage;
