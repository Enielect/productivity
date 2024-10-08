"use server";

import { db } from "@/server/db";
import { createTask, createTaskGroup } from "@/server/db/queries/insert";
import { type InsertTaskGroup } from "@/server/db/schema";
import { revalidatePath } from "next/cache";

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
    revalidatePath("/");

    return { message: "Task added successfully" };
  } catch (error) {
    console.error(error);
  }
}

export async function getTasksFromGroup(id: number) {
  const tasks = await db.query.taskGroups.findFirst({
    where: (taskGroups, { eq }) => eq(taskGroups.id, id),
    with: {
      tasks: true,
    },
  });
  return tasks;
}
