"use server";

import { db } from "@/server/db";
import {
  createTask,
  createTaskGroup,
  updateTask,
} from "@/server/db/queries/insert";
import { type InsertTaskGroup } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addTaskGroup(data: InsertTaskGroup) {
  await createTaskGroup(data);
  revalidatePath("/");
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
  try {
    await updateTask({ id, name, resource, reasonForResource });
    return { message: "Task updated successfully" };
  } catch (error) {
    console.error(error);
  }
}

export const getTasksFromGroup = async (id: number) => {
  const tasks = await db.query.taskGroups.findFirst({
    where: (taskGroups, { eq }) => eq(taskGroups.id, id),
    with: {
      tasks: true,
    },
  });
  return tasks;
};

export async function getTask(id: number) {
  const task = await db.query.tasks.findFirst({
    where: (tasks, { eq }) => eq(tasks.id, id),
  });
  return task;
}
