import dayjs from "dayjs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function handleCreateDate(date: string) {
  const response = await fetch(`${BASE_URL}/api/dates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ date: date }),
  });
  const data = await response.json();
  if (data) {
    return { success: true, date: data.date };
  } else {
    return { success: false, error: data.error };
  }
}

export async function handleFetchSlots(
  date?: Date | null,
  userId?: number | null
) {
  let url = `${BASE_URL}/api/dates`;
  if (date) {
    url += `?date=${dayjs(date).format("YYYY-MM-DD")}`;
  } else if (userId) {
    url += `?userId=${userId}`;
  }
  const response = await fetch(url);
  const data = await response.json();

  if (data.success) {
    return { success: true, dates: data.dates };
  } else {
    return { success: false, error: data.error };
  }
}

export async function handleDeleteDate(id: string) {
  const response = await fetch(`${BASE_URL}/api/dates?id=${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  if (data.success) {
    return { success: true };
  } else {
    return { success: false, error: data.error };
  }
}
