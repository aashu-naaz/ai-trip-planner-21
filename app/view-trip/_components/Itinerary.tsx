"use client"
import HotelCardItem from '@/app/create-new-trip/_components/HotelCardItem';
import PlaceCardItem from '@/app/create-new-trip/_components/PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { Timeline } from '@/components/ui/timeline';
import { useRef, type RefObject } from 'react';

function Itinerary({ scrollContainer }: { scrollContainer?: RefObject<HTMLDivElement | null> }) {

    const { tripDetailInfo: tripData } = useTripDetail();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const data = tripData ? [
        {
            title: "Hotels",
            content: (
                <div className='grid grid-cols-1 @2xl:grid-cols-2 gap-5'>
                    {tripData?.hotels?.map((hotel, index) => (
                        <HotelCardItem key={index} hotel={hotel} />
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
                        {typeof dayData.plan === 'string' && <h2 className='font-medium text-lg text-white mb-4'>{dayData.plan}</h2>}
                        <div className='grid grid-cols-1 @2xl:grid-cols-2 gap-5'>
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
        <div ref={scrollContainerRef} className={scrollContainer ? "min-w-0" : "p-6 h-full overflow-y-auto bg-black/20"}>
            <Timeline data={data} tripData={tripData || undefined} scrollContainer={scrollContainer ?? scrollContainerRef} showSummary={!scrollContainer} />
        </div>
    )
}

export default Itinerary
