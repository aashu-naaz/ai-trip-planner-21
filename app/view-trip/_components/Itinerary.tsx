"use client"
import React, { useEffect, useState, useRef } from 'react'
import { Timeline } from '@/components/ui/timeline';
import { useTripDetail } from '@/app/provider';
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox';
import HotelCardItem from '@/app/create-new-trip/_components/HotelCardItem';
import PlaceCardItem from '@/app/create-new-trip/_components/PlaceCardItem';

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
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
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
                title: dayData.day?.toString().startsWith('Day') ? dayData.day.toString() : `Day ${dayData.day}`,
                content: (
                    <div>
                        {typeof dayData.plan === 'string' && <h2 className='font-medium text-lg text-white mb-4'>{dayData.plan}</h2>}
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
        <div ref={scrollContainerRef} className='p-6 h-full overflow-y-auto scroll-smooth bg-black/20'>
            <Timeline data={data} tripData={tripData || undefined} scrollContainer={scrollContainerRef} />
        </div>
    )
}

export default Itinerary
