import React from 'react'
import { MapPin, Plane, Sparkles, Compass } from 'lucide-react'

type Props = {
    setMsg: (msg: string) => void
}

function EmptyBoxState({ setMsg }: Props) {
    return (
        <div className='flex flex-col items-center justify-center p-10 h-full flex-1'>
            <h2 className='text-xl sm:text-2xl font-bold mb-2'>Start Planning new <span className='text-primary'>Trip</span> using AI</h2>
            <p className='text-gray-400 text-center text-sm mb-8'>Discover personalized travel itineraries, find the best destinations, and plan your dream vacation effortlessly with the power of AI. Let our smart assistant do the hard work while you enjoy the journey.</p>

            <div className='grid grid-cols-1 gap-4 w-full max-w-lg'>
                <div className='border rounded-xl p-4 flex gap-2 items-center hover:border-primary cursor-pointer'
                    onClick={() => setMsg('Create New Trip')}
                >
                    <MapPin className='text-blue-500 h-6 w-6' />
                    <h2 className='font-semibold'>Create New Trip</h2>
                </div>
                <div className='border rounded-xl p-4 flex gap-2 items-center hover:border-green-500 cursor-pointer'
                    onClick={() => setMsg('Inspire me where to go')}
                >
                    <Plane className='text-green-500 h-6 w-6' />
                    <h2 className='font-semibold'>Inspire me where to go</h2>
                </div>
                <div className='border rounded-xl p-4 flex gap-2 items-center hover:border-orange-500 cursor-pointer'
                    onClick={() => setMsg('Discover Hidden gems')}
                >
                    <Sparkles className='text-orange-500 h-6 w-6' />
                    <h2 className='font-semibold'>Discover Hidden gems</h2>
                </div>
                <div className='border rounded-xl p-4 flex gap-2 items-center hover:border-yellow-500 cursor-pointer'
                    onClick={() => setMsg('Adventure Destination')}
                >
                    <Compass className='text-yellow-500 h-6 w-6' />
                    <h2 className='font-semibold'>Adventure Destination</h2>
                </div>
            </div>
        </div>
    )
}

export default EmptyBoxState
