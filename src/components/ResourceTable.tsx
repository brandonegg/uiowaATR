import { PaymentType } from '@prisma/client';
import { CurrencyDollarIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import Image from 'next/image';
import Link from 'next/link';

const ResourceInfo = () => {
    const PriceIcons = ({type}: {type: PaymentType}) => {
        return (
            <div className="space-x-1" title="Weekly recurring subscription">
                <ArrowPathRoundedSquareIcon className="inline h-6 w-6" />
                <CurrencyDollarIcon className="inline h-6 w-6 text-lime-800"/>
            </div>
        )
    }
    
    return (
        <div className="p-4 space-x-4 flex flex-row">
            <div className="h-full">
            <Link href="https://google.com">
                <div className="flex space-y-2 flex-col">
                    <Image className="w-28 rounded-xl drop-shadow-lg border border-neutral-400" src="/resource_logos/word_success.png" alt="Word Success logo" width={512} height={512}/>
                    <span 
                    className="block bg-neutral-900 hover:bg-neutral-500 border border-neutral-900 text-center py-[1px] text-white rounded-lg">
                        more info
                    </span>
                    </div>
                </Link>
            </div>
            <div className="grow grid place-items-center">
                <div className="">
                    <h1 className="font-bold text-xl">Word Success</h1>
                    <p>Apple and Android</p>
                    <PriceIcons type={PaymentType.SUBSCRIPTION_WEEKLY} />
                </div>
            </div>
        </div>
    )
}

const ResourceDescription = () => {
    return (
        <div className="p-2">
            <p>Description here</p>
        </div>
    )
}

const ResourceTable = () => {
    const ResourceEntry = () => {
        return (
            <tr className="divide-x-[1px] divide-slate-300">
                <td>
                    <ResourceInfo />
                </td>
                <td>
                    <ResourceDescription />
                </td>
            </tr>
        )
    }

    return(
    <div className="px-4 w-full">
        <div className="rounded-xl overflow-hidden border border-neutral-400">
            <table className="table-fixed w-full bg-neutral-200 drop-shadow-md">
                <thead className="bg-gradient-to-t from-neutral-900 to-neutral-700 rounded-xl overflow-hidden">
                    <tr>
                        <th className="w-1/2">
                            <span className="text-gray-300 block px-4 py-2 text-left">
                                Resource
                            </span>
                        </th>
                        <th>
                            <span className="text-white block px-4 py-2 text-left">
                                Description
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y-[1px] divide-slate-300">
                    <ResourceEntry />
                    <ResourceEntry />
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ResourceTable;
