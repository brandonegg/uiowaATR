import { type PaymentType } from "@prisma/client";
import {
  CurrencyDollarIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/solid";

const PriceIcon = ({ type }: { type: PaymentType }) => {
  switch (type) {
    case "FREE": {
      return (
        <div className="space-x-1" title="Free">
          <span className="rounded-lg border border-neutral-900 bg-amber-100 px-2 py-[1px] italic text-black">
            free
          </span>
        </div>
      );
    }
    case "SUBSCRIPTION_MONTHLY": {
      <div className="space-x-1" title="Monthly recurring subscription">
        <ArrowPathRoundedSquareIcon className="inline-block h-6 w-6" />
        <CurrencyDollarIcon className="inline h-6 w-6 text-lime-800" />
      </div>;
    }
    case "SUBSCRIPTION_WEEKLY": {
      return (
        <div className="space-x-1" title="Weekly recurring subscription">
          <ArrowPathRoundedSquareIcon className="inline-block h-6 w-6" />
          <CurrencyDollarIcon className="inline h-6 w-6 text-lime-800" />
        </div>
      );
    }
  }
};

export { PriceIcon };
