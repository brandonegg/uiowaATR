import { XCircleIcon } from "@heroicons/react/20/solid";
import { type AuditoryResource } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { ResourceInfo, ResourceDescription } from "~/components/ResourceTable";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import { AdminActionLink } from "~/components/admin/common";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";

export const getServerSideProps: GetServerSideProps<{
  resource: AuditoryResource;
}> = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: null,
    },
  });

  const id = context.params?.id as string;

  const resource = await helpers.auditoryResource.byId.fetch({ id });

  return {
    props: {
      resource,
    },
  };
};

const EditResourcePage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { resource } = props;

  return (
    <>
      <Header />
      <AdminBarLayout
        actions={[
          <AdminActionLink
            key="save"
            symbol={<XCircleIcon className="w-4" />}
            label="Save"
            href={`/resources/${resource.id}`}
          />,
          <AdminActionLink
            key="cancel"
            symbol={<XCircleIcon className="w-4" />}
            label="Cancel"
            href={`/resources/${resource.id}`}
          />,
        ]}
      >
        <main className="mb-12">
          <div className="mx-auto flex max-w-2xl flex-col flex-col-reverse divide-x py-4 sm:flex-row">
            <div className="my-5 mr-4 flex flex-col justify-end text-lg font-bold">
              <div className="mx-4">
                <h1 className="mb-2 border-b border-neutral-400">Links</h1>
              </div>
            </div>
            <div className="justify-left flex flex-col pb-5">
              <ResourceInfo resource={resource} />
              <div className="mx-4 overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 text-left shadow">
                <ResourceDescription
                  manufacturer={resource.manufacturer}
                  description={resource.description}
                />
              </div>
              <div className="ml-4 mr-auto mt-4 rounded-lg border-2 border-neutral-900 bg-neutral-600">
                <span className="px-2 py-2 text-sm text-neutral-200">
                  Ages {resource.ages.min}
                  {resource.ages.max >= 100 ? "+" : `-${resource.ages.max}`}
                </span>
              </div>
            </div>
          </div>
        </main>
      </AdminBarLayout>
      <Footer />
    </>
  );
};

export default EditResourcePage;
