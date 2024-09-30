"use client";

import { useState } from "react";
import Goals from "./Goals";

export default function Home() {
    const [display, setDisplay] = useState("empty");
  return (
    <>
      <Progress />
      {display === 'empty' && <div className="text-center">
        Nothing yet to do{" "}
        <button onClick={() => setDisplay('select')} className="bg-blue-700 p-1 px-2 hover:bg-opacity-70 rounded-md text-white">
          Select Plan
        </button>
      </div>}

      {display === 'select' && <Goals />}
    </>
  );
}

function Progress() {
  return (
    <div className="py-5 flex items-center ">
      <span className="w-fit mr-4">Today</span>
      <div className="flex-grow">
        <ProgressBar />
      </div>
      <span className="w-[4rem] flex justify-end">50%</span>
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="progress-bar bg-gray-100 h-2 rounded-md">
      <div
        className="progress bg-blue-600 h-full rounded-md"
        style={{ width: "20%" }}
      ></div>
    </div>
  );
}
