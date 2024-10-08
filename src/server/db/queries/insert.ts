import { eq } from "drizzle-orm";
import { db } from "..";
import {
  type InsertTask,
  type InsertTaskGroup,
  taskGroups,
  tasks,
} from "../schema";

export async function createTaskGroup(data: InsertTaskGroup) {
  await db.insert(taskGroups).values(data);
}

export async function createTask(data: InsertTask) {
  await db.insert(tasks).values(data);
}

export async function updateTask(data: InsertTask) {
  await db.update(tasks).set(data).where(eq(tasks.id, data.id!));
}
