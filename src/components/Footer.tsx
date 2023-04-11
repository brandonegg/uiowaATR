import { type NextPage } from "next/types";
import Image from 'next/image';
import Link from "next/link";

interface QuickLink {
    label: string,
    href: string,
}

const links: QuickLink[] = [
    {
        label: "University of Iowa",
        href: "https://uiowa.edu/",
    },
    {
        label: "Wendell Johnson",
        href: "https://www.facilities.uiowa.edu/named-building/wendell-johnson-speech-and-hearing-center",
    }
]

const QuickLink = ({label, href}: QuickLink) => {
    return (
        <a className="hover:underline space-x-2" target="_blank" href={href}>
            <Image className="inline" alt="external link" width={16} height={16} src="/open-external-link-icon.svg" />
            <span className="inline">{label}</span>
        </a>
    )
};

interface ContactInfo {
    name: string,
    title: string,
    email?: string,
    phone?: string,
}

const contacts: ContactInfo[] = [
    {
        name: "Olivia Adamson",
        title: "Audiology Graduate Student Clinician",
        email: "olivia-adamson@uiowa.edu",
    },
    {
        name: "Eun Kyung (Julie) Jeon",
        title: "Clinical Assistant Professor",
        email: "eunkyung-jeon@uiowa.edu",
        phone: "319-467-1476"
    }
]

const ContactInfo = ({name, title, email, phone}: ContactInfo) => {
    return (
        <section className="py-4 space-y-2">
            <h1 className="text-md">{name}</h1>
            <p className="italic text-sm text-neutral-400">{title}</p>
            { email ?
            <section className="space-x-2">
                <Image className="inline" alt="email" width={20} height={20} src="/mail-icon-white.svg"/>
                <h2 className="text-sm inline">{email}</h2>
            </section>
            : undefined}
            { phone ?
            <section className="space-x-2">
                <Image className="inline" alt="phone" width={20} height={20} src="/phone-call-icon.svg"/>
                <h2 className="text-sm inline">{phone}</h2>
            </section>
            : undefined}
        </section>
    )
}

const FooterLabeledSection = ({title, children}: {
    title: string,
    children: JSX.Element[] | JSX.Element,
}) => {
    return (
        <div className="flex flex-col px-8">
            <h1 className="font-bold text-xl text-neutral-400">{title}</h1>
            {children}
        </div>
    )
}

const Footer: NextPage = () => {
    return (
        <div className="w-full mt-12 bg-neutral-800">
            {/** yellow stripe */}
            <div className="bg-yellow-400 border-t-[1px] border-neutral-400 p-[4px]"></div>

            {/** Main footer area */}
            <div className="mx-auto max-w-5xl p-4 flex flex-col-reverse sm:flex-row justify-between">
                {/** Wendell Johnson Info */}
                <div className="flex-col mt-8 sm:mt-0">
                    <Image alt="University of Iowa logo" width={128} height={64} src="/IOWA-gold-text.png" />
                    <div className="px-2 text-neutral-100">
                        <p className="text-yellow-300 italic">Wendell Johnson Speech and Hearing Center</p>
                        <p>250 Hawkins Dr</p>
                        <p>Iowa City, IA 52242</p>
                    </div>
                </div>

                {/** Header and tabs */}
                <div className="flex flex-row text-neutral-200 px-4 divide-x divide-neutral-500">
                    <FooterLabeledSection title="Quick Links">
                        <div className="flex flex-col pt-4 space-y-2">
                            {links.map((quickLink, index) => {
                                return (
                                    <QuickLink key={index} {...quickLink}/>
                                )
                            })}
                        </div>
                    </FooterLabeledSection>
                    <FooterLabeledSection title="Contact">
                        <div className="flex flex-col divide-y divide-neutral-500">
                            {contacts.map((contactInfo, index) => {
                                return (
                                    <ContactInfo key={index} {...contactInfo} />
                                )
                            })}
                        </div>
                    </FooterLabeledSection>
                </div>
            </div>
        </div>
    )
}

export default Footer;