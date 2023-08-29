import { type UseTRPCQueryResult } from "@trpc/react-query/shared";
import { LoadingBarChart } from "./LoadingBarChart";
import { ErrorNotice } from "./notice";

/**
 * Generic query wrapper which handles the states of a query
 * (loading, error, etc.). Will hydrate child with query.data
 *
 */
export function QueryWaitWrapper<TData, TError>({
  query,
  Render,
}: {
  query: UseTRPCQueryResult<TData, TError>;
  Render: (data: TData) => JSX.Element;
}) {
  if (query.isLoading) {
    return <LoadingBarChart width={200} height={200} />;
  }

  console.log(query.data);

  if (!query.data || query.isError) {
    return (
      <div className="my-10 sm:my-16 md:my-28">
        <ErrorNotice
          icon
          header="Unable to retrieve page data. Please try again."
          body="If this issue persists, please contact a site administrator"
        />
      </div>
    );
  }

  return <Render {...query.data} />;
}
