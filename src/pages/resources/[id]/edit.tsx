import { XCircleIcon } from "@heroicons/react/20/solid";
import { type AuditoryResource } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import {
  type GetServerSideProps,
  type InferGetServerSidePropsType,
} from "next";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import { AdminActionLink } from "~/components/admin/common";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import Image from "next/image";
import { ResourceForm } from "~/components/admin/resources/form";

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
            symbol={
              <span className="flex">
                <Image
                  className="inline-block group-hover:hidden"
                  alt="save"
                  src="/save-disk-white.svg"
                  width={14}
                  height={14}
                />
                <Image
                  className="hidden group-hover:inline-block"
                  alt="save"
                  src="/save-disk-black.svg"
                  width={14}
                  height={14}
                />
              </span>
            }
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
          <ResourceForm resource={resource} />
        </main>
      </AdminBarLayout>
      <Footer />
    </>
  );
};

export default EditResourcePage;
