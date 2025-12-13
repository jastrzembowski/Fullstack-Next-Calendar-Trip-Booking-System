import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { getCurrentUser } from "@/server/auth";
import { adminFetchSlots } from "@/utils";

import { AdminPage } from "./AdminPage";

export default async function Admin() {
  const user = await getCurrentUser();
  if (user?.role !== "admin") {
    notFound();
  }

  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const data = await adminFetchSlots(cookieHeader);

  return <AdminPage dates={data.dates} />;
}
