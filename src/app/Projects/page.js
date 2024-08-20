import Project from "../components/project"
import { Roboto_Condensed } from "next/font/google"

const rob_condensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "Grant Zou | Projects",
  description: "Some projects that I've worked on"
}

export default function Page(){
    return(
    <main>
        <div className="mb-[10vh]"> 
            <h1 className={rob_condensed.className + " font-light text-center text-7xl mt-20"}>Projects</h1>
            <div className="flex flex-wrap flex-col content-center">
                <Project 
                Title="The Philosophy Club at UVA Website"
                Skills={['React', 'Tailwind', 'GraphQL', 'Gatsby']}
                Preview="Developed the website for The Philosophy Club at UVA using React and Gatsby. 
                It is featured on the UVA Philosophy Department website."
                Description="As the first webmaster for the Philosophy Club at UVA, I developed the club site from the ground up using React and Gatsby as a framework. 
                The site contains club information, semester schedules, and contact information.
                To achieve flexible and responsive designs, I employed Tailwind CSS for styling. Our website is integrated with Hygraph, a content management system, to facilitate seamless content updates for events, archives, and executive board information. 
                This setup empowers other club executives to manage site content efficiently without the need to directly edit the source code. 
                Data retrieval is streamlined through GraphQL queries to Hygraph."
                ImageUrl="/static/images/phil-club-logo.png"
                Link="https://uvaphilclub.github.io"
                LinkText="Visit"
                /> 
                <Project 
                Title="The Contemplative Cavalier Website"
                Skills={['React', 'Tailwind', 'GraphQL', 'NextJs']}
                Preview="Developed the website for UVA's premier undergraduate philosophy journal The Contemplative Cavalier."
                Description="As the inaugural webmaster of The Contemplative Cavalier, I led the development of our site using React and Next.js as foundational frameworks. 
                Our platform caters to readers and contributors interested in engaging with our journal content.
                The site boasts responsive and visually appealing designs crafted with Tailwind CSS. 
                To manage journal issues and executive information efficiently, we leverage Hygraph as our content repository. 
                Data retrieval is seamlessly integrated via Hygraph's GraphQL interface, ensuring robust and streamlined operations."
                ImageUrl="/static/images/cont-cav-logo.png"
                Link="https://the-contemplative-cavalier.vercel.app"
                LinkText="Visit"
                />
                <Project 
                Title="UVA Club Running Website"
                Skills={['JavaScript', 'HTML', 'CSS']}
                Preview="Developer on the UVA Club Running website team"
                Description="As a member of the UVA Club Running web development team, I collaborate with two teammates to continuously enhance and maintain the site's functionality. 
                Our responsibilities include implementing new features and making necessary modifications to ensure the site remains current and functional.
                The site serves as a comprehensive resource, providing essential club details such as practice schedules, meet information, and contact details. 
                It plays a crucial role in outreach efforts to attract new members and engage with the community."
                ImageUrl="/static/images/club_running.jpg"
                Link="https://virginia.clubrunning.org"
                LinkText="Visit"
                />
                <Project 
                Title="Theme Song Bot"
                Skills = {['Python', 'Discord API']}
                Preview="Developed a Discord bot using Python and the Discord API that plays user set music when they join voice calls."
                Description="The program utilizes youtube-dl to extract audio from any YouTube URL provided by the user, which is then played using FFmpeg. 
                It features options to enable or disable the bot as needed, along with functionality to list all users and their selected music.
                Currently deployed on my Discord server with over 100 members, the bot enhances user experience as a fun feature."
                ImageUrl="/static/images/github.png"
                Link="https://github.com/grantbtzou/theme-song-bot"
                LinkText="View on Github"
                />
                <Project 
                Title="Multi-language Development Security Trends"
                Skills={['Python', 'Security']}
                Preview="Research assistant at the George Mason University Sun Security Lab working on projects investigating patterns 
                in multi-(coding)language software."
                Description="Our goal is to understand the trends and vulnerabilities present in these 
                programs in order to prevent security weaknesses. Using Python, I retrieve GitHub commits from diverse repositories spanning languages such as C, C++, Rust, Python, Java, JavaScript, HTML, and CSS. 
                I analyze these commits to uncover commonalities, employing both automated Python scripts for data extraction and spreadsheet creation, as well as manual examination leveraging my background in these languages. 
                Our primary focus is on the Django web framework, and we anticipate publishing our findings soon."
                /> 
                <Project 
                Title="Source Film Maker Animation"
                Skills={['SFM','Video Editing', 'Key Framing']}
                Preview="Animated a short film using Valve's Source Film Maker software."
                Description="I taught myself basic keyframing, lighting, and editing. The final video was exported as an image sequence and compiled in Blender."
                ImageUrl="/static/images/SFM.png"
                Link="https://www.youtube.com/watch?v=K4jNCaaESw0"
                LinkText="Watch"
                /> 
                <Project 
                Title="GrantZou.dev"
                Skills={['React', 'Tailwind', 'NextJs']}
                Preview="Developed this personal website and visualized probability simulations using React."
                Description="Thanks for visiting!"
                />
            </div>
        </div>
    </main>
    )
}