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
import {
    ResizablePanelResizeHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "../../../components/ui/resizable";
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
        tripId && GetTrip();
    }, [tripId]);

    const GetTrip = async () => {
        // Use GetTrip (public) instead of GetTripById to allow sharing and avoid userDetail timing issues
        const result = await convex.query(api.tripDetail.GetTrip, {
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


            <ResizablePanelGroup direction="horizontal" className="h-full">
                {/* Itinerary Section */}
                <ResizablePanel defaultSize={50} minSize={30} className='overflow-y-auto h-full pb-20'>
                    {/* Header - Full Width now */}
                    <div className="px-6 md:px-10 pt-6">
                        <TripHeader trip={tripDetailInfo} />
                    </div>

                    {/* Information Section */}
                    <div className="px-6 md:px-10">
                        <InfoSection trip={tripDetailInfo} />
                        <Itinerary />
                    </div>
                </ResizablePanel>

                <ResizablePanelResizeHandle className="w-2 bg-neutral-800 hover:bg-purple-500 transition-colors cursor-col-resize flex items-center justify-center group z-50">
                    <div className="h-8 w-1 bg-neutral-600 rounded-full group-hover:bg-white transition-colors" />
                </ResizablePanelResizeHandle>

                {/* Globe Section */}
                <ResizablePanel defaultSize={50} minSize={30} className='h-full relative border-l border-white/10 hidden md:block'>
                    <div className='h-full w-full'>
                        <GlobalMap />
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default ViewTrip

