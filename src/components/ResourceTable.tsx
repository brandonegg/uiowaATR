import { type PaymentType } from '@prisma/client';
import { CurrencyDollarIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentListIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
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
                    <h2 className="text-xs italic text-gray-600">Advanced Bionics, LLC</h2>
                    <h1 className="font-bold text-xl">Word Success</h1>
                    <p>Apple and Android</p>
                    <PriceIcons type="SUBSCRIPTION_WEEKLY" />
                </div>
            </div>
        </div>
    )
}

const ResourceDescription = () => {
    return (
        <div className="flex flex-col p-2">
            <p>App with four different exercises that range from selecting the spoken word alone, in a senter (either in first, medial, or last position), and with or without background noise.</p>
        </div>
    )
}

const ResourceSkills = () => {
    const SkillRanking = () => {
        return (
            <div className='flex flex-row space-x-2 overflow-x-auto'>
                <div className="rounded-lg px-[3px] border-green-600 border-2 bg-green-300">
                    <h2 className="text-neutral-900 italic text-sm text-right">Beginner</h2>
                </div>
                <div className="rounded-lg px-[3px] border-orange-600 border-2 bg-orange-300">
                    <h2 className="text-neutral-900 text-sm italic text-right">Intermediate</h2>
                </div>
                <div className="rounded-lg px-[3px] border-orange-600 border-2 bg-orange-300">
                    <h2 className="text-neutral-900 text-sm italic text-right">Intermediate</h2>
                </div>
                <div className="rounded-lg px-[3px] border-orange-600 border-2 bg-orange-300">
                    <h2 className="text-neutral-900 text-sm italic text-right">Intermediate</h2>
                </div>
                <div className="rounded-lg px-[3px] border-orange-600 border-2 bg-orange-300">
                    <h2 className="text-neutral-900 text-sm italic text-right">Intermediate</h2>
                </div>
            </div>
        )
    }

    const Skill = ({label}: {label:string}) => {
        return (
            <li className="space-x-2 flex flex-row px-2 py-[1px]">
                <ClipboardDocumentListIcon className="w-4" />
                <div className="inline">
                    <h3>{label}</h3>
                </div>
            </li>
        )
    }

    return (
        <div className="m-2 flex space-y-4 flex-col">
            <div className='rounded-lg bg-gray-100 drop-shadow border border-neutral-900'>
                <ul className="divide-y-2">
                    <Skill label="Word Recognition" />
                    <Skill label="Sentences" />
                    <Skill label="Music" />
                </ul>
            </div>
            <SkillRanking />
        </div>
    )
}

const ResourceTable = () => {
    const ResourceEntry = () => {
        return (
            <tr className="divide-x-[1px] divide-slate-300">
                <td className="max-w-xs">
                    <ResourceInfo />
                </td>
                <td className="w-1/4 align-center">
                    <ResourceSkills />
                </td>
                <td className="align-top">
                    <ResourceDescription />
                </td>
            </tr>
        )
    }

    return(
    <div className="px-4 w-full">
        <div className="mx-auto max-w-6xl rounded-xl overflow-hidden border border-neutral-400">
            <table className="w-full table-fixed bg-neutral-200 drop-shadow-md">
                <thead className="bg-gradient-to-t from-neutral-900 to-neutral-700 rounded-xl overflow-hidden">
                    <tr>
                        <th className="w-1/3 max-w-xs">
                            <span className="text-gray-300 block px-4 py-2 text-left">
                                Resource
                            </span>
                        </th>
                        <th className="w-1/4 max-w-xs">
                            <span className="text-gray-300 block px-4 py-2 text-left">
                                Skills
                            </span>
                        </th>
                        <th>
                            <span className="text-gray-300 block px-4 py-2 text-left">
                                Description
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y-[1px] divide-slate-300 overflow-y-scroll">
                    <ResourceEntry />
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ResourceTable;
