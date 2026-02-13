import Link from 'next/link'
import Image from 'next/image'
import { ExternalLink, Star, MapPin, BadgeDollarSign } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import TripItemModal from './TripItemModal';

export interface Hotel {
    hotel_name: string;
    hotel_address: string;
    price: string;
    price_per_night?: string;
    rating: number;
    hotel_image_url: string;
    geo_coordinates: {
        lat: number;
        lng: number;
    };
    description: string;
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

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className='group relative rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] transition-all duration-500 flex flex-col h-full cursor-pointer' onClick={() => setIsModalOpen(true)}>

                {/* Image Section */}
                <div className='relative h-[240px] w-full overflow-hidden'>
                    <Image
                        src={photoUrl ? photoUrl : ((hotel?.hotel_image_url && !hotel.hotel_image_url.includes('example.com')) ? hotel.hotel_image_url : '/placeholder.jpg')}
                        alt={hotel?.hotel_name || 'Hotel Image'}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent' />

                    {/* Floating Rating */}
                    <div className='absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full flex items-center gap-1'>
                        <Star className='w-3.5 h-3.5 text-yellow-400 fill-yellow-400' />
                        <span className='text-xs font-semibold text-white'>{hotel?.rating}</span>
                    </div>
                </div>

                {/* Content Section */}
                <div className='p-6 flex flex-col gap-4 grow'>
                    <div>
                        <h2 className='font-bold text-xl text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors'>{hotel?.hotel_name}</h2>
                        <div className='flex items-start gap-2 text-white/60 text-sm'>
                            <MapPin className='w-4 h-4 mt-0.5 shrink-0 text-cyan-400' />
                            <span className='line-clamp-2'>{hotel?.hotel_address}</span>
                        </div>
                    </div>

                    <div className='mt-auto space-y-4'>
                        <div className='flex justify-between items-center border-t border-white/10 pt-4'>
                            <div className='flex items-center gap-2 text-purple-200'>
                                <BadgeDollarSign className='w-4 h-4' />
                                <span className='text-sm font-medium'>{hotel?.price_per_night || hotel?.price}</span>
                            </div>
                        </div>

                        {/* Stop propagation to prevent modal opening when clicking View on Map */}
                        <div onClick={(e) => e.stopPropagation()}>
                            <Link href={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotel_name},${hotel?.hotel_address}`} target='_blank' className='block'>
                                <button className='w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:bg-linear-to-r group-hover:from-purple-600/80 group-hover:to-fuchsia-600/80 group-hover:border-transparent'>
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
                    title: hotel?.hotel_name,
                    subtitle: hotel?.hotel_address,
                    imageUrl: photoUrl || hotel?.hotel_image_url,
                    images: photoUrl ? [photoUrl] : (hotel?.hotel_image_url ? [hotel.hotel_image_url] : []),
                    rating: hotel?.rating,
                    price: hotel?.price_per_night || hotel?.price,
                    description: hotel?.description,
                    type: 'hotel',
                    context: 'Recommended Hotel',
                    geo_coordinates: hotel?.geo_coordinates
                }}
            />
        </>
    )
}

export default HotelCardItem
