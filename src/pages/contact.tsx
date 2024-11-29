import { type NextPage } from "next/types";
import Image from "next/image";
import { TopLabel } from "~/components/Labels";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";

interface ContactDetails {
  name: string;
  title: string;
  role: string;
  email: string;
  workplace: string;
}

const contacts: ContactDetails[] = [
  {
    name: "Olivia Adamson",
    title: "Au.D",
    role: "Audiologist",
    email: "olivia.adamson2@gundersenhealth.org",
    workplace: "Gundersen (Emplify) Health System",
  },
  {
    name: "Eun Kyung (Julie) Jeon",
    title: "Ph.D. Au.D., CCC-A",
    role: "Clinical Assistant Professor in Audiology",
    email: "eunkyung-jeon@uiowa.edu",
    workplace: "University of Iowa",
  },
];

const ContactForm = ({ details }: { details: ContactDetails }) => {
  return (
    <section className="grow p-8">
      <div className="mx-auto w-fit text-left">
        <h1 className="text-xl font-bold">{details.name}</h1>
        <h2 className="font-semibold italic text-neutral-500">
          {details.title}
        </h2>
        <h2>{details.role}</h2>
        <h3 className="text-yellow-500">{details.workplace}</h3>
        <a
          className="group mt-4 block w-fit space-x-2 rounded-lg bg-neutral-900 p-2 drop-shadow hover:bg-white"
          href={`mailto:${details.email}?`}
        >
          <Image
            className="my-auto inline-block select-none"
            alt="email"
            width={20}
            height={20}
            src="/mail-icon-white.svg"
          />
          <span className="select-all text-white group-hover:text-black">
            {details.email}
          </span>
        </a>
      </div>
    </section>
  );
};

const Contact: NextPage = () => {
  return (
    <HeaderFooterLayout>
      <div>
        <section className="mx-auto mb-4 mt-4 space-y-2 text-center sm:mt-8 sm:space-y-4">
          <h1 className="text-2xl font-bold">
            Have any Suggestions or Feedback?
          </h1>
          <div className="mx-auto w-fit overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 drop-shadow">
            <TopLabel>
              <h1 className="text-xs font-bold text-gray-300">
                Feedback Survey
              </h1>
            </TopLabel>
            <div className="space-y-2 p-4">
              <p>Fill out our brief survey:</p>
              <a
                target="_blank"
                href="https://forms.gle/FD2abgwBuTaipysZ6"
                className="mx-auto inline-block flex w-fit flex-row rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow-lg shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
              >
                Give Feedback
                <ArrowUpRightIcon className="inline w-5 align-middle" />
              </a>
            </div>
          </div>
          <h2 className="font-sembibold py-4 text-xl text-neutral-400">OR</h2>
          <h1 className="mt-8 text-2xl font-bold">Reach out Directly:</h1>
        </section>
        {/** Contact section */}
        <section className="mx-auto mb-4 max-w-4xl overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 drop-shadow sm:mb-8 md:mb-12">
          <TopLabel>
            <h1 className="font-bold text-gray-300">Contact Information</h1>
          </TopLabel>
          <div className="flex flex-col divide-y divide-neutral-500 sm:flex-row sm:divide-x sm:divide-y-0">
            {contacts.map((contactDetails, index) => {
              return <ContactForm key={index} details={contactDetails} />;
            })}
          </div>
        </section>
      </div>
    </HeaderFooterLayout>
  );
};

export default Contact;
