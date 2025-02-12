"use client";

import { motion, useInView } from "framer-motion";
import { LinkedinIcon, MailIcon, TwitterIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useRef } from "react";

export default function LandingPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // animate(
  //   ".bq",
  //   { x: 0 },
  //   {
  //     delay: stagger(0.1),
  //     duration: 0.5,
  //     easing: [0.22, 0.03, 0.26, 1],
  //   },
  // );
  return (
    <div className="mt-5 text-lg">
      <header
        ref={ref}
        // style={{
        //   opacity: isInView ? 1 : 0,
        //   transform: isInView ? "rotateZ(0deg)" : "rotateZ(30deg)",
        //   transformOrigin: 'top left',
        //   transition: "transform 0.3s linear",
        // }}
        className="flex w-full justify-between px-14 text-xl max-sm:px-5"
      >
        <div className="flex gap-[4rem]">
          <a
            className="relative before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-white before:content-[''] hover:before:w-full"
            style={
              {
                "--i": 1,
                opacity: isInView ? 1 : 0,
                transform: isInView ? "none" : "translateY(-40px)",
                transition: `transform 0.1s calc(var(--i)*0.1s) linear`,
              } as CSSProperties
            }
            href="#"
          >
            pepductivity
          </a>
          <nav className="flex gap-7 max-sm:hidden">
            <div
              style={
                {
                  "--i": 2,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(-40px)",
                  transition: `transform 0.1s calc(var(--i)*0.1s) linear`,
                } as CSSProperties
              }
            >
              <a
                className="relative before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-white before:content-[''] hover:before:w-full"
                href="/#features"
              >
                features
              </a>
            </div>
            <div
              style={
                {
                  "--i": 3,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(-40px)",
                  transition: `transform 0.1s calc(var(--i)*0.1s) linear`,
                } as CSSProperties
              }
            >
              <a
                className="relative before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-white before:content-[''] hover:before:w-full"
                href="/#services"
              >
                services
              </a>
            </div>
            <div
              style={
                {
                  "--i": 4,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "none" : "translateY(-40px)",
                  transition: `transform 0.1s calc(var(--i)*0.1s) linear`,
                } as CSSProperties
              }
            >
              <a
                className="relative before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-white before:content-[''] hover:before:w-full"
                href="/#contact"
              >
                {" "}
                contact
              </a>
            </div>
          </nav>
        </div>
        <div
          style={
            {
              "--i": 5,
              opacity: isInView ? 1 : 0,
              transform: isInView ? "none" : "translateY(-40px)",
              transition: `transform 0.1s calc(var(--i)*0.1s) linear`,
            } as CSSProperties
          }
        >
          <Link
            className="relative underline before:absolute before:bottom-0 before:h-[1px] before:w-0 before:bg-white before:content-[''] hover:before:w-full"
            href="/login"
          >
            <span>Login</span>
          </Link>
        </div>
      </header>

      <section className="hero mx-14 my-20 items-center overflow-hidden max-sm:mx-5 md:my-36 md:grid md:grid-cols-[60vw_1fr]">
        <div className="w-full max-sm:flex max-sm:flex-col">
          <div>
            <p className="py-2 uppercase">what is PEPDUCTIVITY?</p>
            <motion.h1 className="w-full max-w-[30.5rem] text-[2.5em] capitalize leading-[2.8rem] max-md:leading-[3rem]">
              <motion.span
                style={{ overflow: "hidden" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                The Present of Task
              </motion.span>{" "}
              <motion.span
                style={{ overflow: "hidden" }}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
              >
                Tracking is here
              </motion.span>
            </motion.h1>
          </div>

          <div className="relative ml-6 mt-10 flex items-center max-sm:w-full max-[450px]:ml-3 lg:max-w-[32rem]">
            <motion.div
              initial={{ height: 0, transformOrigin: "center" }}
              animate={{ height: "100%" }}
              transition={{ duration: 1 }}
              className="absolute h-full w-[4px] bg-gray-600"
            ></motion.div>
            <div className="space-y-8 pl-8 max-sm:pl-5">
              <motion.blockquote
                whileInView="inview"
                initial="initial"
                transition={{ staggerChildren: 0.18 }}
              >
                {/* larger screens */}
                <motion.span
                  variants={{
                    inview: { y: 0, opacity: 1 },
                    initial: { y: 10, opacity: 0 },
                  }}
                  className="bq white block text-nowrap md:text-xl lg:text-2xl"
                >
                  Monitor progress, measure success
                </motion.span>

                <motion.span
                  variants={{
                    inview: { y: 0, opacity: 1 },
                    initial: { y: 10, opacity: 0 },
                  }}
                  className="bq block text-nowrap md:text-xl lg:text-2xl"
                >
                  Stay organized, stay on track.
                </motion.span>
                <motion.span
                  variants={{
                    inview: { y: 0, opacity: 1 },
                    initial: { y: 10, opacity: 0 },
                  }}
                  className="bq block text-nowrap md:text-xl lg:text-2xl"
                >
                  Boost productivity, achieve more.
                </motion.span>
                <motion.span
                  variants={{
                    inview: { y: 0, opacity: 1 },
                    initial: { y: 10, opacity: 0 },
                  }}
                  className="bq block text-nowrap md:text-xl lg:text-2xl"
                >
                  Data-driven decision-making, better results.
                </motion.span>
                {/* smaller screens */}
              </motion.blockquote>
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="flex overflow-hidden whitespace-nowrap"
              >
                <a
                  href="/#features"
                  className="block bg-yellow-400 px-5 py-2 text-black"
                >
                  See more
                </a>
                <Link
                  href="/dashboard"
                  className="ml-4 block border px-5 py-2 capitalize transition-[transform] hover:origin-top-left hover:border-white"
                >
                  get started now
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <Image
            alt="hero-image"
            width={1000}
            height={1000}
            src="/gear-productivity.svg"
          />
        </div>
      </section>
      <section
        id="features"
        className="box-section mx-14 overflow-hidden pt-4 max-sm:mx-5"
      >
        <h3 className="pb-[3.5rem] text-center text-[2rem] font-bold leading-10 md:text-[3rem]">
          Key benefits of using a productivity app
        </h3>
        <div className="flex overflow-hidden max-[830px]:flex-wrap max-sm:flex-col">
          <div className="flex flex-col justify-between space-y-10 border px-10 py-6 hover:bg-green-300 hover:bg-opacity-5 md:w-1/3 lg:w-1/4">
            <header className="text-center leading-10 md:text-[2rem]">
              Enhanced Focus and Organization
            </header>
            <motion.p
              whileInView="inview"
              initial="initial"
              transition={{ staggerChildren: 0.18 }}
              className="text-justify"
            >
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                By breaking down tasks into smaller, manageable
              </motion.span>

              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                steps, users can stay focused and avoid
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                feeling overwhelmed. Effective task management tools help
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                prioritize tasks, set deadlines, and track progress
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                eading to increased productivity and efficiency.
              </motion.span>
            </motion.p>
            <div>
              <Image
                src="/gear-productivity.svg"
                width={300}
                height={300}
                className="mb-6"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-10 border px-10 py-6 hover:bg-orange-300 hover:bg-opacity-5 md:w-1/3 lg:w-1/4">
            <header className="text-center leading-10 md:text-[2em]">
              Improved Time Management
            </header>
            <motion.p
              whileInView="inview"
              initial="initial"
              transition={{ staggerChildren: 0.18, delay: 0.7 }}
              className="text-justify"
            >
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                Productivity apps often include features like
              </motion.span>

              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                time tracking and time management techniques.
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                These tools help users allocate time effectively, identify
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                time-wasting activities, and optimize their workflow.
              </motion.span>
            </motion.p>
            <div>
              <Image
                src="/gear-productivity.svg"
                width={300}
                height={300}
                className="mb-6"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col justify-between space-y-10 border px-10 py-6 hover:bg-blue-300 hover:bg-opacity-5 md:w-1/3 lg:w-1/4">
            <header className="text-center leading-10 md:text-[2em]">
              Stress Reduction
            </header>
            <motion.p
              whileInView="inview"
              initial="initial"
              transition={{ staggerChildren: 0.18, delay: 1.4 }}
              className="text-justify"
            >
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                A well-organized task list can significantly
              </motion.span>

              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                reduce stress and anxiety. By visually organizing
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                tasks and tracking progress, users can gain a sense
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                of control and accomplishment, leading to
              </motion.span>
              <motion.span
                variants={{
                  inview: { y: 0, opacity: 1 },
                  initial: { y: 10, opacity: 0 },
                }}
                className="bq inline-block"
              >
                a more relaxed and productive mindset.
              </motion.span>
            </motion.p>
            <div>
              <Image
                src="/gear-productivity.svg"
                width={300}
                height={300}
                className="mb-6"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="overflow-hidden bg-white px-14 max-sm:px-2"
      >
        <header className="flex items-center font-bold max-md:py-10 md:h-[18rem]">
          <div className="flex items-center text-[2rem] leading-[2.8rem] text-black max-sm:w-full max-sm:text-center md:w-3/4 md:text-[3rem]">
            How our solutions can help you
          </div>
          {/* <div className="justify-self-end">
            <nav className="flex w-fit gap-8 border-b text-[1.3em] text-black">
              <span>retail</span>
              <span>travel</span>
              <span>payments</span>
              <span>insurance</span>
            </nav>
          </div> */}
        </header>
        <motion.div
          initial={{ x: "100%" }}
          whileInView={{ x: 0 }}
          transition={{ duration: 1 }}
          className="relative flex gap-5 pb-[2px] max-sm:flex-col"
        >
          <motion.div
            initial={{ x: "50%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="card absolute max-sm:w-full"
          >
            <div className="side front-side flex w-1/4 flex-col space-y-10 border bg-[#09090b] px-10 py-6">
              <Image
                src="/gear-productivity.svg"
                width={150}
                height={150}
                alt=""
              />
              <header className="text-[2em] leading-[2.5rem] max-sm:text-center">
                Streamline Operations
              </header>
              <p className="text-justify text-base">
                Our app automates repetitive tasks, reducing manual effort and
                human error. By streamlining workflows, you can save valuable
                time and resources, allowing you to focus on more strategic
                initiatives.
              </p>
            </div>
            <div className="side back-side w-full bg-red-500"></div>
          </motion.div>
          <motion.div
            initial={{ x: "-50%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="card absolute max-sm:w-full"
          >
            <div className="side front-side flex w-1/4 flex-col justify-between space-y-10 border bg-[#09090b] px-10 py-6">
              <Image
                src="/gear-productivity.svg"
                width={150}
                height={150}
                alt=""
              />
              <header className="text-[2em] leading-[2.5rem]">
                Boost Productivity
              </header>
              <p className="text-justify text-base">
                Our app empowers you to prioritize tasks effectively, breaking
                down complex projects into smaller, manageable steps. By
                tracking progress and setting realistic goals, you can stay
                organized, focused, and motivated. Our intuitive interface and
                customizable features make it easy to tailor the app to your
                specific needs.
              </p>
            </div>
            <div className="side back-side w-full bg-red-500"></div>
          </motion.div>
          <motion.div
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.5 }}
            className="card absolute max-sm:w-full"
          >
            <div className="side front-side flex w-1/4 flex-col justify-between space-y-10 border bg-[#09090b] px-10 py-6">
              <Image
                src="/gear-productivity.svg"
                width={150}
                height={150}
                alt=""
              />
              <header className="text-[2em] leading-[2.5rem]">
                Make Informed Decisions
              </header>
              <p className="text-justify text-base">
                Our data-driven insights provide valuable information about your
                work patterns and productivity. By analyzing your task history,
                you can identify areas for improvement, optimize your workflow,
                and make data-driven decisions to boost your overall
                performance. With our app, you can gain a deeper understanding
                of your work habits and take control of your productivity.
              </p>
            </div>
            <div className="side back-side w-full bg-red-500"></div>
          </motion.div>
        </motion.div>
      </section>
      <footer
        id="contact"
        className="mx-14 flex items-center justify-between py-3 max-sm:mx-5 max-sm:text-base"
      >
        <span className="block ">
          Copyright &copy; {new Date().getFullYear()}
        </span>
        <span className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/eniola-abayomi-045605232/"
            className="ml-3"
          >
            <LinkedinIcon />
          </a>
          <a href="https://www.x.com/enielect">
            <TwitterIcon />
          </a>
          <a href="mailto:eniolafaithful57@gmail.com">
            <MailIcon />
          </a>
        </span>
      </footer>
    </div>
  );
}
