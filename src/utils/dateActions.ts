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

export async function handleFetchSlots(date?: Date) {
  if (!date) {
    return { success: false, error: "Date is required" };
  }
  const response = await fetch(
    `${BASE_URL}/api/dates?date=${dayjs(date).format("YYYY-MM-DD")}`
  );
  const data = await response.json();

  if (data.success) {
    return { success: true, dates: data.dates };
  } else {
    return { success: false, error: data.error };
  }
}
