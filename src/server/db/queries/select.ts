"use server";
import { type GroupType } from "@/components/TasKGroupCard";
import { db } from "..";
import { auth } from "@/auth";
import { notes, type SelectNotes } from "../schema";
import { and, eq, ilike, or } from "drizzle-orm";

export async function getGeneralGroupTasks() {
  const session = await auth();
  if (!session?.user) return;
  await db.query.taskGroups.findMany({
    where: (taskGroups, { eq }) => eq(taskGroups.userId, session.user.id),
  });
}

//filter groups tasks by day created
function getWeekNumber(date: Date) {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.ceil(
    (date.getTime() - oneJan.getTime()) / 86400000,
  );
  const result = Math.ceil((numberOfDays + 1) / 7);
  return result;
}

export async function formatGroupsAccWeekNum() {
  const session = await auth();

  if (!session?.user) return;
  const taskGroups = await db.query.taskGroups.findMany({
    where: (taskGroups, { eq }) => eq(taskGroups.userId, session.user.id),
    with: { tasks: true },
  });
  const dict: Record<string, GroupType[]> = taskGroups.reduce(
    (acc: Record<string, GroupType[]>, curr) => {
      const weekFormat = `${getWeekNumber(curr.createdAt)}-${curr.createdAt.getFullYear()}`;
      if (!acc[weekFormat]) acc[weekFormat] = [];
      acc[weekFormat].push(curr);
      return acc;
    },
    {},
  );
  return dict;
}

//sort weeks tasks according to day(24/04/20) created

export async function formatGroupsAccDay(weekTask: GroupType[]) {
  const dict: Record<string, GroupType[]> = weekTask.reduce(
    (acc: Record<string, GroupType[]>, curr) => {
      const dayFormat = new Date(curr.createdAt).toLocaleDateString();
      if (!acc[dayFormat]) acc[dayFormat] = [];
      acc[dayFormat].push(curr);
      return acc;
    },
    {},
  );
  return dict;
}

export async function getWeekGroupTasks(week: string) {
  const dict = await formatGroupsAccWeekNum();
  if (!dict) return [];
  return dict[week];
}

export async function getDayGroupTasks(weekTask: GroupType[], day: string) {
  const dict = await formatGroupsAccDay(weekTask);
  return dict[day];
}

//filtering taskGroupa on a weekly basis

//format a date to get the week number in that year

//filtering taskGroups on a weekly basis
//format a date to get the week number in that year

///create a functionality where users can't add tasks to a group that is not created on the same day

//fetching taskGroups based on date created

//filtering tasks on a daily basis

//get tasks based on taskGroupsId

export async function getGroupTasks(groupId: number) {
  return await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.taskGroupId, groupId),
  });
}

//get notes associated with a particular day for a particular user
export async function getNotes() {
  const session = await auth();
  if (!session?.user) return [];
  return await db.query.notes.findMany({
    where: (notes, { eq }) => eq(notes.userId, session.user.id),
  });
}

export async function formatNotesAccDay(notes: SelectNotes[]) {
  const dict: Record<string, SelectNotes[]> = notes.reduce(
    (acc: Record<string, SelectNotes[]>, curr) => {
      const dayFormat = new Date(curr.createdAt).toDateString();
      if (!acc[dayFormat]) acc[dayFormat] = [];
      acc[dayFormat].push(curr);
      return acc;
    },
    {},
  );
  return dict;
}

export async function searchUserNotes(searchTerm: string) {
  const session = await auth();
  if (!session?.user) return [];
  const results = await db
    .select()
    .from(notes)
    .where(
      and(
        eq(notes.userId, session.user.id),
        or(
          ilike(notes.title, `%${searchTerm}%`),
          ilike(notes.content, `%${searchTerm}%`),
        ),
      ),
    );

  return results;
}
