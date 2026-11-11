import Project from "@/app/components/Project"
import { Roboto_Condensed } from "next/font/google"

const robCondensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata = {
  title: "Grant Zou | Projects",
  description: "Some projects that I've worked on"
}

export default function Page(){
    return(
    <main>
        <div className="mb-[10vh]"> 
            <h1 className={robCondensed.className + " font-light text-center text-7xl mt-20"}>Projects</h1>
            <div className="flex flex-wrap flex-col content-center">
                <Project 
                title="Run 2 The Moon"
                skills={['React', 'Express', 'MongoDB', 'Leaflet']}
                preview="Created a web app for runners to map the mileage from their runs onto 
                routes anywhere in the world"
                description="To provide motivation for runners, I developed an app so that they can map their mileage onto a route anywhere in the world
                to see a visual representation of their progress. 
                The project utilizes a MERN stack with MongoDB for data persistence, ExpressJS to handle data logic, React and NextJS as the frontend framework, 
                all on a NodeJS environment. The app connects with Strava, a popular run logging app, through the Strava API, so that runs uploaded to Strava are automatically counted 
                towards your progress. The maps are provided through the open source library Leaflet, and route calculation uses the MapBox directions API."
                imageUrl={'/static/images/moon.png'}
                link="https://run-2-the-moon.vercel.app"
                linkText="Visit"/> 
                 <Project 
                title="Multi-language Development Security Trends"
                skills={['Python', 'Security']}
                preview="Research assistant at the George Mason University Sun Security Lab working on projects investigating patterns 
                in multi-(coding)language software."
                description="Published work on the trends in security patches of open-source software, focused on identifying key patterns
                and vulnerabilities with the goal of understanding the trends and vulnerabilities present in these 
                programs in order to prevent security weaknesses. Using Python, I retrieved GitHub commits from diverse repositories spanning languages such as C, C++, Rust, Python, Java, JavaScript, HTML, and CSS. 
                I analyzed these commits to uncover commonalities, employing both automated Python scripts for data extraction and spreadsheet creation, as well as manual examination leveraging my background in these languages. 
                "
                imageUrl="/static/images/mason.jpg"
                link="https://doi.org/10.1007/978-3-031-97623-0_8"
                linkText="Read Here"
                /> 
                <Project 
                title="The Philosophy Club at UVA Website"
                skills={['React', 'Tailwind', 'GraphQL', 'Gatsby']}
                preview="Developed the website for The Philosophy Club at UVA using React and Gatsby. 
                It is featured on the UVA Philosophy Department website."
                description="As the first webmaster for the Philosophy Club at UVA, I developed the club site from the ground up using React and Gatsby as a framework. 
                The site contains club information, semester schedules, and contact information.
                To achieve flexible and responsive designs, I employed Tailwind CSS for styling. Our website is integrated with Hygraph, a content management system, to facilitate seamless content updates for events, archives, and executive board information. 
                This setup enables other club executives to manage site content efficiently without the need to directly edit the source code. 
                Data retrieval is streamlined through GraphQL queries to Hygraph."
                imageUrl="/static/images/phil-club-logo.png"
                link="https://uvaphilclub.github.io"
                linkText="Visit"
                /> 
                <Project 
                title="The Contemplative Cavalier Website"
                skills={['React', 'Tailwind', 'GraphQL', 'NextJs']}
                preview="Developed the website for UVA's premier undergraduate philosophy journal The Contemplative Cavalier."
                description="As the inaugural webmaster of The Contemplative Cavalier, I led the development of our site using React and Next.js as foundational frameworks. 
                Our platform caters to readers and contributors interested in engaging with our journal content.
                The site boasts responsive and visually appealing designs crafted with Tailwind CSS. 
                To manage journal issues and executive information efficiently, we leverage Hygraph as our content repository. 
                Data retrieval is seamlessly integrated via Hygraph's GraphQL interface, ensuring robust and streamlined operations."
                imageUrl="/static/images/cont-cav-logo.png"
                link="https://the-contemplative-cavalier.vercel.app"
                linkText="Visit"
                />
                <Project 
                title="UVA Club Running Website"
                skills={['JavaScript', 'HTML', 'CSS']}
                preview="Developer on the UVA Club Running website team"
                description="As a member of the UVA Club Running web development team, I collaborate with two teammates to continuously enhance and maintain the site's functionality. 
                Our responsibilities include implementing new features and making necessary modifications to ensure the site remains current and functional.
                The site serves as a comprehensive resource, providing essential club details such as practice schedules, meet information, and contact details. 
                It plays a crucial role in outreach efforts to attract new members and engage with the community."
                imageUrl="/static/images/club_running.jpg"
                link="https://virginia.clubrunning.org"
                linkText="Visit"
                />
                <Project 
                title="Theme Song Bot"
                skills={['Python', 'Discord API']}
                preview="Developed a Discord bot using Python and the Discord API that plays user set music when they join voice calls."
                description="The program utilizes youtube-dl to extract audio from any YouTube URL provided by the user, which is then played using FFmpeg. 
                It features options to enable or disable the bot as needed, along with functionality to list all users and their selected music.
                Currently deployed on my Discord server with over 100 members, the bot enhances user experience as a fun feature."
                imageUrl="/static/images/github.png"
                link="https://github.com/grantbtzou/theme-song-bot"
                linkText="View on Github"
                />
                <Project 
                title="Source Film Maker Animation"
                skills={['SFM','Video Editing', 'Key Framing']}
                preview="Animated a short film using Valve's Source Film Maker software."
                description="I taught myself basic keyframing, lighting, and editing. The final video was exported as an image sequence and compiled in Blender."
                imageUrl="/static/images/SFM.png"
                link="https://www.youtube.com/watch?v=K4jNCaaESw0"
                linkText="Watch"
                /> 
                <Project 
                title="GrantZou.dev"
                skills={['React', 'Tailwind', 'NextJs']}
                preview="Developed this personal website and visualized probability simulations using React."
                description="Thanks for visiting!"
                />
            </div>
        </div>
    </main>
    )
}