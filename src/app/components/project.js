'use client'
import { useState } from 'react';
import { Roboto } from "next/font/google";
import { Roboto_Flex } from 'next/font/google';
import Image from 'next/image';

const robF = Roboto_Flex({subsets:["latin"]});

const rob = Roboto({ 
  subsets: ["latin"],
  weight: ['400', '700'],
 });

export default function Project({Title, Skills, Preview, Description, ImageUrl, Link, LinkText}){
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
      setIsExpanded(!isExpanded);
    };
  

    return(
      <div className="flex flex-wrap justify-between mt-12 mx-8 p-4 bg-slate-200 shadow-2xl rounded-2xl overflow-hidden">
          <div className="max-w-3xl relative ">
              <h1 className="text-4xl">{Title}</h1>
              <div className="flex flex-wrap my-1 gap-x-2">
                  {Skills.map(((skill, index) => 
                      <div key={index} className="bg-gray-400 p-1 rounded-md">{skill}</div>
                  ))}
              </div>
              {Link && ImageUrl && LinkText && 
              <div className="flex flex-wrap flex-col justify-center mx-auto max-w-[125px] lg:hidden">
              <div className="rounded-full overflow-hidden my-2">
                  <a href={Link}>
                  <Image src={ImageUrl} height={125} width={125}/></a>
              </div>
              <a href={Link}>
              <p className="text-center underline">{LinkText}</p></a>
              </div>
              }
              <p className={robF.className + " text-xl"}>{Preview}</p>
              <div className="h-2"></div>
              <button onClick={toggleExpand}
              className={`absolute bottom-0 -mt-8 ml-2 w-0 h-0 border-l-[36px] border-r-[36px] border-t-[16px] border-x-transparent border-t-black ${isExpanded ? 'transform -rotate-180 duration-500 ease-in-out' : 'duration-500 ease-in-out'}`}
              ></button>
              <div className={`mt-4 overflow-hidden transition-max-height duration-500 ease-in-out ${isExpanded ? 'max-h-screen mb-6' : 'max-h-0'}`}>
                  <p className={robF.className + " text-lg"}>{Description}</p>
              </div>
          </div>
          {Link && ImageUrl && LinkText && 
          <div className="flex flex-wrap flex-col hidden lg:block">
              <div className="rounded-full overflow-hidden">
                  <a href={Link}>
                  <Image src={ImageUrl} height={125} width={125}/></a>
              </div>
              <a href={Link}>
              <p className="text-center underline mt-2">{LinkText}</p></a>
          </div>
          }
      </div>
    )
}