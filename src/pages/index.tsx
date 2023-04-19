import { type NextPage } from "next";
import Link from "next/link";
import { ArrowUpRightIcon } from '@heroicons/react/20/solid';
import Footer from "~/components/Footer";
import Header from "~/components/Header";

const TextLink = ({href, children}: {
  href: string,
  children: string,
}) => {
  return (
    <Link href={href} className="inline-block text-sm align-items-center hover:bg-neutral-900 hover:text-white border border-neutral-900 rounded-md py-[2px] px-[4px]">
      {children} 
      <ArrowUpRightIcon className="inline-block w-4" />
    </Link>
  )
}

const Home: NextPage = () => {
  
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div style={{
              backgroundImage: `url("/backdrops/patient-clinic-bg.jpeg")`,
              backgroundPosition: `center`,
              backgroundRepeat: `no-repeat`,
            }} className="grow flex flex-col">
              <div style={{
                WebkitBackdropFilter: `blur(15px) contrast(50%)`,
                backdropFilter: `blur(15px) contrast(50%)`,
              }} className="grow min-h-[350px] w-full flex flex-col">
                <div className="space-y-8 my-auto h-min">
                  <h1 className="mx-auto text-center font-extrabold text-4xl max-w-lg text-yellow-200">Welcome to the Resource Center for Auditory Training!</h1>
                  <div className="flex flex-col w-[350px] sm:w-[400px] mx-auto p-4 bg-neutral-900 border space-y-4 border-neutral-500 rounded-md shadow-lg shadow-neutral-800/50">
                    <p className="text-2xl text-center text-neutral-100">Looking for resource recommendations?</p>
                    <Link href="/resources/search" className="flex flex-inline font-bold border border-neutral-300 mx-auto bg-yellow-400 hover:bg-yellow-100 p-2 rounded-md animate-expand_in_out">
                      Search for Auditory Resources
                      <ArrowUpRightIcon className="inline w-5" />
                    </Link>
                  </div>
                </div>
              </div>
          </div>
      </div>
      <main>
        <section className="min-h-[300px] grid place-items-center p-4 sm:p-12 bg-yellow-100 text-white drop-shadow-md border border-b border-neutral-400">
          <div className="max-w-5xl flex justify-center flex-col-reverse md:flex-row md:divide-y-0 md:divide-x divide-neutral-700">
            <section className="px-4 text-neutral-800">
              <p className="pt-2">You can use the <TextLink href="/resources">Resources</TextLink> tab to scroll through the list of all resources, or the <TextLink href="/resources/search">Search</TextLink> tab to filter resources based on your preferences and skill level. We also have an <TextLink href="/about">About</TextLink> tab to learn more about the creators of this website and a <TextLink href="/contact">Contact Us</TextLink> tab to submit any comments or questions you have about the site and auditory training in general. We hope you find this website helpful in your auditory training journey, and we are here to support you every step of the way.</p>
            </section>
            <h1 className="grow h-full my-auto pr-auto text-4xl font-bold p-4 text-center text-black">Getting Started</h1>
          </div>
        </section>

        <section className="min-h-[300px] grid place-items-center p-4 sm:p-12 bg-neutral-900 text-white border-t border-y border-yellow-200">
          <div className="my-auto max-w-5xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white mx-auto">
            <h1 className="grow h-full my-auto pr-auto text-4xl p-4 font-bold text-center text-yellow-200">Our Purpose</h1>
            <section className="px-4 text-neutral-300">
              <p className="pt-2">The goal of this site is to provide resources for cochlear implant users to practice listening with their device. While cochlear implants are highly effective in providing access to speech sounds for patients, it can take time and practice for them to adjust to the new signal transmitted through the implant. Auditory training can assist cochlear implant users in practicing listening to environmental sounds, understanding speech sounds in both quiet and noisy environments, and (re)training to enjoy music. We have compiled and categorized all available auditory training resources for cochlear implant users, including smartphone, web-based, and other online resources that can be utilized as clinician-guided or home-based by the cochlear implant patient and their families. Our online index allows both professionals and patients to filter through the resources based on specific characteristics and requested features, making the selection process more efficient.</p>
            </section>
          </div>
        </section>
        
        <div className="max-w-5xl mx-auto p-4 sm:p-12 mb-12">
          <h1 className="font-extrabold text-2xl sm:text-4xl text-center">Want to learn more?</h1>
          <div className="flex flex-col pt-8 space-y-6 mx-auto w-fit">
            <section className="space-x-4 flex flex-row justify-between">
              <h2 className="italic text-md my-auto inline-block sm:text-lg">
                Learn more about the project
              </h2>
              <span className="hidden sm:block grow border border-dashed border-neutral-400 h-[1px] my-auto" />
              <Link href="/about" className="font-semibold align-middle inline-block ease-out duration-200 hover:shadow-md hover:bg-yellow-300 shadow-lg shadow-black/50 px-4 py-2 bg-yellow-200 rounded-md border border-neutral-900">
                About
                <ArrowUpRightIcon className="inline-block align-middle w-5" />
              </Link>
            </section>
            <section className="space-x-4 flex flex-row justify-between">
              <h2 className="italic text-md my-auto inline-block sm:text-lg">
                Get in touch with the team
              </h2>
              <span className="hidden sm:block grow border border-dashed border-neutral-400 h-[1px] my-auto" />
              <Link href="/contact" className="font-semibold align-middle inline-block ease-out duration-200 hover:shadow-md hover:bg-yellow-300 shadow-lg shadow-black/50 px-4 py-2 bg-yellow-200 rounded-md border border-neutral-900">
                Contact
                <ArrowUpRightIcon className="inline-block align-middle w-5" />
              </Link>
            </section>
            <section className="space-x-4 flex flex-row justify-between">
              <h2 className="italic text-md my-auto inline-block sm:text-lg">
                Tell us how we&rsquo;re doing!
              </h2>
              <a target="_blank" href='https://forms.gle/FD2abgwBuTaipysZ6' className="flex flex-row font-semibold align-middle inline-block ease-out duration-200 hover:shadow-md hover:bg-yellow-300 shadow-lg shadow-black/50 px-4 py-2 bg-yellow-200 rounded-md border border-neutral-900">
                Give Feedback
                <ArrowUpRightIcon className="inline align-middle w-5" />
              </a>
            </section>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  );
};

export default Home;
