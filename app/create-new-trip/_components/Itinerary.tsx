import React from 'react'
import { Timeline } from '@/components/ui/timeline';

function Itinerary({ trip }: { trip: any }) {

    const tripDetail = trip?.tripDetail;
    const data = [
        {
            title: "Recommended Hotels",
            content: (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    {tripDetail?.hotels?.map((hotel: any, index: number) => (
                        <div key={index} className='border rounded-xl p-4 hover:scale-105 transition-all cursor-pointer shadow-sm'>
                            <img src={hotel?.hotel_image_url || '/placeholder.jpg'} className='rounded-xl h-[180px] w-full object-cover' />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-bold text-lg'>{hotel?.hotel_name}</h2>
                                <h2 className='text-xs text-gray-500'>📍 {hotel?.hotel_address}</h2>
                                <div className='flex gap-2 justify-between items-center'>
                                    <h2 className='text-sm text-green-700 font-medium'>💵 {hotel?.price}</h2>
                                    <h2 className='text-sm font-bold'>⭐ {hotel?.rating}</h2>
                                </div>
                                <div className='mt-2'>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name},${hotel.hotel_address}`} target='_blank'>
                                        <button className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-md w-full border border-primary hover:bg-primary/20 transition-all'>View on Map</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        },
        ...(tripDetail?.itinerary?.map((item: any) => ({
            title: item.day,
            content: (
                <div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                        {item.plan?.map((place: any, index: number) => (
                            <div key={index} className='p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all'>
                                <h3 className='font-bold text-lg mb-2'>{place.place_name}</h3>
                                <img src={place?.place_image_url || '/placeholder.jpg'} className='rounded-lg h-[150px] w-full object-cover mb-3' />
                                <p className='text-sm text-gray-600 line-clamp-2'>{place.place_details}</p>
                                <div className='flex gap-2 mt-3 items-center'>
                                    <span className='bg-gray-100 p-1 rounded text-xs px-2'>⏱️ {place.time_to_travel}</span>
                                    <span className='bg-gray-100 p-1 rounded text-xs px-2'>🎟️ {place.ticket_pricing}</span>
                                </div>
                                <div className='mt-4'>
                                    <a href={`https://www.google.com/maps/search/?api=1&query=${place.place_name}`} target='_blank'
                                        className='block w-full text-center bg-black text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition-colors'>
                                        View on Map
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })) || [])
    ];

    return (
        <div className='relative w-full h-[80vh] overflow-y-auto pr-2'>
            <Timeline data={data} tripData={tripDetail} />
        </div>
    )
}

export default Itinerary
