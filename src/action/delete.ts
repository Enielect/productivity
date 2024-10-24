"use server";
import { deleteTask, deleteTaskGroup } from "@/server/db/queries/insert";

// async function removeNoteAction(noteId) {
//     await removeNote(noteId);
// }

export async function deleteTaskAction(taskId: number, taskGroupId: number) {
  await deleteTask(taskId, taskGroupId);
}

export async function deleteTaskGroupAction(taskGroupId: number) {
  await deleteTaskGroup(taskGroupId);
}
