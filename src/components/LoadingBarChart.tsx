import Image from "next/image";

export const LoadingBarChart = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  return (
    <div className="my-16 grid h-full w-full place-items-center">
      <div className="h-fit w-fit animate-pulse rounded-xl border border-stone-400 bg-stone-100 p-4 drop-shadow-xl">
        <Image
          alt="loading content"
          src="./loading/bar-chart.svg"
          width={width}
          height={height}
        />
        <p className="text-center italic text-stone-400">
          page content loading
        </p>
      </div>
    </div>
  );
};
