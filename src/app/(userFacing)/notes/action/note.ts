"use server";

import { createNote, deleteNote, editNote } from "@/server/db/queries/insert";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addNote(prev: unknown, formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  try {
    await createNote({ title, content });
    // return { success: "Note added successfully" };
  } catch (err) {
    console.error(err);
    return { error: "failed to create note" };
  }

  revalidatePath("/notes");
  redirect("/notes");
}

export async function updateNote(title: string, content: string, id: number) {
  try {
    await editNote({ title, content, id });
  } catch (err) {
    console.error(err);
    return { error: "failed to update note" };
  }
  revalidatePath("/notes");
  redirect("/notes");
}

export async function removeNote(id: number) {
  await deleteNote(id);
  revalidatePath("/notes");
  redirect("/notes");
}