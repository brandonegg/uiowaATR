import { type NextPage } from "next/types";
import Image from 'next/image';

const Footer: NextPage = () => {
    return (
        <div className="w-full mt-12">
            {/** yellow stripe */}
            <div className="bg-yellow-400 border-t-[1px] border-neutral-400 p-[4px]"></div>

            {/** Main footer area */}
            <div className="p-4 bg-neutral-800 flex-row">
                <div className="flex-col">
                    <Image alt="University of Iowa logo" width={128} height={64} src="/IOWA-gold-text.png" />
                    <div className="px-2 text-neutral-100">
                        <p className="text-yellow-300 italic">Wendell Johnson Speech and Hearing Center</p>
                        <p>250 Hawkins Dr</p>
                        <p>Iowa City, IA 52242</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
