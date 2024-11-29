import { type NextPage } from "next/types";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

interface QuickLink {
  label: string;
  href: string;
}

const links: QuickLink[] = [
  {
    label: "Provide Feedback",
    href: "https://forms.gle/FD2abgwBuTaipysZ6",
  },
  {
    label: "Communication Sciences and Disorders",
    href: "https://csd.uiowa.edu/",
  },
  {
    label: "Wendell Johnson",
    href: "https://www.facilities.uiowa.edu/named-building/wendell-johnson-speech-and-hearing-center",
  },
];

const QuickLink = ({ label, href }: QuickLink) => {
  return (
    <a className="space-x-2 hover:underline" target="_blank" href={href}>
      <Image
        className="inline"
        alt="external link"
        width={16}
        height={16}
        src="/open-external-link-icon.svg"
      />
      <span className="inline">{label}</span>
    </a>
  );
};

interface ContactInfo {
  name: string;
  title: string;
  email?: string;
  phone?: string;
}

const contacts: ContactInfo[] = [
  {
    name: "Olivia Adamson",
    title: "Audiologist",
    email: "olivia.adamson2@gundersenhealth.org",
  },
  {
    name: "Eun Kyung (Julie) Jeon",
    title: "Clinical Assistant Professor",
    email: "eunkyung-jeon@uiowa.edu",
    phone: "3194671476",
  },
];

const ContactInfo = ({ name, title, email, phone }: ContactInfo) => {
  return (
    <section className="space-y-2 py-4">
      <h1 className="text-md">{name}</h1>
      <p className="text-sm italic text-neutral-400">{title}</p>
      {email ? (
        <section className="space-x-2">
          <Image
            className="inline select-none"
            alt="email"
            width={20}
            height={20}
            src="/mail-icon-white.svg"
          />
          <a href={`mailto:${email}?`} className="inline select-all text-sm">
            {email}
          </a>
        </section>
      ) : undefined}
      {phone ? (
        <section className="space-x-2">
          <Image
            className="inline select-none"
            alt="phone"
            width={20}
            height={20}
            src="/phone-call-icon.svg"
          />
          <h2 className="inline select-all text-sm">{phone}</h2>
        </section>
      ) : undefined}
    </section>
  );
};

const AdminLogin = () => {
  const { data: sessionData } = useSession();

  if (sessionData?.user) {
    return (
      <button
        onClick={() => {
          void signOut();
        }}
        className="text-sm text-neutral-300 hover:underline"
        type="submit"
      >
        Logout of Site Admin
      </button>
    );
  }

  return (
    <Link
      className="text-sm text-neutral-300 hover:underline print:hidden"
      href="/admin/login"
    >
      Site Admin Login
    </Link>
  );
};

const FooterLabeledSection = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element[] | JSX.Element;
}) => {
  return (
    <div className="flex flex-col px-2 sm:px-8">
      <h1 className="text-xl font-bold text-neutral-400">{title}</h1>
      {children}
    </div>
  );
};

const Footer: NextPage = () => {
  return (
    <footer className="w-full break-inside-avoid bg-neutral-800">
      {/** yellow stripe */}
      <div className="border-t-[1px] border-neutral-400 bg-yellow-400 p-[4px] print:border-t-0"></div>

      {/** Main footer area */}
      <div className="mx-auto flex max-w-5xl flex-col-reverse justify-between p-4 print:flex-row md:flex-row">
        {/** Wendell Johnson Info */}
        <div className="mt-8 flex-col print:mt-0 sm:mt-0">
          <Image
            alt="University of Iowa logo"
            width={128}
            height={64}
            src="/IOWA-gold-text.png"
          />
          <div className="space-y-8 px-2 text-neutral-100">
            <section>
              <h1 className="text-md text-yellow-300">
                Communication Sciences and Disorders
              </h1>
              <h2 className="text-sm italic text-yellow-100">
                College of Liberal Arts and Sciences
              </h2>
            </section>
            <section>
              <h3 className="text-sm italic">
                Wendell Johnson Speech and Hearing Center
              </h3>
              <p className="text-sm">250 Hawkins Dr</p>
              <p className="text-sm">Iowa City, IA 52242</p>
            </section>
            <section>
              <AdminLogin />
              <p className="text-sm italic text-neutral-400">
                Site Designed and Built by{" "}
                <a
                  target="_blank"
                  href="https://brandonegger.com"
                  className="hover:underline"
                >
                  Brandon Egger
                </a>
              </p>
            </section>
          </div>
        </div>

        {/** Header and tabs */}
        <div className="mx-auto flex flex-row divide-x divide-neutral-500 text-neutral-200 print:inline-block sm:px-4 md:mx-0">
          <span className="print:hidden">
            <FooterLabeledSection title="Quick Links">
              <div className="flex flex-col space-y-2 pt-4">
                {links.map((quickLink, index) => {
                  return <QuickLink key={index} {...quickLink} />;
                })}
              </div>
            </FooterLabeledSection>
          </span>
          <FooterLabeledSection title="Contact">
            <div className="flex flex-col divide-y divide-neutral-500">
              {contacts.map((contactInfo, index) => {
                return <ContactInfo key={index} {...contactInfo} />;
              })}
            </div>
          </FooterLabeledSection>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
