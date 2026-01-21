import React from 'react'
import { SelectTravelesList } from './options'

type Props = {
    onOptionSelect: (option: string) => void
}

function GroupSizeUi({ onOptionSelect }: Props) {
    return (
        <div className='grid grid-cols-3 gap-3 mt-2'>
            {SelectTravelesList.map((item, index) => (
                <div key={index} className={`p-2 border rounded-lg hover:border-primary bg-white hover:shadow-md cursor-pointer
                flex flex-col items-center justify-center text-center`}
                    onClick={() => onOptionSelect(item.title)}
                >
                    <h2 className='text-3xl'>{item.icon}</h2>
                    <h2 className='font-bold text-sm'>{item.title}</h2>
                    <h2 className='text-xs text-gray-500'>{item.desc}</h2>
                </div>
            ))}
        </div>
    )
}

export default GroupSizeUi