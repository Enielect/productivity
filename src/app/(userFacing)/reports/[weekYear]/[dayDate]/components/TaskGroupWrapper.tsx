"use client";

import TasKGroupCard, { type GroupType } from "@/components/TasKGroupCard";
import type { SelectTask } from "@/server/db/schema";
import { Check, Columns2, NotepadText, X } from "lucide-react";
import { notFound } from "next/navigation";
import React, { useState } from "react";
import Markdown from "react-markdown";

const TaskGroupWrapper = ({ dayTasks }: { dayTasks: GroupType[] }) => {
  const [currentTaskGroup, setCurrentTaskGroup] = useState<
    GroupType | undefined
  >(!!dayTasks && dayTasks[0]);
  const [selectedTab, setSelectedTab] = useState<"tasks" | "analytics">(
    "tasks",
  );
  const [currentTask, setCurrentTask] = useState("");

  if (!currentTaskGroup) return notFound();

  const currentSelectedTask = currentTaskGroup.tasks?.find(
    (task) => task.name === currentTask,
  );
  return (
    <div className="">
      <div className="flex gap-4 border-b px-4 py-3">
        {dayTasks?.map((task) => (
          <TasKGroupCard
            key={task.id}
            title={task.name}
            currentGroup={task}
            setCurrentTaskGroup={
              setCurrentTaskGroup as React.Dispatch<
                React.SetStateAction<GroupType>
              >
            }
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
        <div>
          {selectedTab === "tasks" && (
            <div className="flex w-full gap-3">
              <div
                data-open={String(currentTask.length > 0)}
                className="mt-5 min-h-[16rem] w-full space-y-3 overflow-auto pr-3 transition-all data-[open=true]:w-1/2"
              >
                {currentTaskGroup.tasks.map((task) => (
                  <TaskList
                    key={task.id}
                    setCurrentTask={setCurrentTask}
                    task={task}
                    current={currentTask}
                  />
                ))}
              </div>
              {currentTask.length > 0 && (
                <div className="h-full w-1/2 space-y-3 border-2 border-blue-600 p-2">
                  <div className="rounded-md border px-2 py-2">
                    <header className="py-3 text-lg font-semibold">
                      Learning resources
                    </header>
                    <div className="markdown">
                      <Markdown>{currentSelectedTask!.resource}</Markdown>
                    </div>
                  </div>
                  <div className="rounded-md border px-2 py-2">
                    <header className="py-3 text-lg font-semibold">
                      Reason For Learning Resource
                    </header>
                    {currentSelectedTask!.reasonForResource}
                  </div>
                  <div className="rounded-md border px-2 py-2">
                    <header className="py-3 text-lg font-semibold">
                      Educate me.{" "}
                      <small>(In as few amount of words as possible)</small>
                    </header>
                    {currentSelectedTask!.summary ?? <em>not specified yet</em>}
                  </div>
                </div>
              )}
            </div>
          )}
          {selectedTab === "analytics" && (
            <div>
              <h1>Analytics</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

type TaskListProp = {
  task: SelectTask;
  current: string;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
};

function TaskList({ task, setCurrentTask, current }: TaskListProp) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        {task.isChecked ? (
          <Check className="h-6 w-6 text-green-500" />
        ) : (
          <X className="h-6 w-6 text-red-500" />
        )}
        <label htmlFor={task.name} className="font-semibold">
          {task.name}
        </label>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => {
            setCurrentTask((c: string) => {
              if (c === task.name) return "";
              return task.name;
            });
          }}
        >
          {current === task.name ? <X /> : <Columns2 />}
        </button>
      </div>
    </div>
  );
}

export default TaskGroupWrapper;
