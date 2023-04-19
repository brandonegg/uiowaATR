import { type NextPage } from "next/types";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { TopLabel } from "~/components/Labels";

interface ContactDetails {
  label: string;
  role: string;
  email: string;
}

const contacts: ContactDetails[] = [
  {
    label: "Olivia Adamson, B.A",
    role: "Graduate Student Clinician - Audiology",
    email: "olivia-adamson@uiowa.edu",
  },
  {
    label: "Eun Kyung (Julie) Jeon, Ph.D. Au.D., CCC-A",
    role: "Clinical Assistant Professor in Audiology",
    email: "eunkyung-jeon@uiowa.edu",
  },
];

const ContactForm = ({details}: {details: ContactDetails}) => {
  return (
    <section className="grow p-8">
      <div className="mx-auto w-fit text-left">
        <h1>{details.label}</h1>
        <h2>{details.role}</h2>
      </div>
    </section>
  );
}

const Contact: NextPage = () => {
  return (
    <>
      <Header />
      <main>
        {/** Contact section */}
        <section className="my-12 mx-auto max-w-4xl overflow-hidden rounded-xl border border-neutral-400 bg-neutral-200 drop-shadow">
          <TopLabel>
            <h1 className="font-bold text-gray-300">Contact Information</h1>
          </TopLabel>
          <div className="flex flex-row divide-x divide-neutral-500">
            {contacts.map((contactDetails, index) => {
              return (
                <ContactForm key={index} details={contactDetails} />
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
