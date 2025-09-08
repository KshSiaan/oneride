// components/UserProvider.tsx
"use client";

import { UserContext } from "@/context/userContext";
import { User } from "@/types/user";
import { ReactNode, useState } from "react";

interface UserProviderProps {
  children: ReactNode;
  initialUser?: User | null; // optional initial user
}

export default function UserProvider({
  children,
  initialUser = null,
}: UserProviderProps) {
  const [user] = useState<User | null>(initialUser);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
