import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { type NextPage } from "next/types";

const About: NextPage = () => {
  
    return (
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
                        <h1 className="mx-auto text-center font-extrabold text-5xl max-w-lg text-black">About Us</h1>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default About