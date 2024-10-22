"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronsDown, ChevronsUp, Loader2 } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import addNote from "../action/note";

function AddNote() {
  const [showAddNote, setShowAddNote] = React.useState(false);
  const [state, action] = useFormState(addNote, undefined);
  return (
    <form
      action={action}
      className="fixed left-0 mx-auto h-[200px] w-[100vw] transition-all data-[open=false]:-bottom-[135px] data-[open=true]:bottom-[120px]"
      data-open={String(showAddNote)}
    >
      <div className="flex justify-center text-center">
        <div className="bottom-0 mx-auto w-3/4 max-w-[37.5rem] space-y-4 rounded-md">
          <button
            className="rounded-full bg-blue-600 p-1"
            onClick={() => setShowAddNote((c) => !c)}
          >
            {!showAddNote ? (
              <ChevronsUp className="stroke-white" />
            ) : (
              <ChevronsDown className="stroke-white" />
            )}
          </button>
          <div className="space-y-4 rounded-md border bg-white p-2">
            <div>Input your message here</div>
            <Input name="title" placeholder="title" required />
            <div className="grid w-full gap-2 space-y-2">
              <Textarea
                name="content"
                placeholder="Type your message here."
                className="h-[6rem] resize-none"
                required
              />
              <SubmitButton />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex w-full justify-center rounded-md bg-blue-600 px-2 py-2 text-white"
    >
      {pending ? <Loader2 className="animate-spin" /> : "Send message"}
    </button>
  );
}

export default AddNote;
