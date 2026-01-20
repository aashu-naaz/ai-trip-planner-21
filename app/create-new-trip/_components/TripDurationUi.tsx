import { Button } from '@/components/ui/button'
import React, { useState } from 'react'

type Props = {
    onOptionSelect: (option: string) => void
}

function TripDurationUi({ onOptionSelect }: Props) {
    const [days, setDays] = useState(2);

    return (
        <div className='p-4 border rounded-xl w-full bg-white mt-2'>
            <h2 className='font-bold text-lg mb-4'>How many days do you want to travel?</h2>

            <div className='flex items-center gap-5 justify-center mt-5 mb-5'>
                <Button size='icon' variant='outline'
                    className='rounded-full h-10 w-10 text-xl'
                    onClick={() => days > 1 && setDays(days - 1)}
                >-</Button>
                <h2 className='font-bold text-xl'>{days} Days</h2>
                <Button size='icon' variant='outline'
                    className='rounded-full h-10 w-10 text-xl'
                    onClick={() => setDays(days + 1)}
                >+</Button>
            </div>

            <div className='flex justify-center'>
                <Button className='bg-primary text-white w-28'
                    onClick={() => onOptionSelect(days + ' Days')}
                >Confirm</Button>
            </div>
        </div>
    )
}

export default TripDurationUi

