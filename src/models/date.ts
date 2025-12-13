import { User } from "./user";

export interface SlotItem {
  id: string;
  date: Date;
  isBooked: boolean;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SlotItemWithUser extends SlotItem {
  user?: User;
}
