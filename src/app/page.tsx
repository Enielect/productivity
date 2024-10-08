import Home from "@/components/Home.Page";
import { db } from "@/server/db";

export default async function HomePage() {


  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  // Get the end of the day
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  console.log(startOfDay, endOfDay);
  const postGroups = await db.query.taskGroups.findMany({
    where: (taskGroups, { lte, gte }) =>
      lte(taskGroups.createdAt, endOfDay) &&
      gte(taskGroups.createdAt, startOfDay),
  });
  console.log(postGroups);
  return (
    <main className="">
      <Home postGroups={postGroups} />
    </main>
  );
}
