import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUserDetail } from '@/app/provider'
import PlaceCardItem from '@/app/create-new-trip/_components/PlaceCardItem'
import HotelCardItem from '@/app/create-new-trip/_components/HotelCardItem'

function SavedPlacesSection() {
    const { userDetail } = useUserDetail();

    // Fetch saved places
    const savedPlaces = useQuery(api.savedPlaces.GetSavedPlaces,
        userDetail ? { userId: userDetail?.email || userDetail?._id || '' } : "skip"
    );

    if (!savedPlaces || savedPlaces.length === 0) return null;

    return (
        <div className='mt-10 pb-10 animate-fade-up'>
            <h2 className='font-bold text-2xl mb-5 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400'>
                Saved Collection
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                {savedPlaces.map((place, index) => (
                    <div key={index}>
                        {place.placeType === 'hotel' ? (
                            <HotelCardItem hotel={place.metadata} />
                        ) : (
                            <PlaceCardItem activity={place.metadata} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SavedPlacesSection
