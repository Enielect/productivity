import {
  BicepsFlexed,
  ChartLine,
  Check,
  CircleCheckBig,
  MoveUpRight,
  Scan,
  ShieldHalf,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

const Homepage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <SecondSection />
      <ThirdSection />
      <Bio />
      <Footer />
    </div>
  );
};

function Header() {
  return (
    <header className="flex items-center justify-between px-7">
      <div className="flex items-center space-x-3">
        <Image width={50} height={50} alt="logo" src="/productivity.png" />
        <span>Pepductivity</span>
      </div>
      <nav className="space-x-4">
        <a>Home</a>
        <a>About</a>
        <a>Services</a>
        <a href="#">Contact</a>
      </nav>
      <Button>Sign Up</Button>
    </header>
  );
}

function Button({
  children,
  ...props
}: {
  children: ReactNode & ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button {...props} className="rounded-full bg-blue-500 px-3 py-2">
      {children}
    </button>
  );
}

function Hero() {
  return (
    <section className="flex h-[calc(100dvh-100px)] flex-col justify-center gap-7 text-center">
      <h2 className="text-3xl font-semibold">
        Best Way to keep consistency in completing tasks
      </h2>
      <p>Analytics oriented approach to manage taks and tasks completion</p>
      <div>
        <Button>Get Started</Button>
      </div>
    </section>
  );
}

function SecondSection() {
  return (
    <section className="grid grid-cols-3 gap-5 bg-blue-600 px-[5rem] py-[2rem]">
      <Card
        firstIcon={<Sparkles />}
        header="Bright and Assured"
        summary="Get an oppurtunity to be better than ever before"
      />
      <Card
        firstIcon={<BicepsFlexed />}
        header="Boost Confidence"
        summary="improve your confidence in the process of planning your tasks"
      />
      <Card
        firstIcon={<ShieldHalf />}
        header="Be Immune to Previous Regrets"
        summary="Immunity to the illusions of efficiency in executing your goals in an unanalytic system"
      />
      <Card
        firstIcon={<Scan />}
        header="Easy to Follow Procedure"
        summary="navigating the application is as easy as it can get, helping you bring the best out of yourself"
      />
      <Card
        firstIcon={<ChartLine />}
        header="Analysis Driven"
        summary="Get to view the analytics of your progress againt your best moement, and get pumped to beat it"
      />
    </section>
  );
}

function ThirdSection() {
  return (
    <section className="grid grid-cols-2 gap-6 px-5 py-5">
      <div>image</div>
      <div>
        <h3 className="py-3 text-justify text-2xl font-semibold">
          Key Benefits of Our System for your Productivity{" "}
        </h3>
        <p className="my-4 text-sm">
          Our sytem boosts productivity, cuts hassle, and drive self confidence
        </p>
        <div className="space-y-4">
          <CheckPoint
            header="Boosting Quality with Analytics"
            content="with some graphs plotted for the task created agains some of your best moment and previous week, you can have a feel of where you are at, in order to know how to improve"
          />
          <CheckPoint
            header="Note taking Incoporated"
            content="we adding a note taking page, where quick ideas can be written in markdown, and in an an interactive way(e.g links can be renderred as clickable, check boxed can be checked and unchecekd, tables can be added, and a lot more)"
          />
          <CheckPoint
            header="Report at the end of week"
            content="you get to go over the task completed for each week, noting your strong points, the ones you completd and didnt, the analyis of each day beside the task, ansd access to the summary of the completed tasks you provided"
          />
        </div>
      </div>
    </section>
  );
}

function Bio() {
  return (
    <section className="mx-auto my-4 max-w-[60vw] rounded-md bg-blue-400 px-3 py-3 text-justify">
      <header className="text-center">Developer</header>
      <strong>Abayomi Eniola Faithful</strong>
      <article>
        I built this project to help myself improve in planning my tasks. I had
        a strong need to evacuate the illusion of how successfull I have been in
        day, and so analytics of my tasks seemed like the best solution, and
        there you have it, I embaked on this wonderful project
      </article>
      <div>
        <span>Tech stack for this project</span>
        <ul>
          <li>NextJs for the FrontEnd and Backend</li>
          <li>Vercel Postgres for the database</li>
          <li>Drizzle ORM for querying the database</li>
          <li>TailwindCss for styling</li>
          <li>Framer motion for ainmation</li>
        </ul>
      </div>

      {/**connnect with me */}
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-800 py-4 text-center text-white">
      <div> &copy; {new Date().getFullYear()}. All rights reserved</div>
    </footer>
  );
}

type CheckPointProps = {
  header: string;
  content: string;
};
function CheckPoint({ header, content }: CheckPointProps) {
  return (
    <div className="space-y-3">
      <header className="flex items-center space-x-3">
        <CircleCheckBig className="h-5 w-5" /> <strong>{header}</strong>
      </header>
      <p className="pl-8">{content}</p>
    </div>
  );
}

type CardProp = {
  firstIcon: React.ReactNode;
  header: string;
  summary: string;
};
function Card({ firstIcon, header, summary }: CardProp) {
  return (
    <div className="flex h-[135px] flex-col justify-between rounded-md bg-blue-300 px-3 py-2">
      <header className="items-between flex justify-between px-2 py-3">
        {firstIcon} <MoveUpRight />
      </header>
      <div className="space-y-1">
        <strong>{header}</strong>
        <p className="text-sm">{summary}</p>
      </div>
    </div>
  );
}

export default Homepage;
