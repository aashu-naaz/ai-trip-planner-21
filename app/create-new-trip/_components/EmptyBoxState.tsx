import React from 'react'
import { MapPin, Plane, Sparkles, Compass } from 'lucide-react'

type Props = {
    setMsg: (msg: string) => void
}

function EmptyBoxState({ setMsg }: Props) {
    return (
        <div className='flex flex-col items-center justify-center px-6 py-12 min-h-full w-full'>
            <h2 className='text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tight text-center'>
                Start Planning Your <span className='bg-gradient-to-r from-fuchsia-400 to-cyan-400 bg-clip-text text-transparent'>Journey</span>
            </h2>
            <p className='text-white/60 text-center text-sm mb-8 max-w-md leading-relaxed'>
                Discover personalized travel itineraries and plan your dream vacation with AI-powered intelligence.
            </p>

            <div className='grid grid-cols-1 gap-3 w-full max-w-md'>
                <div className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-[24px] p-4 flex gap-3 items-center hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] cursor-pointer transition-all duration-300 group'
                    onClick={() => setMsg('Create New Trip')}
                >
                    <div className='bg-gradient-to-br from-purple-500 to-fuchsia-500 p-2.5 rounded-[18px] shadow-lg group-hover:shadow-fuchsia-500/50 transition-all duration-300'>
                        <MapPin className='text-white h-5 w-5' />
                    </div>
                    <h2 className='font-semibold text-white/90 text-sm tracking-tight'>Create New Trip</h2>
                </div>

                <div className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-[24px] p-4 flex gap-3 items-center hover:bg-white/10 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] cursor-pointer transition-all duration-300 group'
                    onClick={() => setMsg('Inspire me where to go')}
                >
                    <div className='bg-gradient-to-br from-fuchsia-500 to-purple-500 p-2.5 rounded-[18px] shadow-lg group-hover:shadow-fuchsia-500/50 transition-all duration-300'>
                        <Plane className='text-white h-5 w-5' />
                    </div>
                    <h2 className='font-semibold text-white/90 text-sm tracking-tight'>Inspire Me Where to Go</h2>
                </div>

                <div className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-[24px] p-4 flex gap-3 items-center hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] cursor-pointer transition-all duration-300 group'
                    onClick={() => setMsg('Discover Hidden gems')}
                >
                    <div className='bg-gradient-to-br from-purple-500 to-fuchsia-500 p-2.5 rounded-[18px] shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300'>
                        <Sparkles className='text-white h-5 w-5' />
                    </div>
                    <h2 className='font-semibold text-white/90 text-sm tracking-tight'>Discover Hidden Gems</h2>
                </div>

                <div className='backdrop-blur-xl bg-white/5 border border-white/10 rounded-[24px] p-4 flex gap-3 items-center hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer transition-all duration-300 group'
                    onClick={() => setMsg('Adventure Destination')}
                >
                    <div className='bg-gradient-to-br from-purple-500 to-fuchsia-500 p-2.5 rounded-[18px] shadow-lg group-hover:shadow-purple-500/50 transition-all duration-300'>
                        <Compass className='text-white h-5 w-5' />
                    </div>
                    <h2 className='font-semibold text-white/90 text-sm tracking-tight'>Adventure Destination</h2>
                </div>
            </div>
        </div>
    )
}

export default EmptyBoxState
