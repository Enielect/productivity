"use client";

import { motion } from "framer-motion";
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
import Link from "next/link";
import React, {
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
} from "react";

const Homepage = () => {
  // const [isFirstMounted, setIsFirstMounted] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [displayContent, setDisplayContent] = React.useState(false);
  // const count = React.useRef(1);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsMounted(true);
    }, 500);

    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const timeout = setTimeout(() => {
        setDisplayContent(true);
      }, 2000);
      return () => clearInterval(timeout);
    }
  }, [isMounted]);
  // //the flip technique
  // useEffect(() => {
  //   if (isFirstMounted && count.current === 1) {
  //     const imageEl = document.querySelector(".animate-image")!;
  //     const firstRect = imageEl?.getBoundingClientRect();
  //     const timeout = setTimeout(() => {
  //       setIsMounted(true);
  //       requestAnimationFrame(() => {
  //         const lastRect = imageEl?.getBoundingClientRect();
  //         if (firstRect && lastRect) {
  //           const dx = firstRect.x - lastRect.x;
  //           const dy = firstRect.y - lastRect.y;
  //           const dw = firstRect.width / lastRect.width;
  //           const dh = firstRect.height / lastRect.height;
  //           console.log(dx, "--dx");
  //           imageEl.style.setProperty("--dx", dx);
  //           imageEl.style.setProperty("--dy", dy);
  //           imageEl.style.setProperty("--dh", dh);
  //           imageEl.style.setProperty("--dw", dw);

  //           console.log(dx);
  //           imageEl.dataset.flip = "invert";

  //           requestAnimationFrame(() => {
  //             console.log(count.current);
  //             imageEl.dataset.flip = "play";
  //             console.log(dx);
  //           });
  //         }
  //       });
  //       count.current += 1;
  //     }, 700);
  //     if (isMounted) return () => clearInterval(timeout);
  //   }
  // }, [isFirstMounted, isMounted]);
  return (
    <div className="relative">
      {" "}
      <div
        className={`${displayContent ? "hidden opacity-0" : "opacity-1"} fixed grid h-screen w-screen place-items-center overflow-hidden bg-white text-5xl transition-all duration-300`}
      >
        <div
          data-open={`${isMounted ? "mounted" : "closed"}`}
          className="mounted-wrapper grid place-items-center data-[open='closed']:grid-cols-[1fr] data-[open='mounted']:grid-cols-[8rem_1fr] data-[open='closed']:grid-rows-[1fr]"
        >
          <motion.div
            layout
            className={`animate-image h-[8rem] w-[8rem] ${!isMounted ? "mount-image" : ""}`}
          >
            <Image
              width={50}
              height={50}
              className="h-full w-full"
              alt="logo"
              src="/productivity.png"
            />
          </motion.div>
          <p className="mount-text-animate">Pepductivity</p>
        </div>
      </div>
      <div className={`${!displayContent ? "hidden" : "block"}`}>
        <Header show={displayContent} />
        <Hero show={displayContent} />
        <SecondSection />
        <ThirdSection />
        <Bio />
        <Footer />
      </div>
    </div>
  );
};

function Header({ show }: { show: boolean }) {
  const [showHeader, setShowHeader] = React.useState(false);

  useEffect(() => {
    if (show) {
      // Simulate the end of the enter animation
      const timeout = setTimeout(() => {
        setShowHeader(true);
      }, 1000); // 1s delay before showing the header

      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <header
      className={`${!showHeader ? "-translate-y-full" : "translate-y-0"} animate-header flex items-center justify-between px-7`}
    >
      <div className="flex items-center space-x-3">
        <Image width={50} height={50} alt="logo" src="/productivity.png" />
        <span className="text-animate inline-block text-lg">Pepductivity</span>
      </div>
      <nav className="space-x-4">
        <a className="text-xl">Home</a>
        <a>About</a>
        <a>Services</a>
        <a href="#">Contact</a>
      </nav>
      <Button className="sign-up inline-block">
        <span className="inline-block">Sign Up</span>
      </Button>
    </header>
  );
}

type ButtonProps = {
  children: ReactNode;
  className: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ className = "", children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-full bg-blue-500 px-3 py-2 ${className}`}
    >
      {children}
    </button>
  );
}

function Hero({ show }: { show: boolean }) {
  const [showHeader, setShowHeader] = React.useState(false);
  // const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Stagger delay between children
      },
    },
  };

  useEffect(() => {
    if (show) {
      // Simulate the end of the enter animation
      const timeout = setTimeout(() => {
        setShowHeader(true);
      }, 2000); // 1s delay before showing the header

      return () => clearTimeout(timeout);
    }
  }, [show]);

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      initial="hidden"
      animate={showHeader ? "visible" : "hidde "}
      variants={containerVariants}
      className={`flex h-[calc(100dvh-100px)] flex-col justify-center gap-7 text-center`}
    >
      <motion.h2 className={`text-5xl font-semibold`} variants={itemVariants}>
        Best Way to keep consistency in completing tasks
      </motion.h2>
      <motion.p className={`text-xl`} variants={itemVariants}>
        Analytics oriented approach to manage taks and tasks completion
      </motion.p>
      <motion.div className={``} variants={itemVariants}>
        <Link
          href="/dashboard"
          className="get-started inline-block rounded-full bg-blue-500 px-3 py-2"
        >
          <span className="inline-block">Get Started</span>
        </Link>
      </motion.div>
    </motion.section>
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
