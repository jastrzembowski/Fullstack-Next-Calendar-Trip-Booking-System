"use client";

import { createContext, useContext, ReactNode } from "react";

export interface User {
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserContextType {
  user: User | null;
}

const UserContext = createContext<UserContextType>({ user: null });

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

interface UserProviderProps {
  children: ReactNode;
  user: User | null;
}

export const UserProvider = ({ children, user }: UserProviderProps) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

