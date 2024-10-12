import type { SelectTask, SelectTaskGroup } from "@/server/db/schema";
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

export type GroupType = SelectTaskGroup & { tasks: SelectTask[] };

type Props = {
  title: string;
  currentGroup: GroupType;
  setCurrentTaskGroup: React.Dispatch<React.SetStateAction<GroupType>>;
};

export const TasKGroupCard = ({
  title,
  currentGroup,
  setCurrentTaskGroup,
}: Props) => {
  //new line

  const completedTasks = currentGroup.tasks.filter(
    (task) => task.isChecked,
  ).length;

  const totalTasks = currentGroup.tasks.length;

  const progress = (completedTasks / totalTasks) * 100;

  console.log(currentGroup, "current group");

  const randomColor = colorMix[Math.floor(Math.random() * colorMix.length)]!;

  const style = {
    "--light-color": randomColor.light,
    "--dark-color": randomColor.dark,
  } as React.CSSProperties;

  return (
    <div
      style={style}
      className="flex w-1/3 flex-col justify-between space-y-3 rounded-md bg-[var(--light-color)] p-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Folder
            style={style}
            className="fill-[var(--dark-color)] stroke-transparent"
          />
          <span> {title}</span>
        </div>
        <span>{isNaN(progress) ? 0 : progress}%</span>
      </div>
      <div className="flex items-center justify-between">
        <span style={style} className="text-[var(--dark-color)]">
          {currentGroup.tasks.length} tasks
        </span>
        <button
          onClick={() => setCurrentTaskGroup(currentGroup)}
          className="text-sm text-[#444444] text-opacity-65 underline"
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default TasKGroupCard;
