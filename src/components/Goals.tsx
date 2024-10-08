"use client";

import React, { useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Columns2, NotepadText, PlusIcon, X } from "lucide-react";
import type { SelectTask, SelectTaskGroup } from "@/server/db/schema";
import TasKGroupCard from "./TasKGroupCard";
import { addTaskGroup, getTasksFromGroup } from "@/action/task";
import TaskDialogWrapper from "./TaskDialogWrapper";
import Markdown from "react-markdown";

interface PostGroups {
  postGroups: SelectTaskGroup[];
}

const Goals = ({ postGroups }: PostGroups) => {
  const [currentTaskGroup, setCurrentTaskGroup] = useState<SelectTaskGroup>(
    postGroups[0]!,
  );
  return (
    <div>
      <div className="border-b px-3 py-6">
        <Progress />
        <h1>Add the tasks you want to cover this week</h1>
        <AddGoalInput />
        <div className="flex gap-5">
          {postGroups.map((group) => (
            <TasKGroupCard
              currentGroup={group}
              setCurrentTaskGroup={setCurrentTaskGroup}
              key={group.id}
              title={group.name}
            />
          ))}
        </div>
      </div>
      <div>
        <TaskGroupDetails taskGroup={currentTaskGroup} />
      </div>
    </div>
  );
};

function TaskGroupDetails({ taskGroup }: { taskGroup: SelectTaskGroup }) {
  const [tasks, setTasks] = useState<SelectTask[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  useEffect(() => {
    async function getTasks() {
      const tasksFromGroup = await getTasksFromGroup(taskGroup.id);
      setTasks(tasksFromGroup!.tasks);
    }
    void getTasks();
  }, [taskGroup.id]);
  const currentSelectedTask = tasks.find((task) => task.name === currentTask);
  return (
    <div className="px-4">
      <div className="flex items-center gap-4 py-5">
        <NotepadText className="h-7 w-7 stroke-blue-600" />
        <span className="text-2xl font-semibold">{taskGroup.name}</span>
      </div>
      <div className="flex space-x-5">
        <div className="w-[4rem] rounded-bl-md rounded-tl-md border border-blue-800 px-3 py-2 text-blue-600">
          Tasks
        </div>
        <TaskDialogWrapper groupId={taskGroup.id}>
          <button className="flex items-center space-x-2 text-blue-700">
            <PlusIcon />
            <span>Add New</span>
          </button>
        </TaskDialogWrapper>
      </div>
      <div className="flex w-full gap-3">
        <div
          data-open={String(currentTask.length > 0)}
          className="mt-5 w-full space-y-3 transition-all data-[open=true]:w-1/2"
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              setCurrentTask={setCurrentTask}
              task={task}
              current={currentTask}
            />
          ))}
        </div>
        {currentTask.length > 0 && (
          <div className="h-full space-y-3 border-2 border-blue-600 p-2">
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
          </div>
        )}
      </div>
    </div>
  );
}

type TaskProp = {
  task: SelectTask;
  current: string;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
};

function TaskCard({ task, setCurrentTask, current }: TaskProp) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <input
          id={task.name}
          className="h-4 w-4 accent-blue-600"
          type="checkbox"
        />
        <label htmlFor={task.name} className="font-semibold">
          {task.name}
        </label>
      </div>
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
  );
}

function AddGoalInput() {
  const [pending, startTransition] = useTransition();
  const [taskGroup, setTaskGroup] = useState("");
  function handleAddTaskGroup() {
    startTransition(async () => {
      await addTaskGroup({ name: taskGroup });
      console.log("upload complete");
    });
    console.log("adding task group");
  }

  return (
    <div className="flex gap-4 py-4">
      <Input
        onChange={(e) => setTaskGroup(e.target.value)}
        type="text"
        placeholder="Add a goal"
      />
      <button
        onClick={handleAddTaskGroup}
        className="flex items-center justify-center rounded-full bg-blue-700 p-2"
      >
        <PlusIcon className="stroke-white" />
      </button>
    </div>
  );
}

function Progress() {
  return (
    <div className="flex items-center gap-[80px] py-5">
      {/* <span className="w-fit mr-4">Today</span> */}
      <div className="">
        <ProgressBar />
      </div>
      <span>You have completed 3 of the 8 tasks planned today</span>
      {/* <span className="w-[4rem] flex justify-end">50%</span> */}
    </div>
  );
}

function ProgressBar() {
  return (
    <div className="progress-bar relative h-[2rem] min-w-[300px] rounded-md bg-blue-200">
      <div
        className="progress h-full rounded-bl-md rounded-tl-md bg-blue-600"
        style={{ width: "20%" }}
      ></div>
      <span className="absolute right-[4px] top-[4px] font-semibold text-blue-600">
        {" "}
        20%
      </span>
    </div>
  );
}

export default Goals;
