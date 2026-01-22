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
        <div className='bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all h-[380px] flex flex-col'>
            {/* Image Section */}
            <div className='relative w-full h-[280px]'>
                <Image
                    src={photoUrl ? photoUrl : ((activity.place_image_url && !activity.place_image_url.includes('example.com')) ? activity.place_image_url : '/placeholder.jpg')}
                    alt={activity.place_name}
                    fill
                    className='object-cover'
                />
            </div>
            {/* Content Section */}
            <div className='p-4 flex flex-col gap-2 grow'>
                {/* Title */}
                <h2 className='font-bold text-lg'>{activity.place_name}</h2>
                <p className='text-sm text-gray-400 line-clamp-2'>{activity.place_details}</p>

                {/* Footer Section */}
                <div className='mt-auto'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-1 text-xs text-gray-500'>
                            <Clock className='w-3 h-3' />
                            {activity.time_to_travel}
                        </div>
                        <div className='flex items-center gap-1 text-xs text-gray-500'>
                            <Ticket className='w-3 h-3' />
                            {activity.ticket_pricing}
                        </div>
                    </div>

                    <Link
                        href={`https://www.google.com/maps/search/?api=1&query=${activity.place_name},${activity.place_address}`}
                        target='_blank'
                        className='w-full mt-2 block'
                    >
                        <Button className='w-full h-8 text-xs bg-primary/10 text-primary border border-primary hover:bg-primary/20'>
                            View on Map
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default PlaceCardItem
