import { type NextPage } from "next";
import Image from 'next/image';
import Link from "next/link";
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface NavBarLinkProps {
    href: string;
    label: string;
    dropdown?: boolean;
}

const NavBarLink = ({href, label, dropdown}: NavBarLinkProps) => {
    return (
        <li className="">
            <Link href={href} className="h-14 block hover:border-b-2 border-neutral-800 box-border">
                <div className="h-full flex flex-row space-x-[4px]">
                    <div className="inline-block my-auto">
                        <span className="inline-block font-bold text-lg py-2 align-text-middle">{label}</span>
                    </div>
                    {dropdown ? <ChevronDownIcon className="w-4"/> : <></>}
                </div>
            </Link>
        </li>
    );
}

const NavBar = () => {
    return (
        <nav className="border-b border-neutral-400 bg-gradient-to-b from-amber-300 to-amber-300 w-full shadow-black drop-shadow-md">
            <li className="mx-auto max-w-5xl flex flex-row sm:justify-between px-4">
                <ul id="left-nav-links" className="flex flex-row space-x-10">
                    <NavBarLink href='/' label='Home'/>
                    <NavBarLink dropdown href='/resources' label='Resources'/>
                    <NavBarLink href='/' label='About'/>
                </ul>

                <ul id="right-nav-links" className="hidden sm:flex flex-row space-x-4">
                    <NavBarLink href='/' label='Contact Us'/>
                </ul>
            </li>
        </nav>
    )
}

const Header: NextPage = () => {
    return <>
        <div id="logo-row" className="flex flex-row p-4 justify-center bg-neutral-800 z-50 drop-shadow-xl">
            <div>
                <Image alt="Ear listening" src="/listening-ear.svg" width={64} height={64}/>
            </div>
            <div id="header-title" className="w-64 grid place-items-center">
                <h1 className="text-center text-2xl font-bold text-neutral-300">Center for Auditory Training Resources</h1>
            </div>
        </div>
        <NavBar/>
    </>
};

export default Header;