"use client";

import { useState } from "react";
import Goals from "./Goals";
import DialogWrapper from "./DialogWrapper";

export default function Home() {
  const [display, setDisplay] = useState("empty");
  return (
    <>
      {/* <Progress /> */}
      {display === "empty" && (
        <>
          <div className="flex h-[calc(100dvh-80px)] w-full min-w-[2rem] items-center justify-center text-2xl text-[#444444]">
            There are not any tasks available yet, creat one below with the icon
            :)
          </div>
          <div className="flex justify-center">
            <DialogWrapper>
              <button className="absolute bottom-[4rem] mx-auto flex h-[40px] w-[40px] items-center justify-center rounded-full bg-blue-700 p-1 px-2">
                <PlusIcon />
              </button>
            </DialogWrapper>
          </div>
        </>
      )}

      {display === "select" && <Goals />}
    </>
  );
}

function Progress() {
  return (
    <div className="flex items-center py-5">
      {/* <span className="w-fit mr-4">Today</span> */}
      <div className="">
        <ProgressBar />
      </div>
      <span>You have completed 3 of the 8 tasks planned today</span>
      {/* <span className="w-[4rem] flex justify-end">50%</span> */}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={{ fill: "white" }}
    >
      <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
    </svg>
  );
}

function ProgressBar() {
  return (
    <div className="progress-bar h-[2rem] min-w-[300px] rounded-md bg-blue-200">
      <div
        className="progress h-full rounded-bl-md rounded-tl-md bg-blue-600"
        style={{ width: "20%" }}
      ></div>
      20%
    </div>
  );
}
