const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function adminFetchSlots(cookieHeader?: string) {
  const headers: HeadersInit = {};

  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  const response = await fetch(`${BASE_URL}/api/admin`, {
    headers,
  });

  console.log(response);

  const data = await response.json();
  if (data.success) {
    return { success: true, dates: data.dates };
  } else {
    return { success: false, error: data.error };
  }
}

export async function adminDeleteSlot(id: string, cookieHeader?: string) {
  const headers: HeadersInit = {};

  if (cookieHeader) {
    headers.Cookie = cookieHeader;
  }

  const response = await fetch(`${BASE_URL}/api/admin?id=${id}`, {
    headers,
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}