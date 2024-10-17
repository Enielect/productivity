import React, { type ReactNode } from "react";

import Layout from "@/components/Layout";
import { auth } from "@/auth";

export default async function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();
  const image = session?.user.image;
  const username = !!session?.user.name ? session.user.name.split(" ")[0] : "";
  return (
    <Layout image={image!} username={username!}>
      {children}
    </Layout>
  );
}
