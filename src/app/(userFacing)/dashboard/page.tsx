import React from "react";

import { auth } from "@/auth";
import Dashboard from "@/components/Dashboard.Page";
import { db } from "@/server/db";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  console.log(session, "session");

  // Get the end of the day
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  console.log(startOfDay, endOfDay);

  const postGroups = async () => {
    return await db.query.taskGroups.findMany({
      with: { tasks: true },
      where: (taskGroups, { lte, gte, eq }) =>
        eq(taskGroups.userId, session.user.id) &&
        lte(taskGroups.createdAt, endOfDay) &&
        gte(taskGroups.createdAt, startOfDay),
    });
  };
  const postGroupData = await postGroups();
  // const postGroups = await getTodaysTasksGroups();
  console.log(postGroups, "postgroups");
  if (!session) redirect("/login");
  return (
    <div className="h-full">
      <Dashboard postGroups={postGroupData} />
      {/* This is the dashboard page */}
    </div>
  );
}
