export interface UserToDB {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: number;
  email: string;
  name: string;
  surname: string;
  role: string;
}
