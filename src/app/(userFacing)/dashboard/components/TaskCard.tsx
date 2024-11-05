import { setChecked } from "@/action/task";
import DeleteDialog from "@/components/DeleteDialog";
import EditTaskDialogWrapper from "@/components/EditTaskDialogWrapper";
import SummaryDialogWrapper from "@/components/SummaryDialogWrapper";
import type { SelectTask } from "@/server/db/schema";
import {
  ChevronsDown,
  Columns2,
  Pencil,
  PlusIcon,
  Trash2,
  X,
} from "lucide-react";
import { startTransition, useState } from "react";
import TaskInfo from "./TaskInfo";

type TaskProp = {
  task: SelectTask;
  current: string;
  groupId: number;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
};

export default function TaskCard({
  task,
  setCurrentTask,
  groupId,
  current,
}: TaskProp) {
  const [isChecked, setIsChecked] = useState(task.isChecked!);
  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      setIsChecked(e.target.checked);
      await setChecked(e.target.checked, task.id);
      console.log("checked");
    });
  }
  return (
    <div
      className={`animate-grid grid ${current === task.name ? "grid-rows-[auto,1fr]" : "grid-rows-1"}`}
    >
      <div className="flex flex-col justify-between gap-3 rounded-md bg-gray-200 px-4 py-3 dark:bg-[#5576d0] md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <input
            id={task.name}
            checked={isChecked}
            disabled={!task.summary || isChecked}
            onChange={handleChecked}
            className="h-5 w-5 accent-blue-600"
            type="checkbox"
          />
          <label htmlFor={task.name} className="font-semibold">
            {task.name}
          </label>
        </div>
        <div className="justify-end space-x-2 self-end md:flex">
          <DeleteDialog
            taskGroupId={groupId}
            taskId={task.id}
            deleteType="task"
          >
            <button>
              <Trash2 className="h-4 w-5 text-red-600 sm:h-6 sm:w-6" />
            </button>
          </DeleteDialog>
          <SummaryDialogWrapper taskId={task.id}>
            <button>
              <PlusIcon className="h-4 w-5 sm:h-6 sm:w-6" />
            </button>
          </SummaryDialogWrapper>
          <EditTaskDialogWrapper task={task}>
            <button>
              <Pencil className="h-4 w-5 sm:h-6 sm:w-6" />
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
            {current === task.name ? (
              <X className="h-4 w-5 sm:h-6 sm:w-6" />
            ) : (
              <>
                <Columns2 className="hidden h-4 w-5 sm:h-6 sm:w-6 md:inline-block" />
                <ChevronsDown className="h-4 w-5 sm:h-6 sm:w-6 md:hidden" />
              </>
            )}
          </button>
        </div>
      </div>
      {current === task.name && (
        <div className="h-[16rem] md:hidden min-[890px]:block min-[1000px]:hidden">
          <TaskInfo currentSelectedTask={task} />
        </div>
      )}
    </div>
  );
}
