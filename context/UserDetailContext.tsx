import type { Doc } from "@/convex/_generated/dataModel";
import { createContext,type Dispatch,type SetStateAction } from "react";

export type UserDetail = Omit<Doc<"UserTable">, "_creationTime"> & { _creationTime?: number };
export const UserDetailContext = createContext<{
  userDetail: UserDetail | undefined;
  setUserDetail: Dispatch<SetStateAction<UserDetail | undefined>>;
}>({ userDetail: undefined, setUserDetail: () => {} });
