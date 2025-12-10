import { api } from "@/lib/api-client";

export default async function Dashboard() {
  const users = await api.get("/api/users");

  return (
    <div>
      <h1>Users</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}
