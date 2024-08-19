import Image from "next/image";
import { Roboto, Roboto_Serif } from "next/font/google";
import { Roboto_Flex } from 'next/font/google';

const robF = Roboto_Flex({ 
  subsets: ["latin"],
 });

export default function Home() {
  return (
    <main className="flex grow">
       <div className="flex justify-center items-center grow">
        <div className="flex flex-wrap justify-center items-start gap-x-4 mt-16 md:-mt-16">
          <div className="rounded-full overflow-hidden">
            <Image src="/images/Grant.jpg" width={250}height={250}/>
          </div>
          <div className="flex flex-wrap flex-col mx-8 md:mx-0 md:max-w-md lg:max-w-lg mb-[15vh] mt-4 md:mb-0">
            <h1 className="text-5xl font-bold">Grant Zou</h1>
            <p className="text-2xl font-bold">University of Virginia - 3rd Year</p>
            <p className="text-2xl font-bold">Computer Science and Statistics</p>
            <div className={robF.className}>
            <p className="text-xl mt-2">I'm interested in understanding the world, why things work, and solving problems in a wide range of areas.</p>
            <p className="text-xl mt-2">Aside from CS and Statistics, one of my primary interests is philosophy where I like to focus on argumentation, knowledge, and free will.
              I am the webmaster for the Philsophy Club at UVA and The Contemplative Cavalier which can be viewed under my projects page. 
              I also love running and compete with UVA Club Running while contributing to the club website.</p>
            </div>
          </div>
        </div>
        </div>
    </main>
  );
}
