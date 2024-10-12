"use client";

import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon } from "lucide-react";
import TasKGroupCard, { type GroupType } from "@/components/TasKGroupCard";
import { addTaskGroup } from "@/action/task";

import { Progress } from "./Progress";
import TaskGroupDetails from "./TaskGroupDetails";

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
        currentGroup.tasks.length) *
      100,
  );
  const combinedPercentages = groupPercentages.reduce(
    (acc, current) => acc + current,
    0,
  );
  const numberOfCompletedTasks = postGroups
    .filter((group) => group.tasks.some((task) => task.isChecked))
    .flat(Infinity).length;

  const totalNumberOfTasks = postGroups.reduce(
    (acc, curr) => acc + curr.tasks.length,
    0,
  );

  const progress = combinedPercentages / postGroups.length;
  return (
    <div>
      <div className="border-b px-3 py-6">
        <Progress
          progress={progress}
          completed={numberOfCompletedTasks}
          noOfTasks={totalNumberOfTasks}
        />
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
        aria-disabled={pending}
        onClick={handleAddTaskGroup}
        className="flex items-center justify-center rounded-full bg-blue-700 p-2"
      >
        {pending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <PlusIcon className="stroke-white" />
        )}
      </button>
    </div>
  );
}

export default Goals;
