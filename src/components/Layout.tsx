"use client";

import { Input } from "@/components/ui/input";
import { DashboardIcon } from "@radix-ui/react-icons";
import { ChartNoAxesCombined, NotepadText } from "lucide-react";
import Image from "next/image";
import React, { type ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="grid h-[calc(100dvh-50px)] grid-cols-[199px_1fr_200px]">
        <div className="h-full">
          <LeftNav />
        </div>
        <div className="border-l border-r border-[#444444]/20 px-3 pt-4">
          {children}
        </div>
        <div className="pl-3 pt-3">right na=</div>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="flex h-[50px] w-full border-b border-[#444444]/20">
      <h1 className="h-full basis-[200px] border-r border-[#444444]/20">
        <div className="flex h-full items-center pl-4">Productivity App</div>
      </h1>
      <div className="flex flex-grow items-center justify-between px-7">
        <Input placeholder="search" type="text" className="w-[15rem]" />
        <User />
        <div>Tue, 20 Apr</div>
      </div>
    </header>
  );
}

function User() {
  return (
    <div className="flex items-center gap-5">
      <div className="h-8 w-8 overflow-hidden rounded-full">
        <Image src="/avatar.png" alt="User avatar" width={40} height={40} />
      </div>
      <span>Eniola</span>
    </div>
  );
}

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
  const [clicked, setClicked] = React.useState(false);

  const clonedIcon = React.cloneElement(icon as React.ReactElement, {
    className: `${clicked && "text-blue-700"}`,
  });

  return (
    <li
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => setClicked((c) => !c)}
      className={`flex cursor-pointer items-center py-4 pl-4 ${
        hover && "bg-blue-700/30"
      } gap-3`}
    >
      {clonedIcon}{" "}
      <span className={`block ${clicked && "text-blue-700"}`}>{text}</span>{" "}
    </li>
  );
}

interface NavListProps {
  icon: ReactNode;
  text: string;
}

const navList: NavListProps[] = [
  { icon: <DashboardIcon />, text: "Dashboard" },
  { icon: <NotepadText />, text: "Notes" },
  { icon: <ChartNoAxesCombined />, text: "Performance" },
];
