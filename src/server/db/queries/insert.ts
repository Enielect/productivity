import { eq } from "drizzle-orm";
import { db } from "..";
import {
  type InsertTask,
  notes,
  taskGroups,
  tasks,
} from "../schema";
import { auth } from "@/auth";

type EditProps = {
  title: string;
  content: string;
  id: number;
};
const session = await auth();

export async function createTaskGroup(data: {name: string}) {
  if(session?.user) await db.insert(taskGroups).values({...data, userId: session.user.id});
}

export async function createTask(data: InsertTask) {
  if(session?.user) await db.insert(tasks).values(data);
}

export async function createSummary(taskId: number, summary: string) {
  if(session?.user) await db.update(tasks).set({ summary }).where(eq(tasks.id, taskId));
}

export async function updateTask(data: InsertTask) {
  if(session?.user) await db.update(tasks).set(data).where(eq(tasks.id, data.id!));
}

export async function editCheckedTask(isChecked: boolean, taskId: number) {
  if(session?.user) await db.update(tasks).set({ isChecked }).where(eq(tasks.id, taskId));
}

export async function deleteTask(taskId: number) {
  if(session?.user) await db.delete(tasks).where(eq(tasks.id, taskId));
}

export async function deleteTaskGroup(taskGroupId: number) {
  if(session?.user) await db.delete(taskGroups).where(eq(taskGroups.id, taskGroupId));
}

export async function createNote(data: {title: string, content: string}) {
  if(session?.user) await db.insert(notes).values({userId: session.user.id, ...data});
}

export async function editNote(data: EditProps) {
  if(session?.user) await db.update(notes).set(data).where(eq(notes.id, data.id));
}

export async function deleteNote(id: number) {
  if(session?.user) await db.delete(notes).where(eq(notes.id, id));
}