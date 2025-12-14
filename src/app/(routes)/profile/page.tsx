import { notFound } from "next/navigation";

import { getCurrentUser } from "@/server/auth";

import { ProfilePage } from "./ProfilePage";

export default async function Profile() {
  const user = await getCurrentUser();
  if (user?.role !== "user") {
    notFound();
  }
  return <ProfilePage />;
}
