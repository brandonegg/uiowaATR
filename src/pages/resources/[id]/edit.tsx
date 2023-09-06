import { XCircleIcon } from "@heroicons/react/20/solid";
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
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";
import { QueryWaitWrapper } from "~/components/LoadingWrapper";
import { type AuditoryResource } from "@prisma/client";

const EditResourcePage = () => {
  const router = useRouter();
  const id = router.query["id"]?.toString() ?? "";

  const resourceQuery = api.auditoryResource.byId.useQuery(
    { id },
    {
      enabled: router.isReady,
      retry(_failureCount, error) {
        return error.data?.httpStatus !== 404;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchInterval: false,
    }
  );

  const ConditionalView = (data: AuditoryResource) => {
    const [serverError, setServerError] = useState<string | undefined>(
      undefined
    );
    const formMethods = useForm<ResourceUpdateInput>({
      defaultValues: data as ResourceUpdateInput,
    });

    const { mutate } = api.auditoryResource.update.useMutation({
      onSuccess: async (resData) => {
        if (!resData) {
          setServerError("An unexpected error has occured");
          return;
        }

        setServerError(undefined);
        await router.push(`/resources/${data.id}`);
      },
      onError: (error) => {
        try {
          const zodErrors = JSON.parse(error.message) as unknown as { message: string }[];
          setServerError(
            zodErrors
              .map((error) => {
                return error.message;
              })
              .join(", ")
          );
        } catch {
          setServerError(error.message);
        }
      },
    });

    const onSubmit: SubmitHandler<ResourceUpdateInput> = (data) => {
      mutate(data);
    };

    return (
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
            href={`/resources/${data.id}`}
          />,
        ]}
      >
        <div className="mb-12">
          <ResourceForm
            methods={formMethods}
            error={serverError}
            resource={data as ResourceUpdateInput}
          />
        </div>
      </AdminBarLayout>
    );
  };

  return (
    <HeaderFooterLayout>
      <QueryWaitWrapper query={resourceQuery} Render={ConditionalView} />
    </HeaderFooterLayout>
  );
};

export default EditResourcePage;
