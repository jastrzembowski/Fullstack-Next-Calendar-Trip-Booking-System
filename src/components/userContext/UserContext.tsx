"use client";

import { createContext, ReactNode, useContext } from "react";

import { User } from "@/models";

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
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
