import React from 'react'

function InfoSection({ trip }: { trip: any }) {
    return (
        <div>
            <h2 className='font-bold text-3xl'>Your Trip Itinerary to {trip?.destination} is Ready</h2>

            <div className='flex gap-5 mt-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>📅 {trip?.duration} Days</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>💰 {trip?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm md:text-md'>👥 {trip?.group_size} Travelers</h2>
            </div>
        </div>
    )
}

export default InfoSection;
