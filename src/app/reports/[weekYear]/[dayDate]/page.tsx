import {
  getDayGroupTasks,
  getWeekGroupTasks,
} from "@/server/db/queries/select";
import React from "react";

type Params = {
  params: { weekYear: string; dayDate: string };
};

const DayPage = async ({ params }: Params) => {
  const weekTasks = await getWeekGroupTasks(params.weekYear);
  const formatParams = params.dayDate.split("-").join("/");
  const dayTasks = await getDayGroupTasks(weekTasks!, formatParams);
  return (
    <div>{dayTasks?.map((task) => <div key={task.id}>{task.name}</div>)}</div>
  );
};

export default DayPage;
