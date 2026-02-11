import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

type Props = {
    onOptionSelect: (option: string) => void
}

function TripDurationUi({ onOptionSelect }: Props) {
    const [days, setDays] = useState(2);

    return (
        <div className='p-6 backdrop-blur-xl bg-gradient-to-br from-indigo-950/40 to-purple-950/40 border border-white/10 rounded-[32px] w-full mt-4 shadow-lg'>
            <h2 className='font-bold text-lg mb-6 text-white/90 text-center tracking-[-0.015em]'>How many days do you want to travel?</h2>

            <div className='flex items-center gap-6 justify-center mt-6 mb-6'>
                <Button size='icon' variant='outline'
                    className='rounded-[24px] h-12 w-12 text-xl bg-white/5 border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 text-white/90 transition-all duration-300'
                    onClick={() => days > 1 && setDays(days - 1)}
                >-</Button>
                <h2 className='font-bold text-2xl text-white/90 min-w-[120px] text-center tracking-[-0.02em]'>{days} Days</h2>
                <Button size='icon' variant='outline'
                    className='rounded-[24px] h-12 w-12 text-xl bg-white/5 border-white/10 hover:bg-purple-500/20 hover:border-purple-500/50 text-white/90 transition-all duration-300'
                    onClick={() => setDays(days + 1)}
                >+</Button>
            </div>

            <div className='flex justify-center'>
                <Button className='bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white w-32 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(217,70,239,0.9)] hover:scale-105 transition-all duration-300 rounded-full font-semibold text-[15px] tracking-[-0.01em]'
                    onClick={() => onOptionSelect(days + ' Days')}
                >Confirm</Button>
            </div>
        </div>
    )
}

export default TripDurationUi

