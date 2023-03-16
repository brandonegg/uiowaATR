import { type Platform, type PaymentType, type AuditoryResource, type Skill, type SkillLevel } from '@prisma/client';
import { CurrencyDollarIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { translateEnumPlatform } from '~/utils/enumWordLut';

const ResourceEntry = ({resource}: {resource: AuditoryResource}) => {
    const ResourceInfo = ({resource}: {resource: AuditoryResource}) => {
        const PriceIcons = ({type}: {type: PaymentType}) => {
    
            return (
                <div className="space-x-1" title="Weekly recurring subscription">
                    <ArrowPathRoundedSquareIcon className="inline h-6 w-6" />
                    <CurrencyDollarIcon className="inline h-6 w-6 text-lime-800"/>
                </div>
            )
        }
    
        const PlatformInfo = ({platforms}: {platforms: Platform[]}) => {
            const platformsStr = platforms.map((platform) => {
                return translateEnumPlatform(platform);
            }).join(', ');
            
            return (
                <p>{platformsStr}</p>
            )
        }
        
        return (
            <div className="p-4 space-x-4 flex flex-row">
                <div className="h-full my-auto">
                <Link href="https://google.com">
                    <div className="w-28 flex space-y-2 flex-col justify-center">
                        <Image className="w-full rounded-xl drop-shadow-lg border border-neutral-400" src="/resource_logos/word_success.png" alt="Word Success logo" width={512} height={512}/>
                        <span 
                        className="block bg-neutral-900 hover:bg-neutral-500 border border-neutral-900 text-center py-[1px] text-white rounded-lg">
                            more info
                        </span>
                        </div>
                    </Link>
                </div>
                <div className="grid place-items-center">
                    <div className="">
                        <h2 className="text-xs italic text-gray-600">{resource.manufacturer}</h2>
                        <h1 className="font-bold text-xl">{resource.name}</h1>
                        <PlatformInfo platforms={resource.platforms}/>
                        <PriceIcons type={resource?.payment_options[0] ?? 'FREE'} />
                    </div>
                </div>
            </div>
        )
    }
    
    const ResourceDescription = ({description}: {description: string}) => {
        return (
            <div className="flex flex-col p-2">
                <p>{description}</p>
            </div>
        )
    }
    
    const ResourceSkills = ({skills, skillLevels}: {skills: Skill[], skillLevels: SkillLevel[]}) => {
        const SkillRanking = ({skillLevels}: {skillLevels: SkillLevel[]}) => {
            return (
                <div className='flex flex-row space-x-2 overflow-x-auto'>
                    {skillLevels.includes('BEGINNER') ?
                        <div className="rounded-lg px-[3px] border-green-600 border-2 bg-green-300">
                            <h2 className="text-neutral-900 italic text-sm text-right">Beginner</h2>
                        </div> : undefined
                    }
                    {skillLevels.includes('INTERMEDIATE') ?
                        <div className="rounded-lg px-[3px] border-orange-600 border-2 bg-orange-300">
                            <h2 className="text-neutral-900 text-sm italic text-right">Intermediate</h2>
                        </div> : undefined
                    }
                    {skillLevels.includes('ADVANCED') ?
                        <div className="rounded-lg px-[3px] border-red-600 border-2 bg-red-300">
                            <h2 className="text-neutral-900 text-sm italic text-right">Advanced</h2>
                        </div> : undefined
                    }
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
                <SkillRanking skillLevels={skillLevels} />
            </div>
        )
    }

    return (
        <tr className="divide-x-[1px] divide-slate-300">
            <td className="max-w-xs">
                <ResourceInfo resource={resource} />
            </td>
            <td className="w-1/4 align-center">
                <ResourceSkills skills={resource.skills} skillLevels={resource.skill_levels} />
            </td>
            <td className="align-top">
                <ResourceDescription description={resource.description} />
            </td>
        </tr>
    )
}

const ResourceTable = ({resources}: {resources?: AuditoryResource[]}) => {

    const resourceElements = resources?.map((resource, index) => {
        return (<ResourceEntry key={index} resource={resource} />);
    }) ?? [];

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
                    {resourceElements}
                </tbody>
            </table>
        </div>
    </div>
    );
};

export default ResourceTable;
