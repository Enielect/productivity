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
  const pathname = usePathname();
  return (
    <div className="h-full overflow-hidden">
      <Header name={username} img={image} />
      <main className="grid h-[calc(100dvh-50px)] grid-cols-[199px_1fr_250px]">
        <div className="h-full">
          <LeftNav />
        </div>
        <div className="border-l border-r border-[#444444]/20 pt-4">
          {children}
        </div>
        <div className="pl-3 pr-3 pt-3">
          {pathname === "/notes" ? (
            <div>
              <h3>Notes Calendar</h3>
              <RightCalendar />
            </div>
          ) : (
            <div>
              <h3>TaskGroup Calendar</h3>
              <RightCalendar />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Header({ name, img }: { name: string; img: string }) {
  return (
    <header className="flex h-[50px] w-full border-b border-[#444444]/20">
      <h1 className="h-full basis-[200px] border-r border-[#444444]/20">
        <Link href="/" className="flex h-full items-center pl-4">
          <Image src={"/productivity.png"} alt="logo" width={40} height={40} />
          Productivity
        </Link>
      </h1>
      <div className="flex flex-grow items-center justify-between px-7">
        <Input placeholder="search" type="text" className="w-[15rem]" />
        <div className="flex items-center gap-8">
          <User name={name} img={img} />
          <span>{new Date().toString().split(" ").splice(0, 4).join(" ")}</span>
        </div>
      </div>
    </header>
  );
}

function User({ name, img }: { name: string; img: string }) {
  return (
    <span className="flex items-center gap-5">
      <span className="h-8 w-8 overflow-hidden rounded-full">
        <Image src={img} alt="User avatar" width={40} height={40} />
      </span>
      <span>{name}</span>
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
    <ul className="pt-5">
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
