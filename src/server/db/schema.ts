// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `better-nextjs_${name}`);

export const taskGroups = createTable("taskGroups", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 1024 }).notNull(),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const taskGroupRelation = relations(taskGroups, ({ many }) => ({
  tasks: many(tasks),
}));


export const tasks = createTable(
  "tasks",
  {
    id: serial("id").primaryKey().notNull(),
    name: varchar("name", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    summary: varchar("summary", { length: 65535 }),
    isChecked: boolean("is_checked").default(false),
    resource: varchar("resource", { length: 65535 }).notNull(),
    reasonForResource: varchar("reason_for_resource", { length: 65535 }).notNull(),
    taskGroupId: serial("task_group_id")
      .notNull()
      .references(() => taskGroups.id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
      () => new Date(),
    ),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const tasksRelation = relations(tasks, ({ one }) => ({
  taskGroup: one(taskGroups, {
    fields: [tasks.taskGroupId],
    references: [taskGroups.id],
  }),
}));

export type InsertTaskGroup = typeof taskGroups.$inferInsert;
export type SelectTaskGroup = typeof taskGroups.$inferSelect;
export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;
