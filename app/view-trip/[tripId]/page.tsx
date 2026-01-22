"use client"
import { useTripDetail } from '@/app/provider';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';

function ViewTrip() {
    const params = useParams();
    const tripId = params.tripId as string;
    const trip = useQuery(api.tripDetail.GetTrip, { tripId: tripId || '' });
    const { setTripDetailInfo } = useTripDetail();

    useEffect(() => {
        if (trip) {
            setTripDetailInfo(trip.tripDetail);
        }
    }, [trip])
 
    return (
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
            <h2 className='font-bold text-3xl'>Your Trip is Ready!</h2>
            <p className='text-gray-500 mt-2'>Trip ID: {tripId}</p>

            {trip ? <div className='mt-10'>
                <h3 className='font-bold text-2xl mb-5'>Results:</h3>
                <Itinerary />
            </div> : <p className='mt-10'>Loading trip details...</p>}
        </div>
    )
}

export default ViewTrip
