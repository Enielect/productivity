import { useState } from "react";
import { NotepadText, PlusIcon, Trash2 } from "lucide-react";
import TaskDialogWrapper from "@/components/TaskDialogWrapper";
import TaskCard from "@/app/(userFacing)/dashboard/components/TaskCard";
import type { GroupType } from "@/components/TasKGroupCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskInfo from "./TaskInfo";
import DeleteDialog from "@/components/DeleteDialog";

export default function TaskGroupDetails({
  taskGroup,
}: {
  taskGroup: GroupType;
}) {
  const [currentTask, setCurrentTask] = useState("");
  console.log(taskGroup.id);

  const currentSelectedTask = taskGroup.tasks?.find(
    (task) => task.name === currentTask,
  );
  return (
    <div className="h-[calc(100%-298px)] px-4">
      <div className="flex flex-col items-center gap-4 py-5 lg:flex-row">
        <NotepadText className="h-7 w-7 stroke-blue-600" />
        <span className="text-center text-2xl font-semibold sm:text-justify">
          {taskGroup.name}
        </span>
        <em className="text-center sm:text-justify">
          (Note that checkboxes are disabled by default. Click on the + icon to
          provide a summary of the task before you can check the task done)
        </em>
      </div>
      <div className="flex w-full items-center justify-between pb-2">
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
        <DeleteDialog taskGroupId={taskGroup.id} deleteType="taskGroup">
          <button className="flex items-center gap-3 text-red-600">
            <Trash2 className="h-6 w-6 text-red-600" />
            Delete Group
          </button>
        </DeleteDialog>
      </div>
      {taskGroup.tasks && (
        <div className={`w-full md:h-full`}>
          <ScrollArea className="taskInfo-md hidden h-[5rem] w-full gap-3 pb-[1.3rem] transition-all md:flex md:h-full">
            <div
              data-open={String(currentTask.length > 0)}
              className="h-full w-full space-y-3 pr-3 pt-5 transition-all min-[890px]:data-[open=true]:w-full min-[1000px]:data-[open=true]:w-1/2"
            >
              {taskGroup.tasks.map((task) => (
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
              <div className="transition-all md:w-1/2 min-[890px]:hidden min-[1000px]:block">
                <TaskInfo currentSelectedTask={currentSelectedTask} />
              </div>
            )}
          </ScrollArea>
          <div className="w-full md:hidden">
            <div className="mt-5 w-full space-y-3 overflow-auto pr-3 transition-all">
              {taskGroup.tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  setCurrentTask={setCurrentTask}
                  task={task}
                  groupId={taskGroup.id}
                  current={currentTask}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
