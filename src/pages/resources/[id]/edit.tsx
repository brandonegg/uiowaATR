import { XCircleIcon } from "@heroicons/react/20/solid";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import { AdminActionButton, AdminActionLink } from "~/components/admin/common";
import Image from "next/image";
import {
  ResourceForm,
  type ResourceUpdateInput,
} from "~/components/admin/resources/form";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const EditResourcePage = () => {
  const router = useRouter();
  const id = router.query["id"]?.toString() ?? "";

  // TODO: Maybe useWait id before querying
  const { data: resource } = api.auditoryResource.byId.useQuery({ id });

  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const formMethods = useForm<ResourceUpdateInput>({
    defaultValues: resource as ResourceUpdateInput,
  });

  const { mutate } = api.auditoryResource.update.useMutation({
    onSuccess: async (_data) => {
      if (!resource) {
        setServerError("An unexpected error has occured");
        return;
      }

      setServerError(undefined);
      await router.push(`/resources/${resource.id}`);
    },
    onError: (error) => setServerError(error.message),
  });

  const onSubmit: SubmitHandler<ResourceUpdateInput> = (data) => {
    mutate(data);
  };

  if (!resource) {
    // TODO: Error page if resource does not exist
    return <></>;
  }

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
