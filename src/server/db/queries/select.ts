"use server";
import { type GroupType } from "@/components/TasKGroupCard";
import { db } from "..";
import { auth } from "@/auth";
import { notes, type SelectNotes } from "../schema";
import { and, eq, ilike, or } from "drizzle-orm";
import { getWeekNumber } from "@/lib/helpers";
import { unstable_cache } from "next/cache";

export const getGeneralGroupTasks = unstable_cache(
  async (userId: string) => {
    // const session = await auth();
    // if (!session?.user) return;
    return await db.query.taskGroups.findMany({
      where: (taskGroups, { eq }) => eq(taskGroups.userId, userId),
      with: { tasks: true },
    });
  },
  ["generalGroupTasks"],
  { revalidate: 60 * 60 * 24 },
);

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
      console.log(curr, "currenet date");
      const dayFormat = `${new Date(curr.createdAt).toLocaleDateString().replace(/\//g, "-")}`;
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

export async function completedTasksInDay(day: string) {
  const session = await auth();
  const startOfDay = new Date(day).setHours(0, 0, 0, 0);
  const endOfDay = new Date(day).setHours(23, 59, 59, 999);
  const userTaskGroupsForDay = await db.query.taskGroups.findMany({
    where: (taskGroups, { eq, lte, gte }) =>
      and(
        eq(taskGroups.userId, session!.user.id),
        gte(taskGroups.createdAt, new Date(startOfDay)),
        lte(taskGroups.createdAt, new Date(endOfDay)),
      ),
    with: { tasks: true },
  });

  console.log(userTaskGroupsForDay, "userTaskGroupsForDay");
  console.log(new Date(day), "day");

  const completedUserTasks = userTaskGroupsForDay
    .map((task) =>
      task.tasks.filter((task) => task.isChecked && task.updatedAt),
    )
    .flat();

  const totalTasksPlanned = userTaskGroupsForDay
    .map((task) => task.tasks.length)
    .reduce((acc, curr) => acc + curr, 0);

  const totalTasksCompleted = completedUserTasks.length;
  const performancePercentage = totalTasksCompleted / totalTasksPlanned;
  const totalTasksCreatedPerTaskGroup = userTaskGroupsForDay.map(
    (taskGroup, index) => ({
      taskGroup: taskGroup.name,
      tasksLength: taskGroup.tasks.length,
      fill: generateUniqueColors(userTaskGroupsForDay.length)[index] ?? "",
    }),
  );

  const percentageCompletePerTaskGroup = userTaskGroupsForDay.map(
    (taskGroup) => {
      const completedTasks = taskGroup.tasks.filter((task) => task.isChecked);
      return {
        taskGroup: taskGroup.name,
        percentage: (completedTasks.length / taskGroup.tasks.length) * 100,
      };
    },
  );
  //useful links extractef from resoure

  const pieChart = percentageCompletePerTaskGroup.map((taskGroup, index) => ({
    taskGroup: taskGroup.taskGroup,
    efficiency: taskGroup.percentage,
    fill:
      generateUniqueColors(percentageCompletePerTaskGroup.length)[index] ?? "",
  }));

  const radialChartEfficiency = [
    { label: "Efficiency", efficiency: performancePercentage },
  ];

  const comparePlannedVsExecuted = [
    { tasksPlanned: totalTasksPlanned, tasksCompleted: totalTasksCompleted },
  ];

  const completedLongLineChart = completedUserTasks.map((task) => ({
    time: task.updatedAt!,
    completedTask: task.name,
  }));
  console.log(completedLongLineChart, "completedLongLineChart");

  return {
    totalTasksCreatedPerTaskGroup,
    pieChart,
    radialChartEfficiency,
    comparePlannedVsExecuted,
    completedLongLineChart,
  };
}

function generateUniqueColors(numColors: number) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    // Distribute the colors evenly on the hue range (0 - 360)
    const hue = Math.round((360 * i) / numColors);
    // Convert hue to RGB
    const color = `hsl(${hue}, 100%, 50%)`;
    colors.push(color);
  }
  return colors;
}

function formatTime(date: string) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

//what is the progress for the current week?
