import { type NextPage } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const TextLink = ({ href, children }: { href: string; children: string }) => {
  return (
    <Link
      href={href}
      className="align-items-center inline-block rounded-md border border-neutral-900 px-[4px] py-[2px] text-sm hover:bg-neutral-900 hover:text-white"
    >
      {children}
      <ArrowUpRightIcon className="inline-block w-4" />
    </Link>
  );
};

const Home: NextPage = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div
          style={{
            backgroundImage: `url("/backdrops/patient-clinic-bg.jpeg")`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          }}
          className="flex grow flex-col"
        >
          <div
            style={{
              WebkitBackdropFilter: `blur(15px) contrast(50%)`,
              backdropFilter: `blur(15px) contrast(50%)`,
            }}
            className="flex min-h-[350px] w-full grow flex-col"
          >
            <div className="my-auto h-min space-y-8">
              <h1 className="mx-auto max-w-lg text-center text-4xl font-extrabold text-yellow-200">
                Welcome to the Resource Center for Auditory Training!
              </h1>
              <div className="mx-auto flex w-[350px] flex-col space-y-4 rounded-md border border-neutral-500 bg-neutral-900 p-4 shadow-lg shadow-neutral-800/50 sm:w-[400px]">
                <p className="text-center text-2xl text-neutral-100">
                  Looking for resource recommendations?
                </p>
                <Link
                  href="/resources/search"
                  className="flex-inline mx-auto flex animate-expand_in_out rounded-md border border-neutral-300 bg-yellow-400 p-2 font-bold hover:bg-yellow-100"
                >
                  Search for Auditory Resources
                  <ArrowUpRightIcon className="inline w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <main>
        <section className="grid min-h-[300px] place-items-center border border-b border-neutral-400 bg-yellow-100 p-4 text-white drop-shadow-md sm:p-12">
          <div className="flex max-w-5xl flex-col-reverse justify-center divide-neutral-700 md:flex-row md:divide-x md:divide-y-0">
            <section className="px-4 text-neutral-800">
              <p className="pt-2">
                You can use the <TextLink href="/resources">Resources</TextLink>{" "}
                tab to scroll through the list of all resources, or the{" "}
                <TextLink href="/resources/search">Search</TextLink> tab to
                filter resources based on your preferences and skill level. We
                also have an <TextLink href="/about">About</TextLink> tab to
                learn more about the creators of this website and a{" "}
                <TextLink href="/contact">Contact Us</TextLink> tab to submit
                any comments or questions you have about the site and auditory
                training in general. We hope you find this website helpful in
                your auditory training journey, and we are here to support you
                every step of the way.
              </p>
            </section>
            <h1 className="pr-auto my-auto h-full grow p-4 text-center text-4xl font-bold text-black">
              Getting Started
            </h1>
          </div>
        </section>

        <section className="grid min-h-[300px] place-items-center border-y border-t border-yellow-200 bg-neutral-900 p-4 text-white sm:p-12">
          <div className="mx-auto my-auto flex max-w-5xl flex-col divide-y divide-white md:flex-row md:divide-x md:divide-y-0">
            <h1 className="pr-auto my-auto h-full grow p-4 text-center text-4xl font-bold text-yellow-200">
              Our Purpose
            </h1>
            <section className="px-4 text-neutral-300">
              <p className="pt-2">
                The goal of this site is to provide resources for cochlear
                implant users to practice listening with their device. While
                cochlear implants are highly effective in providing access to
                speech sounds for patients, it can take time and practice for
                them to adjust to the new signal transmitted through the
                implant. Auditory training can assist cochlear implant users in
                practicing listening to environmental sounds, understanding
                speech sounds in both quiet and noisy environments, and
                (re)training to enjoy music. We have compiled and categorized
                all available auditory training resources for cochlear implant
                users, including smartphone, web-based, and other online
                resources that can be utilized as clinician-guided or home-based
                by the cochlear implant patient and their families. Our online
                index allows both professionals and patients to filter through
                the resources based on specific characteristics and requested
                features, making the selection process more efficient.
              </p>
            </section>
          </div>
        </section>

        <div className="mx-auto mb-12 max-w-5xl p-4 sm:p-12">
          <h1 className="text-center text-2xl font-extrabold sm:text-4xl">
            Want to learn more?
          </h1>
          <div className="mx-auto flex w-fit flex-col space-y-6 pt-8">
            <section className="flex flex-row justify-between space-x-4">
              <h2 className="text-md my-auto inline-block italic sm:text-lg">
                Learn more about the project
              </h2>
              <span className="my-auto hidden h-[1px] grow border border-dashed border-neutral-400 sm:block" />
              <Link
                href="/about"
                className="inline-block rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow-lg shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
              >
                About
                <ArrowUpRightIcon className="inline-block w-5 align-middle" />
              </Link>
            </section>
            <section className="flex flex-row justify-between space-x-4">
              <h2 className="text-md my-auto inline-block italic sm:text-lg">
                Get in touch with the team
              </h2>
              <span className="my-auto hidden h-[1px] grow border border-dashed border-neutral-400 sm:block" />
              <Link
                href="/contact"
                className="inline-block rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow-lg shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
              >
                Contact
                <ArrowUpRightIcon className="inline-block w-5 align-middle" />
              </Link>
            </section>
            <section className="flex flex-row justify-between space-x-4">
              <h2 className="text-md my-auto inline-block italic sm:text-lg">
                Suggest changes and improvements
              </h2>
              <a
                target="_blank"
                href="https://forms.gle/FD2abgwBuTaipysZ6"
                className="inline-block flex flex-row rounded-md border border-neutral-900 bg-yellow-200 px-4 py-2 align-middle font-semibold shadow-lg shadow-black/50 duration-200 ease-out hover:bg-yellow-300 hover:shadow-md"
              >
                Give Feedback
                <ArrowUpRightIcon className="inline w-5 align-middle" />
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
