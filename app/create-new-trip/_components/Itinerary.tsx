"use client"
import React, { useEffect, useState } from 'react'
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';
import { Clock, ExternalLink, Star, Ticket, Timer, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from './ChatBox';

function Itinerary({ trip }: { trip?: TripInfo }) {

    // @ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null);

    useEffect(() => {
        trip && setTripData(trip)
    }, [trip])

    const data = tripData ? [
        {
            title: "Hotels",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {tripData?.hotels?.map((hotel: any, index: number) => (
                        <HotelCardItem key={index} hotel={hotel} />
                    ))}
                </div>
            )
        },
        ...tripData?.itinerary?.map((dayData: any) => ({
            title: `Day ${dayData?.day}`,
            content: (
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {dayData?.activities?.map((activity: any, index: number) => (
                            <PlaceCardItem key={index} activity={activity} />
                        ))}
                    </div>
                </div>
            )
        }))
    ] : [];

    return (
        <div className='relative w-full h-[83vh] overflow-auto'>
            {/* @ts-ignore */}
            <Timeline data={data} tripData={tripData} />
        </div>
    )
}

export default Itinerary


