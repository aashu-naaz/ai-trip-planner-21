"use client"
import { useUserDetail } from '@/app/provider';
import { api } from '@/convex/_generated/api';
import { useConvex } from 'convex/react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Itinerary from '@/app/create-new-trip/_components/Itinerary';
import { useTripDetail } from '@/app/provider';
import InfoSection from '@/app/create-new-trip/_components/InfoSection';
import { Plane } from 'lucide-react';
import dynamic from 'next/dynamic';

const GlobalMap = dynamic(() => import('@/app/create-new-trip/_components/GlobalMap'), { ssr: false });


import TripHeader from '../_components/TripHeader';

function ViewTrip() {
    const { tripId } = useParams();
    const { userDetail, setUserDetail } = useUserDetail();
    const convex = useConvex();
    const [tripData, setTripData] = useState<any>();

    // @ts-ignore
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    useEffect(() => {
        tripId && userDetail && GetTrip();
    }, [tripId, userDetail]);

    const GetTrip = async () => {
        const result = await convex.query(api.tripDetail.GetTripById, {
            uid: userDetail?._id, // This might be undefined if user is not logged in, but ignoring for now as per code
            tripId: tripId as string
        });
        console.log(result);
        setTripData(result);
        if (result?.tripDetail) {
            setTripDetailInfo(result.tripDetail);
        }
    }

    const [mapPoints, setMapPoints] = useState<any[]>([]);
    const [isGlobeView, setIsGlobeView] = useState(false);

    useEffect(() => {
        if (tripDetailInfo) {
            extractPoints(tripDetailInfo);
        }
    }, [tripDetailInfo]);

    const extractPoints = (tripData: any) => {
        const points: any[] = [];
        tripData?.itinerary?.forEach((day: any) => {
            day.plan?.forEach ? day.plan.forEach((place: any) => {
                if (place.geo_coordinates) {
                    points.push({
                        lat: typeof place.geo_coordinates === 'object' ? place.geo_coordinates.lat : parseFloat(place.geo_coordinates.split(',')[0]),
                        lng: typeof place.geo_coordinates === 'object' ? place.geo_coordinates.lng : parseFloat(place.geo_coordinates.split(',')[1]),
                        name: place.place_name
                    });
                }
            }) : null;
            // Also handle 'activities' if present (alternative AI output structure)
            /* @ts-ignore */
            day.activities?.forEach((place: any) => {
                if (place.geo_coordinates) {
                    points.push({
                        lat: typeof place.geo_coordinates === 'object' ? place.geo_coordinates.lat : parseFloat(place.geo_coordinates.split(',')[0]),
                        lng: typeof place.geo_coordinates === 'object' ? place.geo_coordinates.lng : parseFloat(place.geo_coordinates.split(',')[1]),
                        name: place.place_name
                    });
                }
            });
        });
        setMapPoints(points);
    }

    return (
        <div className='p-0 md:p-0 lg:p-0 xl:p-0 fixed bottom-0 top-16 left-0 right-0 overflow-hidden'>


            <div className='grid grid-cols-1 md:grid-cols-2 gap-0 h-full'>
                {/* Itinerary Section */}
                <div className='overflow-y-auto h-full pb-20'>
                    {/* Header - Full Width now */}
                    <div className="px-6 md:px-10 pt-6">
                        <TripHeader trip={tripDetailInfo} />
                    </div>

                    {/* Information Section */}
                    <div className="px-6 md:px-10">
                        <InfoSection trip={tripDetailInfo} />
                        <Itinerary />
                    </div>
                </div>

                {/* Globe Section */}
                <div className='h-full relative border-l border-white/10'>
                    <div className='hidden md:block h-full w-full'>
                        <GlobalMap />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewTrip

