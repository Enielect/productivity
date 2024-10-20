"use client";

import React, { useState, type ReactNode } from "react";
import { useSWRConfig } from "swr";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addSummary } from "@/action/task";
import Loader from "./Loader";
import { useFormState, useFormStatus } from "react-dom";

type DialogProp = {
  children: ReactNode;
  taskId: number;
};

const SummaryDialogWrapper = ({ children, taskId }: DialogProp) => {
  const [summary, setSummary] = useState("");
  const { mutate } = useSWRConfig();

  const [state, action] = useFormState(
    addSummary.bind(null, taskId),
    undefined,
  );

  if (state?.message) void mutate("/group/task");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Add Summary </DialogTitle>
            <DialogDescription>
              summarize what you have learned in 200 words
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="grid">
              <textarea
                id="summary"
                name="summary"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="col-span-3 mt-2 w-full resize-none rounded-md border px-2 py-3 outline-transparent focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
        {state?.message && <p className="text-green-600">{state.message}</p>}
      </DialogContent>
    </Dialog>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex justify-center rounded-md bg-blue-700 px-4 py-2 text-center text-white"
    >
      {pending ? <Loader className="stroke-white" /> : " Add Summary"}
    </button>
  );
}

export default SummaryDialogWrapper;
