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
import { AdminActionButton, AdminActionLink } from "~/components/admin/common";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import Image from "next/image";
import {
  ResourceForm,
  type ResourceUpdateInput,
} from "~/components/admin/resources/form";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";

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
  const [updateIconFile, setIconFile] = useState<File | undefined>(undefined);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const formMethods = useForm<ResourceUpdateInput>({
    defaultValues: resource as ResourceUpdateInput,
  });

  const { mutate } = api.auditoryResource.update.useMutation({
    onSuccess: (_data) => {
      setServerError(undefined);
    },
    onError: (error) => setServerError(error.message),
  });

  const onSubmit: SubmitHandler<ResourceUpdateInput> = async (data) => {
    // TODO: Fix file upload, currently it is not updating correctly on the server side
    // May also need to look into re-rendering static pages when icon changes
    // Also need to add authentication of route!
    if (updateIconFile) {
      const data = new FormData();
      data.append("photo", updateIconFile);

      const uploadResponse = await fetch(
        `/api/resources/photo/${resource.id}`,
        {
          method: "POST",
          body: data,
        }
      );

      console.log("uploading icon");

      if (uploadResponse.status !== 200) {
        setServerError(
          "Failed uploading resource icon file. Changes did not save!"
        );
        throw new Error(JSON.stringify(uploadResponse));
      }
    }

    mutate(data);
  };

  return (
    <>
      <Header />
      <AdminBarLayout
        actions={[
          <AdminActionButton
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
            onClick={() => {
              onSubmit(formMethods.getValues());
            }}
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
          <ResourceForm
            setIconFile={setIconFile}
            methods={formMethods}
            error={serverError}
            resource={resource as ResourceUpdateInput}
          />
        </main>
      </AdminBarLayout>
      <Footer />
    </>
  );
};

export default EditResourcePage;
