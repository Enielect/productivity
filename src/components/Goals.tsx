"use client";

import React, { startTransition, useState, useTransition } from "react";
import useSWR from "swr";
import { Input } from "./ui/input";
import {
  Columns2,
  Loader2,
  NotepadText,
  Pencil,
  PlusIcon,
  X,
} from "lucide-react";
import type { SelectTask, SelectTaskGroup } from "@/server/db/schema";
import TasKGroupCard, { type GroupType } from "./TasKGroupCard";
import { addTaskGroup, getTasksFromGroup, setChecked } from "@/action/task";
import TaskDialogWrapper from "./TaskDialogWrapper";
import Markdown from "react-markdown";
import EditTaskDialogWrapper from "./EditTaskDialogWrapper";

interface PostGroups {
  postGroups: GroupType[];
}

const Goals = ({ postGroups }: PostGroups) => {
  const [currentTaskGroup, setCurrentTaskGroup] = useState<GroupType>(
    postGroups[0]!,
  );
  const groupPercentages = postGroups.map(
    (currentGroup) =>
      (currentGroup.tasks.filter((task) => task.isChecked).length /
        currentTaskGroup.tasks.length) *
      100,
  );
  const combinedPercentages = groupPercentages.reduce(
    (acc, current) => acc + current,
    0,
  );

  const progress = combinedPercentages / postGroups.length;
  return (
    <div>
      <div className="border-b px-3 py-6">
        <Progress progress={progress} />
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
  // const [tasks, setTasks] = useState<SelectTask[]>([]);
  const [currentTask, setCurrentTask] = useState("");
  const { data: tasks, isLoading } = useSWR(`/group/task`, getTasks);
  async function getTasks() {
    const tasksFromGroup = await getTasksFromGroup(taskGroup.id);
    // setTasks(tasksFromGroup!.tasks);
    return tasksFromGroup!.tasks;
  }
  const currentSelectedTask = tasks?.find((task) => task.name === currentTask);
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
      {tasks && !isLoading && (
        <div className="flex w-full gap-3">
          <div
            data-open={String(currentTask.length > 0)}
            className="mt-5 h-[16rem] w-full space-y-3 overflow-auto pr-3 transition-all data-[open=true]:w-1/2"
          >
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                setCurrentTask={setCurrentTask}
                task={task}
                groupId={taskGroup.id}
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
            </div>
          )}
        </div>
      )}
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}

type TaskProp = {
  task: SelectTask;
  current: string;
  groupId: number;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
};

function TaskCard({ task, setCurrentTask, current, groupId }: TaskProp) {
  const [isChecked, setIsChecked] = useState(task.isChecked!);
  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      setIsChecked(e.target.checked);
      await setChecked(e.target.checked, task.id);
      console.log("checked");
    });
  }
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-gray-200 px-4 py-3">
      <div className="flex items-center gap-3">
        <input
          id={task.name}
          checked={isChecked}
          onChange={handleChecked}
          className="h-5 w-5 accent-blue-600"
          type="checkbox"
        />
        <label htmlFor={task.name} className="font-semibold">
          {task.name}
        </label>
      </div>
      <div className="space-x-4">
        <EditTaskDialogWrapper groupId={groupId} task={task}>
          <button>
            <Pencil className="h-6 w-6" />
          </button>
        </EditTaskDialogWrapper>
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

function Progress({ progress }: { progress: number }) {
  return (
    <div className="flex items-center gap-[80px] py-5">
      {/* <span className="w-fit mr-4">Today</span> */}
      <div className="">
        <ProgressBar progress={progress} />
      </div>
      <span>You have completed 3 of the 8 tasks planned today</span>
      {/* <span className="w-[4rem] flex justify-end">50%</span> */}
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="progress-bar relative h-[2rem] min-w-[300px] rounded-md bg-blue-200">
      <div
        className="progress h-full rounded-bl-md rounded-tl-md bg-blue-600"
        style={{ width: `${progress}%` }}
      ></div>
      <span className="absolute right-[4px] top-[4px] font-semibold text-blue-600">
        {" "}
        {progress}%
      </span>
    </div>
  );
}

export default Goals;
