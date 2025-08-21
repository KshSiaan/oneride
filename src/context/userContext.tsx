"use client";
import { createContext, useContext } from "react";
import { User } from "@/types/user";

type UserContextType = User | null;

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a <UserProvider>");
  return ctx; // { user, setUser }
}
