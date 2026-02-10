
import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

export interface Hotel {
    hotel_name: string;
    hotel_address: string;
    price: string;
    rating: number;
    hotel_image_url: string;
}

type Props = {
    hotel: Hotel;
}



function HotelCardItem({ hotel }: Props) {

    const [photoUrl, setPhotoUrl] = useState<string>();
    useEffect(() => {
        hotel && GetGooglePlaceDetail();
    }, [hotel])

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/arcjet/google-place-detail', {
            placeName: hotel?.hotel_name
        });

        if (result?.data?.error) {
            return;
        }

        setPhotoUrl(result?.data);
    }

    return (
        <div className='hover:scale-105 transition-all cursor-pointer border rounded-xl shadow-md bg-white'>
            <div className='relative h-[250px] w-full'>
                <Image
                    src={photoUrl ? photoUrl : ((hotel?.hotel_image_url && !hotel.hotel_image_url.includes('example.com')) ? hotel.hotel_image_url : '/placeholder.jpg')}
                    alt={hotel?.hotel_name || 'Hotel Image'}
                    fill
                    className='rounded-t-xl object-cover'
                />
            </div>
            <div className='p-4 flex flex-col gap-2'>
                <h2 className='font-bold text-lg'>{hotel?.hotel_name}</h2>
                <h2 className='text-xs text-gray-500 line-clamp-2'>📍 {hotel?.hotel_address}</h2>
                <div className='flex justify-between items-center'>
                    <h2 className='text-sm text-green-700 font-medium'>💵 {hotel?.price}</h2>
                    <h2 className='text-sm font-bold'>⭐ {hotel?.rating}</h2>
                </div>
                <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name},${hotel?.hotel_address}`} target='_blank' className='w-full text-center mt-2'>
                    <button className='w-full bg-black text-white text-sm px-3 py-1 rounded-md border border-black hover:bg-primary/20 transition-all flex items-center justify-center gap-2'>
                        View on Map <ExternalLink className='h-4 w-4' />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HotelCardItem
