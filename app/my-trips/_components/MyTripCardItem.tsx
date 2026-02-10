import React, { useEffect, useState } from 'react'
import { TripInfo } from '../../create-new-trip/_components/ChatBox'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

function MyTripCardItem({ trip }: { trip: { tripDetail: TripInfo, tripId: string } }) {
    const [photoUrl, setPhotoUrl] = useState<string>();

    useEffect(() => {
        trip && GetGooglePlaceDetail();
    }, [trip])

    const GetGooglePlaceDetail = async () => {
        const result = await axios.post('/api/arcjet/google-place-detail', {
            placeName: trip?.tripDetail?.destination
        });
        setPhotoUrl(result?.data);
    }

    return (
        <Link href={'/view-trip/' + trip?.tripId}>
            <div className='p-5 shadow rounded-2xl hover:scale-105 transition-all'>
                <Image src={photoUrl ? photoUrl : '/placeholder.jpg'}
                    alt={trip?.tripDetail?.destination}
                    width={1280}
                    height={720}
                    className='rounded-xl object-cover w-full h-[220px]'
                />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.tripDetail?.destination}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.tripDetail?.duration} Days trip with {trip?.tripDetail?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default MyTripCardItem
