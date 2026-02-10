"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUserDetail } from '../provider'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import MyTripCardItem from './_components/MyTripCardItem'

function MyTrips() {
    const { userDetail, setUserDetail } = useUserDetail();

    // Only run query if we have a userDetail._id, otherwise pass empty string (or handling mechanism)
    // However, Convex queries are reactive. If we pass a value that doesn't match, it returns nothing/error.
    // Better to ensure it doesn't fail.
    const userTrips = useQuery(api.tripDetail.GetUserTrips, {
        uid: userDetail?._id ?? ''
    });

    return (
        <div className='px-10 p-10 md:px-24 lg:px-48'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            {userTrips?.length == 0 ? (
                <div className='p-7 border rounded-2xl flex flex-col items-center justify-center mt-10 gap-5'>
                    <h2 className='font-bold text-xl'>You don't have any trip plan created!</h2>
                    <Link href={'/create-new-trip'}>
                        <Button>Create New Trip</Button>
                    </Link>
                </div>
            ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                    {userTrips?.map((trip, index) => (
                        <MyTripCardItem key={index} trip={trip} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default MyTrips
