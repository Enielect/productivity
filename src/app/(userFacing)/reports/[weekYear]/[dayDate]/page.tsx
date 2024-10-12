import {
  getDayGroupTasks,
  getWeekGroupTasks,
} from "@/server/db/queries/select";
import React from "react";
import TaskGroupWrapper from "./components/TaskGroupWrapper";

type Params = {
  params: { weekYear: string; dayDate: string };
};

const DayPage = async ({ params }: Params) => {
  const weekTasks = await getWeekGroupTasks(params.weekYear);
  const formatParams = params.dayDate.split("-").join("/");
  const dayTasks = await getDayGroupTasks(weekTasks!, formatParams);
  return (
    <div>
      <TaskGroupWrapper dayTasks={dayTasks!} />
    </div>
  );
};

export default DayPage;
