import React from "react";

import Dashboard from "@/components/Dashboard.Page";
import { db } from "@/server/db";
import { getAuthenticatedUserId } from "@/server/db/queries/insert";

export default async function DashboardPage() {
 const userId =  await getAuthenticatedUserId();

  // Get the end of the day
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const postGroups = async () => {
    return await db.query.taskGroups.findMany({
      with: { tasks: true },
      where: (taskGroups, { lte, gte, eq }) =>
        eq(taskGroups.userId, userId) &&
        lte(taskGroups.createdAt, endOfDay) &&
        gte(taskGroups.createdAt, startOfDay),
    });
  };
  const postGroupData = await postGroups();
  // const postGroups = await getTodaysTasksGroups();
  return (
    <div className="h-full">
      <Dashboard postGroups={postGroupData} />
      {/* This is the dashboard page */}
    </div>
  );
}
