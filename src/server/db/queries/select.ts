"use server";
import { type GroupType } from "@/components/TasKGroupCard";
import { db } from "..";
import { auth } from "@/auth";
import { notes, type SelectNotes } from "../schema";
import { and, eq, ilike, or } from "drizzle-orm";
import { generateUniqueColors, getWeekNumber } from "@/lib/helpers";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { getAuthenticatedUserId } from "./insert";

export const getGeneralGroupTasks = async (userId: string) => {
  //get all taskGroups associated with a particular user
  return await db.query.taskGroups.findMany({
    where: (taskGroups, { eq }) => eq(taskGroups.userId, userId),
    with: { tasks: true },
  });
};

export async function formatGroupsAccWeekNum() {
  const userId = await getAuthenticatedUserId();
  const taskGroups = await getGeneralGroupTasks(userId);
  //format a user's taskGroups according to the week they were created in the format "{weekNumber-year: GroupType[]}"
  const obj = {} as Record<string, GroupType[]>;

  for (const taskGroup of taskGroups) {
    const createdAt = taskGroup.createdAt;
    const weekFormat = `${getWeekNumber(createdAt)}-${new Date(createdAt).getFullYear()}`;

    if (weekFormat in obj && Array.isArray(obj[weekFormat])) {
      obj[weekFormat].push(taskGroup);
    } else obj[weekFormat] = [taskGroup];
  }

  return obj;
}

export async function formatGroupsAccDay(weekTask: GroupType[]) {
  //format a week's tasks according to the day they were created in the format "{day-month-year: GroupType[]}"

  const obj = {} as Record<string, GroupType[]>;

  for (const week of weekTask) {
    const dayFormat = new Date(week.createdAt).toLocaleDateString();

    if (dayFormat in obj && Array.isArray(obj[dayFormat])) {
      obj[dayFormat].push(week);
    } else obj[dayFormat] = [week];
  }

  return obj;
}

export async function getWeekGroupTasks(week: string) {
  //get taskGroups associated with a particular week. (week is in the format "weekNumber-year")
  const dict = await formatGroupsAccWeekNum();
  if (!Object.keys(dict).length || !(week in dict)) return [];
  return dict[week];
}

export async function getDayGroupTasks(weekTask: GroupType[], day: string) {
  const dict = await formatGroupsAccDay(weekTask);
  if (!Object.keys(dict).length || !(day in dict)) return [];
  return dict[day];
}

export const getNotes = unstable_cache(
  //get notes associated with a particular day for a particular user
  async (userId: string) => {
    if (!userId) redirect("/login");
    return await db.query.notes.findMany({
      where: (notes, { eq }) => eq(notes.userId, userId),
    });
  },
  ["getNotes"],
  { revalidate: 60 * 60 },
);

export async function formatNotesAccDay(notes: SelectNotes[]) {
  //format a user's notes according to the day they were created in the format "{day-month-year: SelectNotes[]}"

  const obj = {} as Record<string, SelectNotes[]>;

  for (const note of notes) {
    const dayFormat = new Date(note.createdAt).toDateString();

    if (dayFormat in obj && Array.isArray(obj[dayFormat])) {
      obj[dayFormat].push(note);
    } else obj[dayFormat] = [note];
  }

  return obj;
}

export async function searchUserNotes(searchTerm: string) {
  const userId = await getAuthenticatedUserId();
  if (!userId) return [];
  const results = await db
    .select()
    .from(notes)
    .where(
      and(
        eq(notes.userId, userId),
        or(
          ilike(notes.title, `%${searchTerm}%`),
          ilike(notes.content, `%${searchTerm}%`),
        ),
      ),
    );

  return results;
}

// reduce the no of request here from 2 to 1 using a complex query that can return the required response

