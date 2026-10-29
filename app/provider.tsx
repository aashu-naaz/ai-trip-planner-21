"use client";
import { TripDetailContext,type TripContextType } from "@/context/TripDetailContext";
import { UserDetailContext,type UserDetail } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { usePathname } from "next/navigation";
import { useContext,useEffect,useMemo,useState } from "react";
import { Toaster,toast } from "sonner";
import Header from "./_components/Header";
import type { TripInfo } from "./create-new-trip/_components/ChatBox";

export default function Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useUser();
  const { isAuthenticated } = useConvexAuth();
  const [storedUser, setUserDetail] = useState<UserDetail>();
  const [tripDetailInfo, setTripDetailInfo] = useState<TripInfo | null>(null);
  const createUser = useMutation(api.user.CreateNewUser);
  const email = user?.primaryEmailAddress?.emailAddress;
  const name = user?.fullName ?? "";
  const imageUrl = user?.imageUrl ?? "";
  const userDetail = isAuthenticated && storedUser?.email === email ? storedUser : undefined;

  useEffect(() => {
    if (!email || !isAuthenticated) return;
    let subscribed = true;
    void createUser({ email, name, imageUrl }).then((result) => {
      if (subscribed) setUserDetail(result);
    }).catch(() => {
      if (subscribed) toast.error("We couldn’t load your account. Please try reloading the page.");
    });
    return () => { subscribed = false; };
  }, [email, name, imageUrl, createUser, isAuthenticated]);

  const userContext = useMemo(() => ({ userDetail, setUserDetail }), [userDetail]);
  const tripContext = useMemo(() => ({ tripDetailInfo, setTripDetailInfo }), [tripDetailInfo]);
  return (
    <UserDetailContext.Provider value={userContext}>
      <TripDetailContext.Provider value={tripContext}>
        <div className="min-h-screen">
          {!pathname.startsWith("/print-trip") && <Header />}
          {children}
          <Toaster theme="dark" richColors closeButton />
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export const useUserDetail = () => useContext(UserDetailContext);
export const useTripDetail = (): TripContextType => {
  const context = useContext(TripDetailContext);
  if (!context) throw new Error("Trip details must be used inside Provider");
  return context;
};
