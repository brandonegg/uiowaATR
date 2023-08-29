import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { LoadingBarChart } from "./LoadingBarChart";
import { ErrorNotice } from "./notice";
import { type TRPCClientErrorLike } from "@trpc/client";
import { type TRPCErrorShape } from "@trpc/server/rpc";
import { type AnyProcedure, type AnyRouter } from "@trpc/server";

/**
 * Generic query wrapper which handles the states of a query
 * (loading, error, etc.). Will hydrate child with query.data
 *
 */
export function QueryWaitWrapper<
  TData,
  TRouterOrProcedure extends AnyProcedure | AnyRouter | TRPCErrorShape<number>
>({
  query,
  Render,
}: {
  query: UseTRPCQueryResult<TData, TRPCClientErrorLike<TRouterOrProcedure>>;
  Render: (data: TData) => JSX.Element;
}) {
  if (query.isLoading) {
    return <LoadingBarChart width={200} height={200} />;
  }

  if (!query.data || query.isError) {
    return (
      <div className="my-10 sm:my-16 md:my-28">
        <ErrorNotice
          icon
          header={
            query.error?.message ??
            "Unable to retrieve page data. Please try again."
          }
          body="If this issue persists, please contact a site administrator"
        />
      </div>
    );
  }

  return <Render {...query.data} />;
}