export async function getCompletedTasksInWeek(week: string) {
  //return the record of the efficiency for each day for a particular week e.g {Monday: 50, Tuesday: 60, Wednesday: 70, Thursday: 80, Friday: 90, Saturday: 100, Sunday: 100}
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
  const weekTasks = await getWeekGroupTasks(week);
  if (weekTasks) {
    const tasksWithDay = await formatGroupsAccDay(weekTasks);

    if (!tasksWithDay) return {};

    for (const key of Object.keys(tasksWithDay)) {
      const date = new Date(key);
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

      if (!tasksWithDay[key]) {
        dayTaskData[dayOfWeek] = 0;
        continue;
      } // case when the array for GroupType of a day is empty

      const numCompletedTasks = tasksWithDay[key].reduce(
        (acc, curr) => acc + curr.tasks.filter((task) => task.isChecked).length,
        0,
      );
      const totalTasks = tasksWithDay[key].reduce(
        (acc, curr) => acc + curr.tasks.length,
        0,
      );
      if (!Object.keys(dayTaskData).includes(dayOfWeek))
        dayTaskData[dayOfWeek] = (numCompletedTasks / totalTasks) * 100;
    }
  } else {
    weekdays.forEach((day) => {
      dayTaskData[day] = 0;
    });
  }
  return dayTaskData;
}

export async function getBestPerformingWeek() {
  //return the week with the highest efficiency e.g "42-2024"("weekNumber-year")
  let currHighest = 0;
  let bestWeek = "";
  const allWeekData = await formatGroupsAccWeekNum();

  if (!allWeekData) return "";

  for (const week of Object.keys(allWeekData)) {
    if (!allWeekData[week]) continue;

    const numCompletedTasks = allWeekData[week].reduce(
      (acc, curr) => acc + curr.tasks.filter((task) => task.isChecked).length,
      0,
    );

    const totalTasks = allWeekData[week].reduce(
      (acc, curr) => acc + curr.tasks.length,
      0,
    );

    const performancePercentage = isNaN(numCompletedTasks / totalTasks)
      ? 0
      : (numCompletedTasks / totalTasks) * 100;

    if (performancePercentage && performancePercentage > currHighest) {
      currHighest = performancePercentage;
      bestWeek = week;
    }
  }
  return bestWeek;
}

export async function completedTasksPerDay() {
  //return the record of the number of completed tasks for each day from the whole user's tasks e.g {'2024-10-31': 5, '2024-11-01': 3, '2024-11-02': 2}
  const userId = await getAuthenticatedUserId();

  const userTaskGroups = await getGeneralGroupTasks(userId);

  const obj = {} as Record<string, number>;
  for (const userTaskGroup of userTaskGroups) {
    const dayFormat = `${new Date(userTaskGroup.createdAt).toLocaleDateString().replace(/\//g, "-")}`;

    obj[dayFormat] =
      (obj[dayFormat] ?? 0) +
      userTaskGroup.tasks.filter((task) => task.isChecked).length;
  }

  return obj;
}

export async function statForCurrWeek(currWeek: string) {
  //return the total number of tasks created and completed for a particular week (weekFormat: "weekNumber-year")
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
  // return data for the analytics page for a particular day
  const userId = await getAuthenticatedUserId();

  const startOfDay = new Date(day).setHours(0, 0, 0, 0);
  const endOfDay = new Date(day).setHours(23, 59, 59, 999);

  const userTaskGroupsForDay = await db.query.taskGroups.findMany({
    where: (taskGroups, { eq, lte, gte }) =>
      and(
        eq(taskGroups.userId, userId),
        gte(taskGroups.createdAt, new Date(startOfDay)),
        lte(taskGroups.createdAt, new Date(endOfDay)),
      ),
    with: { tasks: true },
  });

  const completedUserTasks = userTaskGroupsForDay
    .map((task) => task.tasks.filter((task) => task.isChecked))
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
    time: task.updatedAt ?? task.createdAt,
    completedTask: task.name,
  }));

  return {
    totalTasksCreatedPerTaskGroup,
    pieChart,
    radialChartEfficiency,
    comparePlannedVsExecuted,
    completedLongLineChart,
  };
}
