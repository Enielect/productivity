"use client";

import React, { useState, type ReactNode } from "react";
import Markdown from "react-markdown";
import { useSWRConfig } from "swr";

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
import { addTask } from "@/action/task";
import Loader from "./Loader";
import { ArrowLeft, Check } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";

type DialogProp = {
  children: ReactNode;
  groupId?: number;
};

const TaskDialogWrapper = ({ children, groupId }: DialogProp) => {
  const [taskGroup, setTaskGroup] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [resourceReason, setResourceReason] = useState("");
  //   const [pending, startTransition] = useTransition();
  const [format, setFormat] = useState(false);
  const { mutate } = useSWRConfig();

  const [state, action] = useFormState(addTask.bind(null, groupId!), undefined);

  if (state?.message) void mutate("/group/task");

  function handleMarkDown() {
    setFormat((c) => !c);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Add a New Task </DialogTitle>
            <DialogDescription>
              what do you want to accomplish today??
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="">
              <label htmlFor="title">Title</label>
              <Input
                id="name"
                name="name"
                value={taskGroup}
                onChange={(e) => setTaskGroup(e.target.value)}
                className="col-span-3 mt-2"
                required
              />
            </div>
            <div className="w-full">
              <div className="flex w-full justify-between">
                <label
                  htmlFor="description"
                  className="flex items-center gap-2"
                >
                  <span>learning resources? </span>
                  <span className="text-red-500">*</span>
                </label>
                <button
                  onClick={handleMarkDown}
                  className="rounded-md bg-blue-600 p-1 px-2 text-white"
                >
                  {format ? (
                    <ArrowLeft className="h-4 w-4" />
                  ) : (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              </div>
              {format ? (
                <div className="markdown mt-2 border border-blue-400 px-3 py-2">
                  <Markdown>{markdown}</Markdown>
                </div>
              ) : (
                <textarea
                  id="resource"
                  name="resource"
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="col-span-3 mt-3 w-full resize-none rounded-md border px-2 py-3 outline-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
              )}
            </div>
            <div className="grid">
              <label htmlFor="title" className="flex items-center gap-2">
                <span>Reason for resource?</span>
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reasonForResource"
                name="reasonForResource"
                value={resourceReason}
                onChange={(e) => setResourceReason(e.target.value)}
                className="col-span-3 mt-2 w-full resize-none rounded-md border px-2 py-3 outline-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
      {state?.message && <p className="text-green-600">{state.message}</p>}
    </Dialog>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="rounded-md bg-blue-700 px-4 py-2 text-white"
    >
      {pending ? <Loader /> : " Add Task"}
    </button>
  );
}

export default TaskDialogWrapper;
