
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
        <div className='group hover:scale-[1.02] transition-all duration-300 cursor-pointer rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg hover:shadow-purple-500/20'>
            <div className='relative h-[250px] w-full overflow-hidden'>
                <Image
                    src={photoUrl ? photoUrl : ((hotel?.hotel_image_url && !hotel.hotel_image_url.includes('example.com')) ? hotel.hotel_image_url : '/placeholder.jpg')}
                    alt={hotel?.hotel_name || 'Hotel Image'}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {/* Dark gradient overlay for text readability */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
            </div>
            <div className='p-5 flex flex-col gap-3'>
                <h2 className='font-bold text-lg text-white'>{hotel?.hotel_name}</h2>
                <h2 className='text-xs text-white/60 line-clamp-2'>📍 {hotel?.hotel_address}</h2>
                <div className='flex justify-between items-center'>
                    <h2 className='text-sm text-emerald-400 font-medium'>💵 {hotel?.price}</h2>
                    <h2 className='text-sm font-semibold text-white/90'>⭐ {hotel?.rating}</h2>
                </div>
                <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name},${hotel?.hotel_address}`} target='_blank' className='w-full text-center mt-1'>
                    <button className='w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2'>
                        View on Map <ExternalLink className='h-4 w-4' />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default HotelCardItem
