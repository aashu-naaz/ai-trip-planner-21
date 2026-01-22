"use client"
import React, { useEffect, useState } from 'react'
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';
import { ArrowLeft } from 'lucide-react';

function Itinerary() {

    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null);

    useEffect(() => {
        tripDetailInfo && setTripData(tripDetailInfo)
    }, [tripDetailInfo])

    const data = tripData ? [
        {
            title: "Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {tripData?.hotels?.map((hotel, index) => (
                        <HotelCardItem key={index} hotel={hotel} />
                    ))}
                </div>
            )
        },
        ...(tripData?.itinerary?.map((dayData, index) => ({
            title: `Day ${dayData.day}`,
            content: (
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {dayData.activities?.map((activity, index) => (
                            <PlaceCardItem key={index} activity={activity} />
                        ))}
                    </div>
                </div>
            )
        })) || [])
    ] : [];

    return (
        <div className='relative w-full h-[83vh] overflow-auto'>
            {tripData ? <Timeline data={data} tripData={tripData} />
                :
                <div>
                    <h2 className='flex gap-2 text-3xl text-white items-center absolute bottom-20'> <ArrowLeft />Getting to know you to build perfect trip here...</h2>
                    <Image src="/pantheon.png" alt="Pantheon" width={800} height={600} className='w-full h-full object-cover rounded-3xl' />
                </div>
            }
        </div>
    )
}

export default Itinerary


