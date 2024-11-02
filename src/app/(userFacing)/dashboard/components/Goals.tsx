"use client";

import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { Loader2, PlusIcon } from "lucide-react";
import TasKGroupCard, { type GroupType } from "@/components/TasKGroupCard";
import { addTaskGroup } from "@/action/task";

import { Progress } from "./Progress";
import TaskGroupDetails from "./TaskGroupDetails";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PostGroups {
  postGroups: GroupType[];
}

const Goals = ({ postGroups }: PostGroups) => {
  const [currentTaskGroup, setCurrentTaskGroup] = useState<GroupType>(
    postGroups[0]!,
  );

  const numberOfCompletedTasks = postGroups
    .filter((group) => group.tasks.some((task) => task.isChecked))
    .flat(Infinity).length;

  const totalNumberOfTasks = postGroups.reduce(
    (acc, curr) => acc + curr.tasks.length,
    0,
  );

  const progress = (numberOfCompletedTasks / totalNumberOfTasks) * 100;
  return (
    <div className="h-full">
      <div className="border-b px-3 pb-10">
        <Progress
          progress={progress}
          completed={numberOfCompletedTasks}
          noOfTasks={totalNumberOfTasks}
        />
        <h1>Add the tasks you want to cover this week</h1>
        <AddGoalInput />
        <Carousel className="md:w-[calc(100dvw-470px)]">
          <CarouselContent className="-ml-2 md:-ml-4">
            {postGroups.map((group) => (
              <CarouselItem
                className="basis-full pl-3 sm:basis-1/2 md:basis-full min-[900px]:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                key={group.id}
              >
                <TasKGroupCard
                  currentGroup={group}
                  setCurrentTaskGroup={setCurrentTaskGroup}
                  title={group.name}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <TaskGroupDetails taskGroup={currentTaskGroup} />
    </div>
  );
};

function AddGoalInput() {
  const [pending, startTransition] = useTransition();
  const [taskGroup, setTaskGroup] = useState("");
  function handleAddTaskGroup() {
    startTransition(async () => {
      await addTaskGroup({ name: taskGroup });
      setTaskGroup("");
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
          <Loader2 className="animate-spin text-white" />
        ) : (
          <PlusIcon className="stroke-white" />
        )}
      </button>
    </div>
  );
}

export default Goals;
