"use server";
import { type GroupType } from "@/components/TasKGroupCard";
import { db } from "..";
import { auth } from "@/auth";
import { notes, type SelectNotes } from "../schema";
import { and, eq, ilike, or } from "drizzle-orm";
import { getWeekNumber } from "@/lib/helpers";
import { unstable_cache } from "next/cache";

export const getGeneralGroupTasks = unstable_cache(async (userId: string) => {
  // const session = await auth();
  // if (!session?.user) return;
  return await db.query.taskGroups.findMany({
    where: (taskGroups, { eq }) => eq(taskGroups.userId, userId),
    with: { tasks: true },
  });
});

export async function formatGroupsAccWeekNum() {
  const session = await auth();
  console.log(session, "this is user session");

  if (!session?.user) return;
  const taskGroups = await getGeneralGroupTasks(session.user.id);
  console.log(taskGroups, "taskGroups debug");
  console.log("this is a console.log function");
  const dict: Record<string, GroupType[]> = taskGroups.reduce(
    (acc: Record<string, GroupType[]>, curr) => {
      const weekFormat = `${getWeekNumber(curr.createdAt)}-${new Date(curr.createdAt).getFullYear()}`;
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
export const getNotes = unstable_cache(async (userId: string) => {
  // const session = await auth();
  // if (!session?.user) return [];
  return await db.query.notes.findMany({
    where: (notes, { eq }) => eq(notes.userId, userId),
  });
});

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

//get the number of completed tasks in each day for a particualar week

export async function getCompletedTasksInWeek(weeks: string) {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dayTaskData: Record<string, number> = {};
  const weeksTasks = await getWeekGroupTasks(weeks);
  console.log(weeksTasks, "weeksTasks");
  if (weeksTasks) {
    const tasksWithDay = await formatGroupsAccDay(weeksTasks);
    for (const key of Object.keys(tasksWithDay)) {
      const date = new Date(key);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
      console.log(dayOfWeek, "dayOfWeek"); // Outputs the day of the week, e.g., "Wednesday"

      const numCompletedTasks = tasksWithDay[key]?.reduce(
        (acc, curr) => acc + curr.tasks.filter((task) => task.isChecked).length,
        0,
      );
      const totalTasks = tasksWithDay[key]?.reduce(
        (acc, curr) => acc + curr.tasks.length,
        0,
      );
      if (!Object.keys(dayTaskData).includes(dayOfWeek))
        dayTaskData[dayOfWeek] = (numCompletedTasks! / totalTasks!) * 100;
    }
  } else {
    weekdays.forEach((day) => {
      dayTaskData[day] = 0;
    });
  }
  return dayTaskData;
}

export async function getBestPerformingWeek() {
  let currHighest = 0;
  let bestWeek = "";
  const allWeekData = await formatGroupsAccWeekNum();
  for (const week of Object.keys(allWeekData!)) {
    const numCompletedTasks = allWeekData?.[week]?.reduce(
      (acc, curr) => acc + curr.tasks.filter((task) => task.isChecked).length,
      0,
    );
    const totalTasks = allWeekData?.[week]?.reduce(
      (acc, curr) => acc + curr.tasks.length,
      0,
    );
    const performancePercentage = (numCompletedTasks! / totalTasks!) * 100;
    if (performancePercentage) {
      currHighest = performancePercentage;
      bestWeek = week;
    }
  }
  return bestWeek;
}

//get total number of completed tasks per day

export async function completedTasksPerDay() {
  const session = await auth();
  const userTaskGroups = await getGeneralGroupTasks(session!.user.id);

  const dict: Record<string, number> = userTaskGroups.reduce(
    (acc: Record<string, number>, curr) => {
      const dayFormat = `${curr.createdAt.toLocaleString().replace("/", "-")}`;
      // if (!acc[dayFormat]) acc[dayFormat] = 0;
      acc[dayFormat] = curr.tasks.filter((task) => task.isChecked).length;
      return acc;
    },
    {},
  );
  return dict;
}

//get the number of tasks planned for the week vs the number of tasks compoleted for the week

export async function statForCurrWeek(currWeek: string) {
  const weekTasksGroups = await getWeekGroupTasks(currWeek);
  let totalTasksCreated = 0;
  let totalTasksCompleted = 0;
  if (weekTasksGroups) {
    totalTasksCompleted += weekTasksGroups.reduce(
      (acc, curr) => acc + curr.tasks.filter((task) => task.isChecked).length,
      0,
    );
    totalTasksCreated += weekTasksGroups.reduce(
      (acc, curr) => acc + curr.tasks.length,
      0,
    );

    return { totalTasksCompleted, totalTasksCreated };
  }
  return { totalTasksCompleted: 0, totalTasksCreated: 0 };
}

//what is the progress for the current week?

//how much more task have you planned this week than you best performing week?
//how much more task have you completed this week than you best performing week?
//how much more tasks have you planned this week than last week?
//how much more tasks have you completed tihs week than last week.

// onst chartData = [
//   { date: "2024-04-01", desktop: 222, mobile: 150 },
//   { date: "2024-04-02", desktop: 97, mobile: 180 },
//   { date: "2024-04-03", desktop: 167, mobile: 120 },

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];
