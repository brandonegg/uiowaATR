import { type NextPage } from "next";
import Image from 'next/image';
import Link from "next/link";

interface NavBarLinkProps {
    href: string;
    label: string;
}

const NavBarLink = ({href, label}: NavBarLinkProps) => {
    return (
        <li>
            <Link href={href}>
                <span className="inline-block py-2">{label}</span>
            </Link>
        </li>
    );
}

const NavBar = () => {
    return (
        <nav className="bg-amber-400 flex flex-row justify-between px-4">
            <ul id="left-nav-links" className="flex flex-row space-x-4">
                <NavBarLink href='/' label='Home'/>
                <NavBarLink href='/' label='Resources'/>
                <NavBarLink href='/' label='About'/>
            </ul>

            <ul id="right-nav-links" className="flex flex-row space-x-4">
                <NavBarLink href='/' label='Home'/>
                <NavBarLink href='/' label='Home'/>
                <NavBarLink href='/' label='Contact Us'/>
            </ul>
        </nav>
    )
}

const Header: NextPage = () => {
    return <>
        <div id="logo-row" className="flex flex-row p-4">
            <div>
                <Image alt="Ear listening" src="listening-ear.svg" width={64} height={64}/>
            </div>
            <div id="header-title" className="grow grid place-items-center">
                <h1 className="text-center text-xl font-bold">Center for Auditory Training Resources</h1>
            </div>
            <div>
                <Image alt="Ear listening" src="listening-ear.svg" width={64} height={64}/>
            </div>
        </div>
        <NavBar/>
    </>
};

export default Header;