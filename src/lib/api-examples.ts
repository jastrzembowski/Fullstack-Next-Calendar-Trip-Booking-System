/**
 * Example usage of the DateService API endpoints from the frontend
 * 
 * This file demonstrates how to call the date endpoints using the api client.
 * You can use these patterns in your React components.
 */

import { api } from "./api-client";

// Example: Get all dates
export async function getAllDates() {
  try {
    const dates = await api.get("/api/dates");
    return dates;
  } catch (error) {
    console.error("Failed to fetch dates:", error);
    throw error;
  }
}

// Example: Get dates for a specific user
export async function getUserDates(userId: number) {
  try {
    const dates = await api.get(`/api/dates?userId=${userId}`);
    return dates;
  } catch (error) {
    console.error("Failed to fetch user dates:", error);
    throw error;
  }
}

// Example: Create a new date
export async function createDate(data: {
  date: Date | string;
  title?: string;
  notes?: string;
  userId?: number;
}) {
  try {
    const newDate = await api.post("/api/dates", {
      ...data,
      date: data.date instanceof Date ? data.date.toISOString() : data.date,
    });
    return newDate;
  } catch (error) {
    console.error("Failed to create date:", error);
    throw error;
  }
}

// Example: Update an existing date
export async function updateDate(
  id: string,
  data: {
    date?: Date | string;
    title?: string;
    notes?: string;
  }
) {
  try {
    const updatedDate = await api.put("/api/dates", {
      id,
      ...data,
      date: data.date
        ? data.date instanceof Date
          ? data.date.toISOString()
          : data.date
        : undefined,
    });
    return updatedDate;
  } catch (error) {
    console.error("Failed to update date:", error);
    throw error;
  }
}

// Example: Delete a date
export async function deleteDate(id: string) {
  try {
    const result = await api.delete(`/api/dates?id=${id}`);
    return result;
  } catch (error) {
    console.error("Failed to delete date:", error);
    throw error;
  }
}

/**
 * Example React component usage:
 * 
 * "use client";
 * 
 * import { useState, useEffect } from "react";
 * import { getAllDates, createDate, updateDate, deleteDate } from "@/lib/api-examples";
 * 
 * export function DatesComponent() {
 *   const [dates, setDates] = useState([]);
 *   const [loading, setLoading] = useState(true);
 * 
 *   useEffect(() => {
 *     loadDates();
 *   }, []);
 * 
 *   const loadDates = async () => {
 *     try {
 *       setLoading(true);
 *       const data = await getAllDates();
 *       setDates(data);
 *     } catch (error) {
 *       console.error("Error loading dates:", error);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 * 
 *   const handleCreate = async () => {
 *     try {
 *       const newDate = await createDate({
 *         date: new Date(),
 *         title: "New Event",
 *         userId: 1,
 *       });
 *       setDates([...dates, newDate]);
 *     } catch (error) {
 *       console.error("Error creating date:", error);
 *     }
 *   };
 * 
 *   const handleUpdate = async (id: string) => {
 *     try {
 *       const updated = await updateDate(id, {
 *         title: "Updated Event",
 *       });
 *       setDates(dates.map((d) => (d.id === id ? updated : d)));
 *     } catch (error) {
 *       console.error("Error updating date:", error);
 *     }
 *   };
 * 
 *   const handleDelete = async (id: string) => {
 *     try {
 *       await deleteDate(id);
 *       setDates(dates.filter((d) => d.id !== id));
 *     } catch (error) {
 *       console.error("Error deleting date:", error);
 *     }
 *   };
 * 
 *   if (loading) return <div>Loading...</div>;
 * 
 *   return (
 *     <div>
 *       <button onClick={handleCreate}>Create Date</button>
 *       {dates.map((date) => (
 *         <div key={date.id}>
 *           <h3>{date.title || date.date}</h3>
 *           <button onClick={() => handleUpdate(date.id)}>Update</button>
 *           <button onClick={() => handleDelete(date.id)}>Delete</button>
 *         </div>
 *       ))}
 *     </div>
 *   );
 * }
 */

