import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import axios from 'axios'

type Props = {
    activity: Activity
}

function PlaceCardItem({ activity }: Props) {
    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
        activity && GetGooglePlaceDetail();
    }, [activity])

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/arcjet/google-place-detail', {
            placeName: activity?.place_name
        });

        if (result?.data?.error) {
            return;
        }

        setPhotoUrl(result?.data);
    }

    return (
        <div className='group bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg overflow-hidden hover:shadow-purple-500/20 transition-all duration-300 hover:scale-[1.02] h-[380px] flex flex-col'>
            {/* Image Section */}
            <div className='relative w-full h-[200px] overflow-hidden'>
                <Image
                    src={photoUrl ? photoUrl : ((activity.place_image_url && !activity.place_image_url.includes('example.com')) ? activity.place_image_url : '/placeholder.jpg')}
                    alt={activity.place_name}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {/* Dark gradient overlay for text readability */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
            </div>
            {/* Content Section */}
            <div className='p-5 flex flex-col gap-2 grow'>
                {/* Title */}
                <h2 className='font-bold text-lg text-white'>{activity.place_name}</h2>
                <p className='text-sm text-white/60 line-clamp-2'>{activity.place_details}</p>

                {/* Footer Section */}
                <div className='mt-auto'>
                    <div className='flex items-center justify-between mb-3'>
                        <div className='flex items-center gap-1.5 text-xs text-white/50'>
                            <Clock className='w-3.5 h-3.5' />
                            {activity.time_to_travel}
                        </div>
                        <div className='flex items-center gap-1.5 text-xs text-emerald-400'>
                            <Ticket className='w-3.5 h-3.5' />
                            {activity.ticket_pricing}
                        </div>
                    </div>

                    <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${activity.place_name},${activity.place_address}`}
                        target='_blank'
                        className='w-full block'
                    >
                        <button className='w-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2'>
                            View on Map <ExternalLink className='h-4 w-4' />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PlaceCardItem
