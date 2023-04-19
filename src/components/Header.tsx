import { type NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface DropdownOption {
  label: string;
  href: string;
}

interface NavBarLinkProps {
  href: string;
  label: string;
  dropdown?: DropdownOption[];
}

const NavBarLink = ({ href, label, dropdown }: NavBarLinkProps) => {
  const DropDown = ({
    dropdownOptions,
  }: {
    dropdownOptions: DropdownOption[];
  }) => {
    const options = dropdownOptions.map((dropdownOption, index) => {
      return (
        <Link key={index} href={dropdownOption.href}>
          <span className="block w-full bg-gradient-to-t from-neutral-900 to-neutral-700 px-4 py-2 text-white hover:from-neutral-500 hover:to-neutral-500">
            {dropdownOption.label}
          </span>
        </Link>
      );
    });

    return (
      <div className="absolute right-0 left-0 top-full hidden w-full flex-col rounded-b border-l-2 border-r-2 border-b-2 border-neutral-900 group-hover:flex">
        {options}
      </div>
    );
  };

  return (
    <li className="group relative">
      <Link
        href={href}
        className={
          "box-border block h-14 border-neutral-800" +
          (dropdown ? "" : " hover:border-b-2")
        }
      >
        <div className="flex h-full flex-row space-x-[4px]">
          <div className="my-auto inline-block">
            <span className="align-text-middle inline-block py-2 text-lg font-bold">
              {label}
            </span>
          </div>
          {dropdown ? <ChevronDownIcon className="w-4" /> : <></>}
        </div>
      </Link>
      {dropdown && dropdown.length > 0 ? (
        <DropDown dropdownOptions={dropdown} />
      ) : (
        <></>
      )}
    </li>
  );
};

const NavBar = () => {
  const resourcesDropDown: DropdownOption[] = [
    {
      label: "search",
      href: "/resources/search",
    },
    {
      label: "view all",
      href: "/resources",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-400 bg-gradient-to-b from-amber-300 to-amber-300 shadow-black drop-shadow-md">
      <li className="mx-auto flex max-w-5xl flex-row px-4 sm:justify-between">
        <ul id="left-nav-links" className="flex flex-row space-x-10">
          <NavBarLink href="/" label="Home" />
          <NavBarLink
            dropdown={resourcesDropDown}
            href="/resources"
            label="Resources"
          />
          <NavBarLink href="/about" label="About" />
        </ul>

        <ul id="right-nav-links" className="hidden flex-row space-x-10 sm:flex">
          <li className="group relative">
            <a
              target="_blank"
              href="https://forms.gle/FD2abgwBuTaipysZ6"
              className="box-border block h-14 border-neutral-800 hover:border-b-2"
            >
              <div className="flex h-full flex-row space-x-[4px]">
                <div className="my-auto inline-block">
                  <span className="align-text-middle inline-block py-2 text-lg font-bold">
                    Feedback
                  </span>
                </div>
              </div>
            </a>
          </li>
          <NavBarLink href="/contact" label="Contact Us" />
        </ul>
      </li>
    </nav>
  );
};

const Header: NextPage = () => {
  return (
    <>
      <div
        id="logo-row"
        className="border-yellow flex flex-row justify-center border-b bg-neutral-800 p-4 drop-shadow-xl"
      >
        <div className="rounded-xl bg-yellow-100 p-2 shadow-md shadow-yellow-500/50">
          <Image
            alt="Ear listening"
            src="/listening-ear.svg"
            width={64}
            height={64}
          />
        </div>
        <div id="header-title" className="grid w-64 place-items-center">
          <h1 className="text-center text-2xl font-bold text-neutral-200">
            Center for Auditory Training Resources
          </h1>
        </div>
      </div>
      <NavBar />
    </>
  );
};

export default Header;
