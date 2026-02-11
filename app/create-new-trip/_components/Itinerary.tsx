"use client"
import React, { useEffect, useState, useRef } from 'react'

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
    const scrollContainerRef = useRef<HTMLDivElement>(null);

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
        ...(tripData?.itinerary?.map((dayData, index) => {
            let activities: any[] = [];
            if (dayData.activities) activities = dayData.activities;
            // @ts-ignore
            else if (dayData.places) activities = dayData.places;
            else if (typeof dayData.plan === 'object') {
                activities = Array.isArray(dayData.plan) ? dayData.plan : [dayData.plan];
            }

            return {
                title: String(dayData.day),
                content: (
                    <div>
                        {typeof dayData.plan === 'string' && <h2 className='font-medium text-lg text-gray-600 mb-4'>{dayData.plan}</h2>}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {activities?.map((activity, index) => (
                                <PlaceCardItem key={index} activity={activity} />
                            ))}
                        </div>
                    </div>
                )
            }
        }) || [])
    ] : [];



    return (
        <div ref={scrollContainerRef} className='h-full overflow-y-auto p-6'>
            <Timeline data={data} tripData={tripData || undefined} scrollContainer={scrollContainerRef} />
        </div>
    )
}

export default Itinerary


