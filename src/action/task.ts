'use server'

import { createTaskGroup } from "@/server/db/queries/insert";
import { InsertTaskGroup } from "@/server/db/schema";

export async function addTaskGroup(data: InsertTaskGroup) {
  await createTaskGroup(data);
}