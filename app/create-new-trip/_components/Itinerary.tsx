"use client"
import { useRef } from 'react';

import { useTripDetail } from '@/app/provider';
import { Timeline } from '@/components/ui/timeline';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';

function Itinerary() {

    const { tripDetailInfo: tripData } = useTripDetail();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (!tripData) return <div className="flex h-full items-center justify-center p-8 text-center text-muted-foreground">Your hotels and daily itinerary will appear here when your trip is ready.</div>;
    const data = tripData ? [
        {
            title: "Hotels",
            content: (
                <div className='grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-5 print:block'>
                    {tripData?.hotels?.map((hotel, index) => (
                        <div key={index} className='print:break-inside-avoid print:mb-4'>
                            <HotelCardItem hotel={hotel} />
                        </div>
                    ))}
                </div>
            )
        },
        ...(tripData?.itinerary?.map((dayData) => {
            const activities = dayData.activities ?? dayData.places ?? (Array.isArray(dayData.plan) ? dayData.plan : []);

            return {
                title: dayData.day?.toString().startsWith('Day') ? dayData.day.toString() : `Day ${dayData.day}`,
                content: (
                    <div>
                        {typeof dayData.plan === 'string' && <h2 className='font-medium text-lg text-white mb-4 print:text-black'>{dayData.plan}</h2>}
                        <div className='grid grid-cols-1 @2xl:grid-cols-2 @4xl:grid-cols-3 gap-5 print:block'>
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


