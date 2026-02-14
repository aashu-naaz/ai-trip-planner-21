"use client";
import React, { useEffect, useState } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import { MapPin, Star, Ticket, Wallet, Calendar, Users, BadgeDollarSign, Plane } from 'lucide-react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function PrintTripPage() {
    const params = useParams();
    const tripId = params.tripId as string;

    const trip = useQuery(api.tripDetail.GetTrip, { tripId });
    const [tripData, setTripData] = useState<any>(null);
    const [images, setImages] = useState<Record<string, string>>({});
    const [loadingImages, setLoadingImages] = useState(false);

    // Wait for images to load before printing
    useEffect(() => {
        if (trip && trip.tripDetail) {
            setTripData(trip.tripDetail);
        }
    }, [trip]);

    // Fetch images for all places when tripData is available
    useEffect(() => {
        const fetchImages = async () => {
            if (!tripData) return;

            setLoadingImages(true);
            const imagePromises: Promise<void>[] = [];
            const newImages: Record<string, string> = {};

            // Helper to fetch image
            const fetchPlaceImage = async (placeName: string) => {
                try {
                    const result = await axios.post('/api/arcjet/google-place-detail', {
                        placeName: placeName
                    });
                    if (result.data && !result.data.error) {
                        newImages[placeName] = result.data;
                    }
                } catch (e) {
                    console.error("Error fetching image for", placeName, e);
                }
            };

            // Batch image fetching
            const batchImages = async () => {
                const batchSize = 3;
                let promises: any[] = [];
                let count = 0;

                // Fetch hotel images
                tripData.hotels?.forEach((hotel: any) => {
                    if (hotel?.hotel_name) {
                        promises.push(fetchPlaceImage(hotel.hotel_name));
                        count++;
                        if (count % batchSize === 0) {
                            // Small delay after batch
                            promises.push(new Promise(resolve => setTimeout(resolve, 500)));
                        }
                    }
                });

                // Fetch itinerary images
                tripData.itinerary?.forEach((day: any) => {
                    // Filter valid activities (skip string plans)
                    let items = [];
                    if (day.activities) items = day.activities;
                    else if (day.places) items = day.places;
                    else if (typeof day.plan === 'object' && Array.isArray(day.plan)) {
                        items = day.plan;
                    } else {
                        // Use plan if it is NOT a string.
                        // If day.plan is a string, we skip it as an activity list.
                        // (Unlike previous code which forced [day.plan])
                        if (typeof day.plan !== 'string') {
                            items = [day.plan];
                        }
                    }

                    items?.forEach((activity: any) => {
                        const name = typeof activity === 'string' ? activity : activity.place_name;
                        if (name) {
                            promises.push(fetchPlaceImage(name));
                            count++;
                            if (count % batchSize === 0) {
                                // Small delay after batch
                                promises.push(new Promise(resolve => setTimeout(resolve, 500)));
                            }
                        }
                    });
                });

                await Promise.all(promises);
                setImages(newImages);
                setLoadingImages(false);
            };

            batchImages();
        };

        if (tripData && !loadingImages && Object.keys(images).length === 0) {
            fetchImages();
        }
    }, [tripData]);


    if (!tripData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading trip details...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Print Controls - Hidden when printing */}
            <div className="fixed top-0 left-0 right-0 p-4 bg-white border-b border-gray-200 shadow-sm flex justify-between items-center print:hidden z-50">
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => window.close()}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
                    >
                        Close
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    {loadingImages ? (
                        <span className="text-sm text-gray-500 animate-pulse">Preparing images...</span>
                    ) : (
                        <button
                            onClick={() => window.print()}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-lg transition-all flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print / Download PDF
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-10 bg-white text-black print:p-0 print:shadow-none shadow-xl mt-20 print:mt-0 mb-10 rounded-xl">
                {/* Header */}
                <div className="mb-10 border-b border-gray-200 pb-8 flex justify-between items-center">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            {/* Logo Image */}
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/logo.svg"
                                    alt="SmartJourney Logo"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                            </div>
                            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">
                                SmartJourney
                            </h1>
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold mb-2">Trip Itinerary</h2>
                            <p className="text-xl text-gray-600">
                                {tripData.origin} ➝ {tripData.destination}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Generated by</div>
                        <div className="font-bold text-purple-600 text-lg">SmartJourney AI</div>
                    </div>
                </div>

                <div className="flex gap-6 mt-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>{tripData.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Wallet className="w-4 h-4" />
                        <span>{tripData.budget} Budget</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{tripData.group_size} Travelers</span>
                    </div>
                </div>


                {/* Hotels */}
                <div className="mb-12 print:mb-6">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                            <Star className="w-4 h-4 text-purple-600" />
                        </div>
                        Recommended Hotels
                    </h2>

                    <div className="grid grid-cols-2 gap-6">
                        {tripData.hotels?.map((hotel: any, index: number) => {
                            const imageUrl = images[hotel.hotel_name] || hotel.hotel_image_url || '/placeholder.jpg';
                            return (
                                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden break-inside-avoid">
                                    <div className="relative h-48 w-full">
                                        <Image
                                            src={imageUrl}
                                            alt={hotel.hotel_name}
                                            fill
                                            className="object-cover"
                                            unoptimized // Force simple img tag for print reliability
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-1">{hotel.hotel_name}</h3>
                                        <div className="flex items-start gap-2 text-gray-500 text-sm mb-3">
                                            <MapPin className="w-3 h-3 mt-1 shrink-0" />
                                            <p>{hotel.hotel_address}</p>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <div className="flex items-center gap-1 text-sm font-medium">
                                                <BadgeDollarSign className="w-3 h-3" />
                                                {hotel.price_per_night || hotel.price}
                                            </div>
                                            <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                                                <Star className="w-3 h-3 fill-current" />
                                                {hotel.rating}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Itinerary */}
                <div>
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Plane className="w-4 h-4 text-blue-600" />
                        </div>
                        Daily Plan
                    </h2>

                    <div className="space-y-8">
                        {tripData.itinerary?.map((day: any, index: number) => {
                            const activities = day.activities || day.places || (Array.isArray(day.plan) ? day.plan : [day.plan]);
                            return (
                                <div key={index} className="break-inside-avoid mb-8">
                                    <h3 className="text-xl font-bold mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                        {day.day?.toString().startsWith('Day') ? day.day : `Day ${day.day}`}
                                    </h3>

                                    {typeof day.plan === 'string' && (
                                        <p className="mb-4 text-gray-700 italic border-l-4 border-blue-200 pl-4 py-1">
                                            "{day.plan}"
                                        </p>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
                                        {activities?.map((activity: any, actIndex: number) => {
                                            const placeName = typeof activity === 'string' ? activity : activity.place_name;
                                            const imageUrl = images[placeName] || activity.place_image_url || '/placeholder.jpg';

                                            return (
                                                <div key={actIndex} className="border border-gray-100 rounded-lg p-4 flex gap-4 break-inside-avoid bg-white">
                                                    <div className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-gray-100">
                                                        <Image
                                                            src={imageUrl}
                                                            alt={placeName || 'Activity'}
                                                            fill
                                                            className="object-cover"
                                                            unoptimized
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-baseline justify-between">
                                                            <h4 className="font-bold text-gray-900 line-clamp-1">{placeName}</h4>
                                                            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full shrink-0">
                                                                {activity.time_to_travel}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-2">
                                                            {activity.place_details}
                                                        </p>
                                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                                            <Ticket className="w-3 h-3" />
                                                            <span>{activity.ticket_pricing}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-400">
                    <p>Generated by SmartJourney AI • {new Date().toLocaleDateString()}</p>
                </div>
            </div >
        </div>
    );
}
