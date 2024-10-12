import { useState } from "react";
import useSWR from "swr";
import { Loader2, NotepadText, PlusIcon } from "lucide-react";
import { getTasksFromGroup } from "@/action/task";
import TaskDialogWrapper from "@/components/TaskDialogWrapper";
import Markdown from "react-markdown";
import TaskCard from "@/app/(userFacing)/dashboard/components/TaskCard";
import type { GroupType } from "@/components/TasKGroupCard";

export default function TaskGroupDetails({
  taskGroup,
}: {
  taskGroup: GroupType;
}) {
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
        <em>
          (Note that checkboxes are disabled by default. Click on the + icon to
          provide a summary of the task before you can check the task done)
        </em>
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
            <div className="h-[16rem] w-1/2 space-y-3 overflow-auto border-2 border-blue-600 p-2">
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
      {isLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
}
