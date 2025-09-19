"use server";

import {
  createSummary,
  createTask,
  createTaskGroup,
  editCheckedTask,
  updateTask,
} from "@/server/db/queries/insert";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function addTaskGroup(data: { name: string }) {
  await createTaskGroup(data);
  revalidatePath("/dashboard");
}

export async function addTask(
  id: number,
  prevState: unknown,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const resource = formData.get("resource") as string;
  const reasonForResource = formData.get("reasonForResource") as string;
  try {
    await createTask({ taskGroupId: id, name, resource, reasonForResource });

    return { message: "Task added successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Task not added" };
  }
}

export async function editTask(
  id: number,
  prevState: unknown,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const resource = formData.get("resource") as string;
  const reasonForResource = formData.get("reasonForResource") as string;
  const summary = formData.get("summary") as string;
  try {
    if (!!summary)
      await updateTask({ id, name, resource, reasonForResource, summary });
    else await updateTask({ id, name, resource, reasonForResource });

    revalidatePath("/dashboard");
    redirect("/dashboard");
    return { message: "Task updated successfully" };
  } catch (error) {
    console.error(error);
  }
}

export async function addSummary(
  taskId: number,
  prevState: unknown,
  formData: FormData,
) {
  const summary = formData.get("summary") as string;
  try {
    await createSummary(taskId, summary);
    revalidatePath("/dashboard");
    redirect("/dashboard");
    return { message: "Summary added successfully" };
  } catch (error) {
    console.error(error);
  }
}

// export const getTasksFromGroup = unstable_cache(async (id: number) => {
//   if (!session?.user) return;
//   const tasks = await db.query.taskGroups.findFirst({
//     where: (taskGroups, { eq }) =>
//       and(eq(taskGroups.id, id), eq(taskGroups.userId, session.user.id)),
//     with: {
//       tasks: true,
//     },
//   });
//   return tasks;
// });

// export const getTask = unstable_cache(async (id: number) => {
//   const task = await db.query.tasks.findFirst({
//     where: (tasks, { eq }) => eq(tasks.id, id),
//   });
//   return task;
// });

export async function setChecked(isChecked: boolean, id: number) {
  try {
    await editCheckedTask(isChecked, id);
    revalidatePath("/dashboard");
  } catch (error) {
    console.error(error);
  }
}
