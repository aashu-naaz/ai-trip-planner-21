import React from 'react'
import { SelectTravelesList } from './options'

type Props = {
    onOptionSelect: (option: string) => void
}

function GroupSizeUi({ onOptionSelect }: Props) {
    return (
        <div className='grid grid-cols-3 gap-3 mt-4'>
            {SelectTravelesList.map((item, index) => (
                <div key={index} className={`p-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-[24px] 
                hover:bg-purple-500/20 hover:border-fuchsia-500/50 hover:shadow-[0_0_20px_rgba(217,70,239,0.4)] 
                cursor-pointer flex flex-col items-center justify-center text-center transition-all duration-300 group`}
                    onClick={() => onOptionSelect(item.title)}
                >
                    <h2 className='text-3xl mb-2 group-hover:scale-110 transition-transform duration-300'>{item.icon}</h2>
                    <h2 className='font-bold text-[15px] text-white/90 tracking-[-0.01em]'>{item.title}</h2>
                    <h2 className='text-[13px] text-white/60 mt-1 tracking-[-0.005em] font-normal'>{item.desc}</h2>
                </div>
            ))}
        </div>
    )
}

export default GroupSizeUi