import { type NextPage } from "next/types";
import Footer from "~/components/Footer";
import Image from "next/image";
import Header from "~/components/Header";
import { TopLabel } from "~/components/Labels";

interface ContactDetails {
  name: string;
  title: string;
  role: string;
  email: string;
}

const contacts: ContactDetails[] = [
  {
    name: "Olivia Adamson",
    title: "B.A",
    role: "Graduate Student Clinician - Audiology",
    email: "olivia-adamson@uiowa.edu",
  },
  {
    name: "Eun Kyung (Julie) Jeon",
    title: "Ph.D. Au.D., CCC-A",
    role: "Clinical Assistant Professor in Audiology",
    email: "eunkyung-jeon@uiowa.edu",
  },
];

const ContactForm = ({ details }: { details: ContactDetails }) => {
  return (
    <section className="grow p-8">
      <div className="mx-auto w-fit text-left">
        <h1 className="font-bold text-xl">{details.name}</h1>
        <h2 className="font-semibold text-neutral-500">{details.title}</h2>
        <h2>{details.role}</h2>
        <a className="mt-4 block w-fit p-2 hover:bg-white group bg-neutral-900 rounded-lg space-x-2" href={`mailto:${details.email}?`}>
          <Image
            className="inline-block my-auto"
            alt="email"
            width={20}
            height={20}
            src="/mail-icon-white.svg"
          />
          <span className="select-all group-hover:text-black text-white">
            {details.email}
          </span>
        </a>
      </div>
    </section>
  );
};

const Contact: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        {/** Contact section */}
        <section className="my-4 sm:my-8 md:my-12 mx-auto max-w-4xl overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 drop-shadow">
          <TopLabel>
            <h1 className="font-bold text-gray-300">Contact Information</h1>
          </TopLabel>
          <div className="flex flex-col sm:flex-row divide-y sm:divide-x divide-neutral-500">
            {contacts.map((contactDetails, index) => {
              return <ContactForm key={index} details={contactDetails} />;
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
