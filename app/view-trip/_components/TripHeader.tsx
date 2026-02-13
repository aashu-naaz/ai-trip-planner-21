import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { MapPin, Calendar, Wallet, Users, Share2, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import axios from 'axios'

function TripHeader({ trip }: { trip: any }) {
    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
        trip && GetGooglePlaceDetail();
    }, [trip])

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/arcjet/google-place-detail', {
            placeName: trip?.destination
        });
        if (typeof result.data === 'string') {
            setPhotoUrl(result.data);
        }
    }

    return (
        <div className='relative w-full h-[350px] md:h-[450px] overflow-hidden rounded-[0_0_40px_40px] shadow-[0_20px_50px_rgba(88,28,135,0.3)]'>
            {/* Background Image with Gradient Overlay */}
            <Image
                src={photoUrl && typeof photoUrl === 'string' && photoUrl !== '' ? photoUrl : '/placeholder.jpg'}
                alt='trip-destination'
                fill
                className='object-cover'
            />
            <div className='absolute inset-0 bg-linear-to-t from-indigo-950 via-purple-950/60 to-transparent' />

            {/* Content Container */}
            <div className='absolute bottom-0 left-0 right-0 p-8 md:p-12 z-20'>
                <div className='flex flex-col md:flex-row justify-between items-end gap-6'>

                    {/* Title & Location */}
                    <div className='space-y-4 max-w-2xl animate-fade-up'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-cyan-300 shadow-lg shadow-cyan-500/20'>
                            <Sparkles className='w-3 h-3' />
                            <span>Mission Destination</span>
                        </div>
                        <h1 className='text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-200 to-cyan-200 drop-shadow-sm'>
                            {trip?.tripDetail?.destination}
                        </h1>

                        <div className='flex flex-wrap gap-3'>
                            {/* New Badges for Pace/Style */}
                            {trip?.tripDetail?.trip_style && (
                                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-300 shadow-sm'>
                                    <span>{trip.tripDetail.trip_style}</span>
                                </div>
                            )}
                            {trip?.tripDetail?.travel_pace && (
                                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-cyan-300 shadow-sm'>
                                    <span>{trip.tripDetail.travel_pace}</span>
                                </div>
                            )}
                            {/* Interests as small tags */}
                            {trip?.tripDetail?.interests?.map((interest: string, i: number) => (
                                <div key={i} className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80'>
                                    <span>#{interest}</span>
                                </div>
                            ))}

                            <div className='w-full h-0 basis-full my-1 sm:hidden'></div>

                            <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg'>
                                <Calendar className='w-4 h-4 text-fuchsia-400' />
                                <span className='text-sm'>{trip?.tripDetail?.duration} Days</span>
                            </div>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg'>
                                <Wallet className='w-4 h-4 text-purple-400' />
                                <span className='text-sm'>{trip?.tripDetail?.budget} Budget</span>
                            </div>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg'>
                                <Users className='w-4 h-4 text-cyan-400' />
                                <span className='text-sm'>{trip?.tripDetail?.group_size} Travelers</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-3 animate-fade-up' style={{ animationDelay: '0.1s' }}>
                        <Button className='bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full'>
                            <Share2 className='w-4 h-4 mr-2' />
                            Share Mission
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripHeader
