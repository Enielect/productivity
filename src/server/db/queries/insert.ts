// import "server-only";

import { and, eq } from "drizzle-orm";
import { db } from "..";
import { type InsertTask, notes, taskGroups, tasks } from "../schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

type EditProps = {
  title: string;
  content: string;
  id: number;
};

export async function getAuthenticatedUserId() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user.id;
}

export async function createTaskGroup(data: { name: string }) {
  const userId = await getAuthenticatedUserId();
  await db.insert(taskGroups).values({ ...data, userId });
}

export async function createTask(data: InsertTask) {
  await getAuthenticatedUserId();
  await db.insert(tasks).values(data);
  revalidatePath("/dashboard");
  // redirect("/dashboard");
}

export async function createSummary(taskId: number, summary: string) {
  await getAuthenticatedUserId();
  await db.update(tasks).set({ summary }).where(eq(tasks.id, taskId));
}

export async function updateTask(data: InsertTask) {
  await getAuthenticatedUserId();
  await db.update(tasks).set(data).where(eq(tasks.id, data.id!));
}

export async function editCheckedTask(isChecked: boolean, taskId: number) {
  await getAuthenticatedUserId();
  await db.update(tasks).set({ isChecked }).where(eq(tasks.id, taskId));
}

export async function deleteTask(taskId: number, taskGroupId: number) {
  await getAuthenticatedUserId();
  await db.delete(tasks).where(
    and(
      eq(tasks.id, taskId),
      eq(tasks.taskGroupId, taskGroupId),
      //eq(taskGroups.userId, session.user.id),
    ),
  );
  redirect("/dashboard");
}

export async function deleteTaskGroup(taskGroupId: number) {
  const userId = await getAuthenticatedUserId();
  await db
    .delete(taskGroups)
    .where(and(eq(taskGroups.id, taskGroupId), eq(taskGroups.userId, userId)));
  redirect("/dashboard");
}

export async function createNote(data: { title: string; content: string }) {
  const userId = await getAuthenticatedUserId();
  await db.insert(notes).values({ userId, ...data });
}

export async function editNote(data: EditProps) {
  await getAuthenticatedUserId();
  await db.update(notes).set(data).where(eq(notes.id, data.id));
}

export async function deleteNote(id: number) {
  const userId = await getAuthenticatedUserId();
  await db.delete(notes).where(and(eq(notes.id, id), eq(notes.userId, userId)));
  revalidatePath("/notes");
  redirect("/notes");
}
