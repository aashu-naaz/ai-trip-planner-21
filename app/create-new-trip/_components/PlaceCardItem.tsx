import { Button } from '@/components/ui/button'
import { Clock, ExternalLink, Ticket, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Activity } from './ChatBox'
import axios from 'axios'
import TripItemModal from './TripItemModal'

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div
                className='group relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-cyan-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500 flex flex-col h-full cursor-pointer print:bg-transparent print:border-gray-200 print:shadow-none print:h-auto print:block'
                onClick={() => setIsModalOpen(true)}
            >
                {/* Image Section */}
                <div className='relative w-full h-[200px] overflow-hidden'>
                    <Image
                        src={photoUrl ? photoUrl : ((activity.place_image_url && !activity.place_image_url.includes('example.com')) ? activity.place_image_url : '/placeholder.jpg')}
                        alt={activity.place_name}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                        priority
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent print:hidden' />

                    <div className='absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full print:bg-white print:border-gray-200'>
                        <span className='text-xs font-semibold text-cyan-300 print:text-cyan-700'>{activity.time_to_travel}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className='p-6 flex flex-col gap-3 grow print:grow-0 print:block'>
                    <div>
                        <h2 className='font-bold text-lg text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors print:text-black'>{activity.place_name}</h2>
                        <p className='text-sm text-white/60 line-clamp-2 leading-relaxed print:text-gray-700'>{activity.place_details}</p>
                    </div>

                    <div className='mt-auto space-y-4'>
                        <div className='flex items-center gap-2 text-xs text-white/50 border-t border-white/10 pt-4 print:text-gray-500 print:border-gray-200'>
                            <Ticket className='w-3.5 h-3.5 text-fuchsia-400' />
                            <span>{activity.ticket_pricing}</span>
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                            <Link
                                href={`https://www.google.com/maps/search/?api=1&query=${activity.place_name},${activity.place_address}`}
                                target='_blank'
                                className='w-full block'
                            >
                                <button className='w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-linear-to-r group-hover:from-cyan-600/80 group-hover:to-blue-600/80 group-hover:border-transparent'>
                                    View on Map <ExternalLink className='h-3.5 w-3.5' />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <TripItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                item={{
                    title: activity.place_name,
                    subtitle: activity.place_address || '',
                    imageUrl: photoUrl || activity.place_image_url || '/placeholder.jpg',
                    images: photoUrl ? [photoUrl] : (activity.place_image_url ? [activity.place_image_url] : []),
                    price: activity.ticket_pricing,
                    description: activity.place_details,
                    type: 'activity',
                    context: 'Activity',
                    duration: activity.time_to_travel,
                    // bestTime: activity.best_time_to_visit, // Removed as it doesn't exist on Activity type
                    geo_coordinates: (typeof activity.geo_coordinates === 'object' && activity.geo_coordinates) ? activity.geo_coordinates : undefined
                }}
            />
        </>
    )
}

export default PlaceCardItem
