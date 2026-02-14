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
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 print:block'>
                    {tripData?.hotels?.map((hotel, index) => (
                        <div key={index} className='print:break-inside-avoid print:mb-4'>
                            <HotelCardItem hotel={hotel} />
                        </div>
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
                title: dayData.day?.toString().startsWith('Day') ? dayData.day.toString() : `Day ${dayData.day}`,
                content: (
                    <div>
                        {typeof dayData.plan === 'string' && <h2 className='font-medium text-lg text-white mb-4 print:text-black'>{dayData.plan}</h2>}
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 print:block'>
                            {activities?.map((activity, index) => (
                                <div key={index} className='print:break-inside-avoid print:mb-4'>
                                    <PlaceCardItem activity={activity} />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        }) || [])
    ] : [];



    return (
        <div ref={scrollContainerRef} className='p-4 md:p-6 h-full overflow-y-auto scroll-smooth bg-black/20 print:p-0 print:h-auto print:overflow-visible print:block print:bg-transparent'>
            <Timeline data={data} tripData={tripData || undefined} scrollContainer={scrollContainerRef} />
        </div>
    )
}

export default Itinerary


