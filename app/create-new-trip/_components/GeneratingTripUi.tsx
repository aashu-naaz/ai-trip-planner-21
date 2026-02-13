import { Loader2 } from 'lucide-react'
import React from 'react'
import { Button } from '@/components/ui/button'

function GeneratingTripUi({ viewTrip, disable }: any) {
    return (
        <div className='flex flex-col items-center justify-center p-10 backdrop-blur-xl bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-purple-500/30 rounded-[32px] w-full mt-4 shadow-[0_0_40px_rgba(124,58,237,0.4)]'>
            <div className='animate-bounce text-6xl mb-6 drop-shadow-[0_0_15px_rgba(124,58,237,0.6)]'>
                🌏
            </div>

            <h2 className='font-bold text-2xl text-center flex items-center gap-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-3 tracking-[-0.02em]'>
                ✈️ Planning your dream trip...
            </h2>

            <p className='text-white/70 text-center mt-2 mb-8 text-[15px] max-w-md leading-relaxed tracking-[-0.01em] font-normal'>
                Gathering best destinations, activities, and travel details for you.
            </p>

            {!disable &&
                <div className='w-full text-center flex flex-col items-center gap-3 animate-in fade-in duration-500'>
                    <h3 className='font-bold text-lg text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] tracking-[-0.015em]'>Trip Saved & Ready!</h3>
                    <Button
                        onClick={viewTrip}
                        className='bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(217,70,239,0.9)] hover:scale-105 transition-all duration-300 rounded-full px-8 font-semibold text-[15px] tracking-[-0.01em]'
                    >
                        View Itinerary
                    </Button>
                </div>
            }
        </div>
    )
}

export default GeneratingTripUi
