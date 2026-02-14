"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { usePathname } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { TripDetailContext, TripContextType } from '@/context/TripDetailContext';

function Provider({

  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState<any>();
  const [tripDetailInfo, setTripDetailInfo] = useState<any>();
  const createUser = useMutation(api.user.CreateNewUser);

  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    // Save New User if not Exist
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress ?? '',
      name: user?.fullName ?? '',
      imageUrl: user?.imageUrl ?? '',
    });
    setUserDetail(result);
  };


  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <TripDetailContext.Provider value={{ tripDetailInfo, setTripDetailInfo }}>
        <div className={pathname === '/create-new-trip' ? 'bg-[#fce7f3] min-h-screen transition-colors duration-500' : ''}>
          {/* Hide Header on print page */}
          {!pathname?.startsWith('/print-trip') && <Header />}
          {children}
        </div>
      </TripDetailContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;

export const useUserDetail = () => {
  return useContext(UserDetailContext);
}

export const useTripDetail = (): TripContextType => {
  return useContext(TripDetailContext) as TripContextType;
}
