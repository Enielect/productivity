import { type SelectTaskGroup } from "@/server/db/schema";
import { Folder } from "lucide-react";
import React from "react";

const colorMix = [
  {
    light: "#c3f7e1",
    dark: "#49966b",
  },
  {
    light: "#fef3c5",
    dark: "#dd7836",
  },
  {
    light: "#acd3ec",
    dark: "#2064e4",
  },
];

type Props = { title: string, currentGroup: SelectTaskGroup, setCurrentTaskGroup: React.Dispatch<React.SetStateAction<SelectTaskGroup>> };

export const TasKGroupCard = ({ title, currentGroup, setCurrentTaskGroup }: Props) => {
  const randomColor = colorMix[Math.floor(Math.random() * colorMix.length)]!;
  const style = {
    "--light-color": randomColor.light,
    "--dark-color": randomColor.dark,
  } as React.CSSProperties;
  return (
    <div
      style={style}
      className="w-1/3 flex flex-col justify-between space-y-3 rounded-md bg-[var(--light-color)] p-4"
    >
      <div className="flex items-center gap-3">
        <Folder style={style} className="fill-[var(--dark-color)] stroke-transparent" />
        <span> {title}</span>
      </div>
      <div className="flex items-center justify-between">
        <span style={style} className="text-[var(--dark-color)]">
          3 tasks
        </span>
        <button onClick={() => setCurrentTaskGroup(currentGroup)} className="text-sm underline text-[#444444] text-opacity-65">Details</button>
      </div>
    </div>
  );
};

export default TasKGroupCard;
