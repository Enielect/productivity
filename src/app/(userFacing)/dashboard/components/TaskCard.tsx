import { setChecked } from "@/action/task";
import DeleteDialog from "@/components/DeleteDialog";
import EditTaskDialogWrapper from "@/components/EditTaskDialogWrapper";
import SummaryDialogWrapper from "@/components/SummaryDialogWrapper";
import type { SelectTask } from "@/server/db/schema";
import { Columns2, Pencil, PlusIcon, Trash2, X } from "lucide-react";
import { startTransition, useState } from "react";

type TaskProp = {
  task: SelectTask;
  current: string;
  groupId: number;
  setCurrentTask: React.Dispatch<React.SetStateAction<string>>;
};

export default function TaskCard({ task, setCurrentTask, current }: TaskProp) {
  const [isChecked, setIsChecked] = useState(task.isChecked!);
  function handleChecked(e: React.ChangeEvent<HTMLInputElement>) {
    startTransition(async () => {
      setIsChecked(e.target.checked);
      await setChecked(e.target.checked, task.id);
      console.log("checked");
    });
  }
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-gray-200 px-4 py-3">
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
      <div className="space-x-4">
        <DeleteDialog deleteType="task">
          <button>
            <Trash2 className="h-6 w-6 text-red-600" />
          </button>
        </DeleteDialog>
        <SummaryDialogWrapper taskId={task.id}>
          <button>
            <PlusIcon />
          </button>
        </SummaryDialogWrapper>
        <EditTaskDialogWrapper task={task}>
          <button>
            <Pencil className="h-6 w-6" />
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
          {current === task.name ? <X /> : <Columns2 />}
        </button>
      </div>
    </div>
  );
}
