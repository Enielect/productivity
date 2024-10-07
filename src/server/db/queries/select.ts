"use server";
import { db } from "..";
import { type SelectTaskGroup } from "../schema";

export async function getGeneralGroupTasks() {
  await db.query.taskGroups.findMany();
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



async function formatGroupsAccWeekNum() {
  const taskGroups = await db.query.taskGroups.findMany();
  const dict: Record<string, SelectTaskGroup[]> = taskGroups.reduce(
    (acc: Record<string, SelectTaskGroup[]>, curr) => {
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

async function formatGroupsAccDay(weekTask: SelectTaskGroup[]) {
  const dict: Record<string, SelectTaskGroup[]> = weekTask.reduce(
    (acc: Record<string, SelectTaskGroup[]>, curr) => {
      const dayFormat = new Date(curr.createdAt).toLocaleDateString();
      if (!acc[dayFormat]) acc[dayFormat] = [];
      acc[dayFormat].push(curr);
      return acc;
    },
    {},
  );
  return dict;
}

async function getWeekGroupTasks(week: string) {
  const dict = await formatGroupsAccWeekNum();
  return dict[week];
}

async function getDayGroupTasks(weekTask: SelectTaskGroup[], day: string) {
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
