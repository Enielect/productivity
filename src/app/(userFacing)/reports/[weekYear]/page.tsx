import {
  formatGroupsAccDay,
  getWeekGroupTasks,
} from "@/server/db/queries/select";
import Link from "next/link";
import React from "react";
type Params = {
  params: { weekYear: string };
};
const WeekPage = async ({ params }: Params) => {
  const weeksTasks = await getWeekGroupTasks(params.weekYear);
  const daysDicts = await formatGroupsAccDay(weeksTasks!);
  const days = Object.keys(daysDicts);
  return (
    <div className="mt-2 space-y-4 px-3">
      {days.map((day) => (
        <Link
          className="block w-full rounded-md bg-green-500 px-3 py-2"
          href={`/reports/${params.weekYear}/${day.split("/").join("-")}`}
          key={day}
        >
          {new Date(day).toDateString()}
        </Link>
      ))}
    </div>
  );
};

export default WeekPage;
