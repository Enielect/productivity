import { Folder } from "lucide-react";
import React from "react";

const colorMix = [
  {
    light: "##d0f9e7",
    dark: "#49966b",
  },
  {
    light: "#fef3c5",
    dark: "#dd7836",
  },
  {
    light: "#e0f2fe",
    dark: "#2064e4",
  },
];

const TasKGroupCard = ({dark, light}: {dark: string, light: string}) => {
  return (
    <div className="p-4 space-y-3 w-1/3 rounded-md">
      <div className="flex gap-3 items-center">
        <Folder />
        <span> Interactions for Watch</span>    
      </div>
      <div className="flex justify-between items-center">
        <span className="">3 tasks</span>
        <span>Details</span>
      </div>
    </div>
  );
};

export default TasKGroupCard;
