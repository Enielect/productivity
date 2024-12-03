import "server-only";

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

export async function createTaskGroup(data: { name: string }) {
  const session = await auth();
  if (session?.user)
    await db.insert(taskGroups).values({ ...data, userId: session.user.id });
}

export async function createTask(data: InsertTask) {
  const session = await auth();
  if (session?.user) await db.insert(tasks).values(data);
  revalidatePath("/dashboard");
  // redirect("/dashboard");
}

export async function createSummary(taskId: number, summary: string) {
  const session = await auth();
  if (session?.user)
    await db.update(tasks).set({ summary }).where(eq(tasks.id, taskId));
}

export async function updateTask(data: InsertTask) {
  const session = await auth();
  if (session?.user)
    await db.update(tasks).set(data).where(eq(tasks.id, data.id!));
}

export async function editCheckedTask(isChecked: boolean, taskId: number) {
  const session = await auth();
  if (session?.user)
    await db.update(tasks).set({ isChecked }).where(eq(tasks.id, taskId));
}

export async function deleteTask(taskId: number, taskGroupId: number) {
  const session = await auth();
  if (session?.user)
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
  const session = await auth();
  if (session?.user)
    await db
      .delete(taskGroups)
      .where(
        and(
          eq(taskGroups.id, taskGroupId),
          eq(taskGroups.userId, session.user.id),
        ),
      );
  redirect("/dashboard");
}

export async function createNote(data: { title: string; content: string }) {
  const session = await auth();
  if (session?.user)
    await db.insert(notes).values({ userId: session.user.id, ...data });
}

export async function editNote(data: EditProps) {
  const session = await auth();
  if (session?.user)
    await db.update(notes).set(data).where(eq(notes.id, data.id));
}

export async function deleteNote(id: number) {
  const session = await auth();
  if (session?.user)
    await db
      .delete(notes)
      .where(and(eq(notes.id, id), eq(notes.userId, session.user.id)));
  revalidatePath("/notes");
  redirect("/notes");
}
