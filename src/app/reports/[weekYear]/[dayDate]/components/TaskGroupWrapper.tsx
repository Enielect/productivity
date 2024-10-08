"use client";

import TasKGroupCard from "@/components/TasKGroupCard";
import type { SelectTaskGroup } from "@/server/db/schema";
import { NotepadText } from "lucide-react";
import React, { useState } from "react";

const TaskGroupWrapper = ({ dayTasks }: { dayTasks: SelectTaskGroup[] }) => {
  const [currentTaskGroup, setCurrentTaskGroup] = useState<SelectTaskGroup>(
    dayTasks[0]!,
  );
  const [selectedTab, setSelectedTab] = useState<"tasks" | "analytics">(
    "tasks",
  );
  return (
    <div className="">
      <div className="flex gap-4 border-b px-4 py-3">
        {dayTasks?.map((task) => (
          <TasKGroupCard
            key={task.id}
            title={task.name}
            currentGroup={currentTaskGroup}
            setCurrentTaskGroup={setCurrentTaskGroup}
          />
        ))}
      </div>
      <div className="px-3">
        <div className="flex items-center gap-4 py-5">
          <NotepadText className="h-7 w-7 stroke-blue-600" />
          <span className="text-2xl font-semibold">
            {currentTaskGroup.name}
          </span>
        </div>
        <div className="flex">
          <button
            onClick={() => setSelectedTab("tasks")}
            className={`w-[4rem] rounded-bl-md rounded-tl-md border px-3 py-2 ${selectedTab === "tasks" && "border-blue-800 text-blue-600"}`}
          >
            Tasks
          </button>
          <button
            onClick={() => setSelectedTab("analytics")}
            className={`border px-3 ${selectedTab === "analytics" && "border-blue-800 text-blue-600"}`}
          >
            Analytics
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskGroupWrapper;
