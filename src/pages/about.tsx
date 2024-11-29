import { type NextPage } from "next/types";
import Image from "next/image";
import { HandRaisedIcon } from "@heroicons/react/24/solid";
import { HeaderFooterLayout } from "~/layouts/HeaderFooterLayout";

type Position = "left" | "right";
interface Biography {
  name: string;
  bodyName: string;
  title: string;
  body: string;
  img: string;
  position: Position;
}

const Biopgraphy = ({
  bodyName,
  name,
  title,
  body,
  img,
  position,
}: Biography) => {
  return (
    <section
      className={
        "col-span-2 flex flex-col overflow-hidden border-y-2 border-neutral-900 bg-yellow-100 p-2 shadow-xl sm:space-y-2 sm:rounded-2xl sm:border-2 sm:p-4" +
        (position === "right" ? " lg:col-start-2 lg:rotate-3" : " lg:-rotate-3")
      }
    >
      <div className="mb-2 flex flex-row items-center space-x-8">
        <Image
          src={img}
          alt={`${name} profile`}
          width={128}
          height={128}
          className="rounded-lg border border-neutral-900 shadow-md shadow-neutral-600/50"
        />
        <div className="">
          <h1 className="text-2xl font-bold">{name}</h1>
          <h2 className="italic text-neutral-600">{title}</h2>
        </div>
      </div>
      <div className="col-span-2 rounded-lg border border-neutral-900 bg-white p-2">
        {bodyName} {body}
      </div>
    </section>
  );
};

const biographies: Biography[] = [
  {
    name: "Olivia Adamson",
    bodyName: "Olivia",
    title: "B.A",
    body: "is currently working as a clinical audiologist at Gundersen Health System (Emplify Health) in La Crosse, Wisconsin. There she works with patients across the lifespan helping them reach their hearing goals. She works with hearing aids, bone conduction devices, and cochlear implants. She earned her Bachelor of Arts in Communication Sciences and Disorders from Augustana University in Sioux Falls, SD, in 2020. She then continued on to receive her Doctorate of Audiology at the University of Iowa in 2024.",
    img: "/profiles/olivia-adamson.jpeg",
    position: "right",
  },
  {
    name: "Dr. Eun Kyung (Julie) Jeon",
    bodyName: "Julie",
    title: "Au.D., Ph.D.",
    body: "is a Clinical Assistant Professor in Communication Sciences and Disorders at the University of Iowa. She earned both her Au.D. and Ph.D. degrees from the University of Iowa in 2008 and 2016, respectively. Dr. Jeon's research and clinical interests focus on aural (re)habilitation for children and adults with hearing aids and cochlear implants. She has served as a reviewer for various journals, including Ear and Hearing and Cochlear Implant International. Dr. Jeon is an active member of several professional organizations, such as the American Academy of Audiology (AAA), the American Cochlear Implant Alliance (ACIA), the American Speech-Language-Hearing Association (ASHA), the Iowa Speech-Language-Hearing Association (ISHA), and the Asia Pacific Society of Speech-Language-Hearing (APSSLH). Currently, she has been entrusted with various leadership responsibilities, including educational committee officer for the APSSLH, Member-at-Large for the Iowa Speech Language Hearing Foundation, Iowa EHDI Advisory Board representative for the ISHA, and program committee member for the CI2023 conference.",
    img: "/profiles/jeon-eunkyung.jpg",
    position: "left",
  },
];

const About: NextPage = () => {
  return (
    <HeaderFooterLayout>
      <div
        style={{
          backgroundImage: `url("/backdrops/uiowa-aerial.jpeg")`,
          backgroundPosition: `center`,
        }}
        className="h-96"
      >
        <div
          style={{
            WebkitBackdropFilter: `blur(5px) contrast(50%)`,
            backdropFilter: `blur(5px) contrast(50%)`,
          }}
          className="grid h-full w-full place-items-center"
        >
          <div className="space-y-8">
            <h1 className="mx-auto max-w-lg text-center text-5xl font-extrabold text-yellow-200">
              About Us
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="mx-auto max-w-7xl">
          <div className="sm:p-8">
            {/** Small screens */}
            <div className="w-full border-b-2 border-yellow-400 bg-neutral-900 p-4 sm:hidden">
              <h1 className="text-center text-4xl font-bold text-white">
                Meet the Team
                <HandRaisedIcon className="animate-hand_pop ml-4 inline w-12 rotate-12 animate-hand_wave text-yellow-200" />
              </h1>
            </div>
            {/** Large screens */}
            <div className="mx-auto mx-auto mb-20 mt-8 hidden w-max rounded-xl border-2 border-neutral-300 bg-neutral-900 p-4 shadow-xl sm:block">
              <h1 className="text-center text-4xl font-bold text-white">
                Meet the Team
                <HandRaisedIcon className="ml-4 inline w-12 rotate-12 animate-hand_wave text-yellow-200" />
              </h1>
            </div>

            {/** Biographies (both small & large screens) */}
            <div className="grid grid-cols-2 sm:my-16 sm:mt-4 sm:space-y-12 lg:grid-cols-3 lg:space-y-24">
              {biographies.map((biography, index) => {
                return <Biopgraphy key={index} {...biography} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </HeaderFooterLayout>
  );
};

export default About;
