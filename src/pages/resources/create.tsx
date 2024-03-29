import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  type SubmitHandler,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import {
  AdminActionButton,
  AdminActionConfirmButton,
} from "~/components/admin/common";
import {
  type ResourceCreateInput,
  ResourceForm,
  type ResourceUpdateInput,
} from "~/components/admin/resources/form";
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";
import { api } from "~/utils/api";
import { parseTRPCErrorMessage } from "~/utils/parseTRPCError";

const EditResourcePage = () => {
  const router = useRouter();
  const formMethods = useForm<ResourceCreateInput>();

  const [serverError, setServerError] = useState<string | undefined>(undefined);

  const { mutate } = api.auditoryResource.create.useMutation({
    onSuccess: async (resData) => {
      if (!resData) {
        setServerError("An unexpected error has occured");
      }

      setServerError(undefined);
      await router.push(`/resources/${resData.id}`);
    },
    onError: (error) => {
      setServerError(parseTRPCErrorMessage(error.message));
    },
  });

  const onSubmit: SubmitHandler<ResourceCreateInput> = (data) => {
    mutate(data);
  };

  return (
    <HeaderFooterLayout>
      <AdminBarLayout
        actions={[
          <AdminActionButton
            key="create"
            symbol={<PlusCircleIcon className="w-4" />}
            label="Create"
            onClick={() => {
              formMethods
                .handleSubmit(onSubmit)()
                .catch((error) => console.error(error));
            }}
          />,
          <AdminActionConfirmButton
            key="cancel"
            symbol={<XCircleIcon className="w-4" />}
            label="Cancel"
            onConfirm={() => {
              router.push("/resources").catch((error) => {
                console.error(error);
              });
            }}
          />,
        ]}
      >
        <div className="mb-12">
          <ResourceForm
            methods={
              formMethods as unknown as UseFormReturn<ResourceUpdateInput>
            }
            error={serverError}
          />
        </div>
      </AdminBarLayout>
    </HeaderFooterLayout>
  );
};

export default EditResourcePage;
