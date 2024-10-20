"use client";

import { Input } from "@/components/ui/input";
import {
  ChartNoAxesCombined,
  LayoutDashboardIcon,
  NotebookPen,
  NotepadText,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { type ReactNode } from "react";
import { RightCalendar } from "./RightCalendar";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export default function Layout({
  children,
  username,
  image,
}: {
  children: ReactNode;
  username: string;
  image: string;
}) {
  //changed overflow to hidden
  const [open, setOpen] = React.useState(false);
  return (
    <div className="grid h-full overflow-hidden">
      <Header toggle={setOpen} name={username} img={image} />

      <main className="relative top-[49px] h-[calc(100dvh-50px)]">
        <div className="relative hidden h-full grid-cols-[199px_1fr_250px] md:grid">
          <div className="">
            <LeftNav />
          </div>
          <div className="border-l border-r border-[#444444]/20">
            {children}
          </div>
          <div className="pl-3 pr-3 pt-3">
            <div className="">
              <h3>TaskGroup Calendar</h3>
              <RightCalendar />
            </div>
          </div>
        </div>
        <div className="block h-full overflow-y-auto md:hidden">{children}</div>
        <div
          className={`${open ? "left-0 z-10" : "-left-[700px]"} fixed top-[50px] h-full w-screen overflow-x-hidden pr-8 transition-all duration-300 md:hidden`}
        >
          <div
            className={`absolute -z-10 h-full w-full bg-black/65 md:hidden`}
          ></div>
          <div className="z-20 flex h-full w-3/4 flex-col items-start justify-between bg-white">
            <div>
              <LeftNav />
            </div>
            <div className="mb-[52px] pl-3">
              <RightCalendar />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Header({
  name,
  img,
  toggle,
}: {
  name: string;
  img: string;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <header className="fixed z-20 flex h-[50px] w-full border-b border-[#444444]/20 bg-white">
      <h1 className="hidden h-full basis-[200px] border-r border-[#444444]/20 md:block">
        <Link href="/" className="flex h-full items-center pl-4">
          <Image src={"/productivity.png"} alt="logo" width={40} height={40} />
          Productivity
        </Link>
      </h1>
      <button
        onClick={() => toggle((c: boolean) => !c)}
        className="ml-3 block md:hidden"
      >
        <HamburgerMenuIcon className="h-6 w-6" />
      </button>
      <div className="flex flex-grow items-center justify-between px-4 sm:px-7">
        <Input placeholder="search" type="text" className="w-[15rem]" />
        <div className="flex items-center gap-8">
          <User name={name} img={img} />
          <span className="sm:hidden">
            {new Date()
              .toString()
              .split(" ")
              .splice(0, 4)
              .join(" ")
              .slice(0, -4)}
          </span>
          <span className="hidden sm:inline-block">
            {new Date().toString().split(" ").splice(0, 4).join(" ")}
          </span>
        </div>
      </div>
    </header>
  );
}

function User({ name, img }: { name: string; img: string }) {
  return (
    <span className="flex items-center gap-5">
      <span className="hidden md:inline-block">{name}</span>
      <span className="h-8 w-8 overflow-hidden rounded-full">
        <Image src={img} alt="User avatar" width={40} height={40} />
      </span>
    </span>
  );
}

interface NavListProps {
  icon: ReactNode;
  text: string;
}

const navList: NavListProps[] = [
  { icon: <LayoutDashboardIcon className="h-14 w-14" />, text: "Dashboard" },
  { icon: <NotepadText />, text: "Reports" },
  { icon: <ChartNoAxesCombined />, text: "Performance" },
  { icon: <NotebookPen />, text: "Notes" },
];

// This is a better way to write the LeftNav component
function LeftNav() {
  return (
    <ul className="bg-white pt-5">
      {navList.map(({ icon, text }) => (
        <ListItem key={text} icon={icon} text={text} />
      ))}
    </ul>
  );
}

function ListItem({ icon, text }: NavListProps) {
  const [hover, setHover] = React.useState(false);
  const pathName = usePathname();

  const clonedIcon = React.cloneElement(icon as React.ReactElement, {
    className: `${pathName === `/${text.toLowerCase()}` && "text-blue-700"}`,
  });

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={` ${hover && "bg-blue-700/30"} `}
    >
      <Link
        href={`/${text.toLowerCase()}`}
        className={`flex w-full cursor-pointer items-center gap-3 py-4 pl-4 text-lg ${pathName === `/${text.toLowerCase()}` && "text-blue-700"}`}
      >
        {clonedIcon} {text}
      </Link>{" "}
    </li>
  );
}
