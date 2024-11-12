import type { SelectTask } from "@/server/db/schema";
import React from "react";
import Markdown from "react-markdown";

const TaskInfo = ({
  currentSelectedTask,
}: {
  currentSelectedTask: SelectTask | undefined;
}) => {
  return (
    <div className="h-full max-h-[calc(100dvh-250px)] w-full space-y-3 overflow-auto rounded-md border-2 border-blue-600 p-2">
      <div className="rounded-md border px-2 py-2">
        <header className="py-3 text-lg font-semibold">
          Learning resources
        </header>
        <div className="markdown">
          <Markdown className="break">{currentSelectedTask!.resource}</Markdown>
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
          Educate me. <small>(In as few amount of words as possible)</small>
        </header>
        {currentSelectedTask!.summary ?? <em>not specified yet</em>}
      </div>
    </div>
  );
};

export default TaskInfo;
