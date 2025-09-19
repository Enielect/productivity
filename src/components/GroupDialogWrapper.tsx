"use client";

import React, { useState, useTransition, type ReactNode } from "react";

// import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { addTaskGroup } from "@/action/task";
import Loader from "./Loader";

type DialogProp = {
  children: ReactNode;
};

const GroupDialogWrapper = ({ children }: DialogProp) => {
  const [taskGroup, setTaskGroup] = useState("");
  const [pending, startTransition] = useTransition();

  function handleAddTaskGroup() {
    startTransition(async () => {
      await addTaskGroup({ name: taskGroup });
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="rounded-md sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Task Group</DialogTitle>
          <DialogDescription>
            what do you want to accomplish today??
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="username"
              value={taskGroup}
              onChange={(e) => setTaskGroup(e.target.value)}
              defaultValue="introduction to quantum mechanics"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="submit"
            onClick={handleAddTaskGroup}
            className="flex justify-center rounded-md bg-blue-700 px-4 py-2 text-center text-white"
          >
            {pending ? <Loader className="stroke-white" /> : "Add Task Group"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GroupDialogWrapper;
