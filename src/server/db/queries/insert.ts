import { db } from "..";
import { type InsertTask, type InsertTaskGroup, taskGroupTable, taskTable } from "../schema";

export async function createTaskGroup(data: InsertTaskGroup) {
  await db.insert(taskGroupTable).values(data);
}

export async function createTask(data: InsertTask) {
    await db.insert(taskTable).values(data);
}
