"use client"
import React, { useEffect, useState } from 'react';
import ChatBox, { TripInfo } from './_components/ChatBox';
import Itinerary from './_components/Itinerary';
import { TimelineDemo } from '@/components/TimelineDemo';
import { useTripDetail } from '@/app/provider';
import dynamic from 'next/dynamic';
import { RefreshCcw } from 'lucide-react'; // Or any switch icon

const GlobalMap = dynamic(() => import('./_components/GlobalMap'), { ssr: false });


import { Button } from '@/components/ui/button';
import { Plane, Globe2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

function CreateNewTrip() {
  const [tripData, setTripData] = useState<TripInfo>();
  const { setTripDetailInfo } = useTripDetail();
  const [activeIndex, setActiveIndex] = useState(1);

  useEffect(() => {
    setTripDetailInfo(null);
  }, []);

  return (
    <TooltipProvider>
      {/* Main wrapper - pushes ALL content below header using CSS variable */}
      <main className='pt-[var(--header-h)] h-screen overflow-hidden relative'>
        {/* Ambient glows - mission control feel */}
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[150px]' />
          <div className='absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[150px]' />
        </div>

        {/* Flex container - fills remaining space */}
        <div className='flex flex-col md:flex-row h-full w-full'>

          {/* Sidebar - Chat Area (35% on desktop) */}
          <aside className='relative w-full md:w-[35%] flex flex-col overflow-hidden'>
            <ChatBox setTripData={(v: TripInfo) => setTripData(v)} />
          </aside>

          {/* Map/Itinerary Area (60% on desktop) */}
          <div className='flex-1 h-full relative overflow-hidden'>
            {/* Cosmic background */}
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-950/60 to-slate-950/90 pointer-events-none' />

            {/* Content */}
            <div className='relative z-10 h-full'>
              {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}

              {/* Toggle Button - Centered at bottom */}
              <div className='absolute bottom-10 left-1/2 -translate-x-1/2 z-10'>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size={'lg'}
                      onClick={() => setActiveIndex(activeIndex == 0 ? 1 : 0)}
                      className="bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_40px_rgba(217,70,239,0.9)] hover:scale-105 transition-all duration-300 rounded-full font-semibold"
                    >
                      {activeIndex == 0 ? <Plane className="mr-2 h-4 w-4" /> : <Globe2 className="mr-2 h-4 w-4" />}
                      {activeIndex == 0 ? 'View Map' : 'View Itinerary'}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Switch Between Map and Trip</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </main>
    </TooltipProvider>
  )
}

export default CreateNewTrip;