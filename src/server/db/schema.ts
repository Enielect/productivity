// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  text,
  index,
  integer,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `better-nextjs_${name}`);

export const users = createTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  image: text("image"),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const accounts = createTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const userRelation = relations(users, ({ many }) => ({
  taskGroups: many(taskGroups),
  notes: many(notes),
}));

export const taskGroups = createTable("taskGroups", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 1024 }).notNull(),
  progress: integer("progress").default(0),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const notes = createTable("notes", {
  id: serial("id").primaryKey().notNull(),
  title: varchar("title", { length: 1024 }).notNull(),
  content: text("content").notNull(),
  userId: varchar("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
});

export const taskGroupRelation = relations(taskGroups, ({ many, one }) => ({
  tasks: many(tasks),
  user: one(users, {
    fields: [taskGroups.userId],
    references: [users.id],
  }),
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
    reasonForResource: varchar("reason_for_resource", {
      length: 65535,
    }).notNull(),
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
export type SelectNotes = typeof notes.$inferSelect;

export type InsertTask = typeof tasks.$inferInsert;
export type SelectTask = typeof tasks.$inferSelect;
