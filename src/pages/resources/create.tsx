import { XCircleIcon, PlusCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { AdminBarLayout } from "~/components/admin/ControlBar";
import { AdminActionButton, AdminActionLink } from "~/components/admin/common";
import {
  ResourceForm,
  type ResourceUpdateInput,
} from "~/components/admin/resources/form";
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";

const EditResourcePage = () => {
  const formMethods = useForm<ResourceUpdateInput>();

  const [serverError, _setServerError] = useState<string | undefined>(undefined);

  const onSubmit: SubmitHandler<ResourceUpdateInput> = () => {
    // TODO: TRPC request to create resource
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
              onSubmit(formMethods.getValues());
            }}
          />,
          <AdminActionLink
            key="cancel"
            symbol={<XCircleIcon className="w-4" />}
            label="Cancel"
            href={`/resources`}
          />,
        ]}
      >
        <div className="mb-12">
          <ResourceForm methods={formMethods} error={serverError} />
        </div>
      </AdminBarLayout>
    </HeaderFooterLayout>
  );
};

export default EditResourcePage;
