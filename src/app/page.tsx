import Home from "@/components/Home.Page";
import { db } from "@/server/db";

export default async function HomePage() {
  // const posts = await db.query.posts.findMany();
  // console.log(posts);
  return (
    <main className="">
      <Home />
    </main>
  );
}
