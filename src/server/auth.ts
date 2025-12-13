import { cookies } from "next/headers";

import { verifyToken } from "./services/token.service";
import { UserService } from "./services/user.service";

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth")?.value;

    if (!token) {
      console.log("No auth token found in cookies");
      return null;
    }

    const decoded = verifyToken(token) as { id: number };

    if (!decoded || !decoded.id) {
      console.log("Invalid token payload:", decoded);
      return null;
    }

    const user = await UserService.findById(decoded.id);

    if (!user) {
      console.log("User not found for id:", decoded.id);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}
