"use client"
import React, { useEffect } from 'react'
import Header from './_components/Header';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { user } = useUser();
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
    console.log(result);
  };


  return (
    <div>
      <Header />
      {children}
    </div>
  );
}

export default Provider;
