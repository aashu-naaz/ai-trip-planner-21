import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

function GeneratingTripUi({ viewTrip, disable }: any) {
    return (
        <div className='flex flex-col items-center justify-center p-10 border rounded-xl w-full bg-white mt-2 shadow-sm'>
            <div className='animate-bounce text-6xl mb-5'>
                🌏
            </div>

            <h2 className='font-bold text-2xl text-center flex items-center gap-2'>
                ✈️ Planning your dream trip...
            </h2>

            <p className='text-gray-500 text-center mt-2 mb-8 text-sm'>
                Gathering best destinations, activities, and travel details for you.
            </p>

            {!disable &&
                <div className='w-full text-center'>
                    <h3 className='font-bold text-lg text-green-600'>Trip Generated Successfully!</h3>
                    <p className='text-sm text-gray-400'>Check your itinerary on the right 👉</p>
                </div>
            }
        </div>
    )
}

export default GeneratingTripUi
