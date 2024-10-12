import React from "react";
import { type Session } from "next-auth";

import Layout from "@/components/Layout";
import type { LayoutProps } from ".next/types/app/layout";
import { auth } from "@/auth";

export default async function UserLayout({ children }: LayoutProps) {
  const session = await auth();
  const image = session?.user.image;
  const username = !!session?.user.name ? session.user.name.split(" ")[0] : "";
  return (
    <Layout image={image!} username={username!}>
      {children}
    </Layout>
  );
}
