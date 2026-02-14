"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUserDetail } from '../provider'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import UserTripCard from './_components/UserTripCard'

function MyTrips() {
    const { userDetail, setUserDetail } = useUserDetail();

    // Only run query if we have a userDetail._id, otherwise pass empty string (or handling mechanism)
    // However, Convex queries are reactive. If we pass a value that doesn't match, it returns nothing/error.
    // Better to ensure it doesn't fail.
    const userTrips = useQuery(api.tripDetail.GetUserTrips, {
        uid: userDetail?._id ?? ''
    });

    return (
        <div className='min-h-screen pt-36 pb-10 px-5 md:px-20 lg:px-36 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden'>

            {/* Background Elements */}
            <div className='absolute top-0 left-0 w-full h-[500px] bg-purple-900/20 blur-[120px] pointer-events-none' />

            <div className='relative z-10'>
                <h2 className='font-bold text-4xl mb-10 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent inline-block'>
                    My Travel Collection
                </h2>

                {userTrips?.length == 0 ? (
                    <div className='mt-20 flex flex-col items-center justify-center text-center space-y-6 animate-fade-up'>
                        <div className='w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(168,85,247,0.3)]'>
                            <span className='text-4xl'>🚀</span>
                        </div>
                        <h2 className='font-bold text-2xl text-white'>No missions logged yet!</h2>
                        <p className='text-gray-400 max-w-md'>Your travel log is empty. It's time to discover new worlds and create unforgettable memories.</p>
                        <Link href={'/create-new-trip'}>
                            <Button className="rounded-full bg-gradient-to-r from-purple-500 to-violet-600 px-8 py-6 text-lg hover:scale-105 transition shadow-lg shadow-purple-500/40">
                                Launch New Mission
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {userTrips ? userTrips.map((trip, index) => (
                            <UserTripCard key={index} trip={trip} />
                        )) : (
                            // Skeleton Loading
                            [1, 2, 3, 4, 5, 6].map((item, index) => (
                                <div key={index} className='h-[250px] w-full bg-white/5 animate-pulse rounded-3xl'></div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyTrips
