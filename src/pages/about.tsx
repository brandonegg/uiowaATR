import { type NextPage } from "next/types";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

type Position = "left" | "right";
interface Biography {
    name: string;
    title: string;
    body: string;
    img: string;
    position: Position;
}

const Biopgraphy = ({name, title, body, img, position}: Biography) => {
    return (
        <section className={"shadow-xl bg-yellow-100 grid grid-cols-3 border-4 rounded-2xl border-neutral-900 col-span-2 overflow-hidden" + (position === 'right' ? " lg:col-start-2 lg:rotate-3" : " lg:-rotate-3")}>
            <div style={{
                backgroundImage: `url("${img}")`,
                backgroundPosition: `center`,
                backgroundSize: 'cover',
            }} />
            <div className="col-span-2 p-4">
                <b>{name}, {title}</b>, {body}
            </div>
        </section>
    );
};

const biographies: Biography[] = [
    {
        name: "Olivia Adamson",
        title: "B.A",
        body: "is a dedicated audiology graduate student at the University of Iowa, originally from a small town in southeast Minnesota. She earned her Bachelor of Arts in Communication Sciences and Disorders from Augustana University in Sioux Falls, SD, in 2020. Olivia Adamson is currently immersed in her fourth-year externship at Gundersen Health System in LaCrosse, WI, where she works with patients of all ages, performs comprehensive diagnostic assessments, provides vestibular assessments, and specializes in hearing aids and cochlear implants. With a passion for aural rehabilitation, particularly for older adults, Olivia is dedicated to enhancing the quality of life for individuals with hearing loss. She aspires to empower patients to take control of their hearing journey through this resource. Upon completing her externship, Olivia will graduate with her Au.D. in May 2024.",
        img: "/profiles/olivia-adamson.jpeg",
        position: "right",
    },
    {
        name: "Dr. Eun Kyung (Julie) Jeon",
        title: "Au.D., Ph.D.",
        body: "is a Clinical Assistant Professor in Communication Sciences and Disorders at the University of Iowa. She earned both her Au.D. and Ph.D. degrees from the University of Iowa in 2008 and 2016, respectively. Dr. Jeon's research and clinical interests focus on aural (re)habilitation for children and adults with hearing aids and cochlear implants. She has served as a reviewer for various journals, including Ear and Hearing and Cochlear Implant International. Dr. Jeon is an active member of several professional organizations, such as the American Academy of Audiology (AAA), the American Cochlear Implant Alliance (ACIA), the American Speech-Language-Hearing Association (ASHA), the Iowa Speech-Language-Hearing Association (ISHA), and the Asia Pacific Society of Speech-Language-Hearing (APSSLH). Currently, she has been entrusted with various leadership responsibilities, including educational committee officer for the APSSLH, Member-at-Large for the Iowa Speech Language Hearing Foundation, Iowa EHDI Advisory Board representative for the ISHA, and program committee member for the CI2023 conference.",
        img: "/profiles/jeon-eunkyung.jpg",
        position: "left",
    }
]

const About: NextPage = () => {
  
    return <>
        <Header />
        <main>
            <div style={{
                backgroundImage: `url("/backdrops/uiowa-aerial.jpeg")`,
                backgroundPosition: `center`,
            }} className="h-96">
                <div style={{
                WebkitBackdropFilter: `blur(5px) contrast(50%)`,
                backdropFilter: `blur(5px) contrast(50%)`,
                }} className="h-full w-full grid place-items-center">
                    <div className="space-y-8">
                        <h1 className="mx-auto text-center font-extrabold text-5xl max-w-lg text-yellow-200">About Us</h1>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="mx-auto max-w-7xl p-8">
                    <div className="mx-auto bg-neutral-900 p-4 w-96 rounded-xl mt-8 mb-20 border-2 border-neutral-300">
                        <h1 className="text-white text-4xl font-bold text-center">Meet the Team</h1>
                    </div>
                    <div className="mt-16 mb-32 grid grid-cols-2 lg:grid-cols-3 mt-4 space-y-24">
                        {biographies.map((biography, index) => {
                            return (
                                <Biopgraphy key={index} {...biography} />
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
    </>
};

export default About
