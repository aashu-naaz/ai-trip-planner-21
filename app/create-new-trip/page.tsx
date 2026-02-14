"use client"
import React, { useEffect, useState, useRef } from 'react';
import ChatBox, { TripInfo } from './_components/ChatBox';
import Itinerary from './_components/Itinerary';
import { useTripDetail } from '@/app/provider';
import dynamic from 'next/dynamic';
import { RefreshCcw, Plane, Globe2 } from 'lucide-react';



import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const GlobalMap = dynamic(() => import('./_components/GlobalMap'), { ssr: false });

function CreateNewTrip() {
  const [tripData, setTripData] = useState<TripInfo>();
  const { setTripDetailInfo } = useTripDetail();
  const [activeIndex, setActiveIndex] = useState(1);


  useEffect(() => {
    setTripDetailInfo(null);
  }, []);

  return (
    <TooltipProvider>
      <main className='pt-[var(--header-h)] h-screen overflow-hidden relative'>
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-violet-500/10 blur-[150px]' />
          <div className='absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[150px]' />
        </div>

        <div className='flex flex-col md:flex-row h-full w-full'>

          <aside className='relative w-full md:w-[35%] flex flex-col overflow-hidden'>
            <React.Suspense fallback={<div className="flex items-center justify-center h-full"><span className="animate-spin h-5 w-5 border-t-2 border-primary rounded-full"></span></div>}>
              {/* Pass the handlePrint function to ChatBox */}
              <ChatBox setTripData={(v: TripInfo) => setTripData(v)} />
            </React.Suspense>
          </aside>

          <div className='flex-1 h-full relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-950/80 via-purple-950/60 to-slate-950/90 pointer-events-none' />

            <div className='relative z-10 h-full'>
              <div className={`h-full ${activeIndex == 0 ? 'block' : 'hidden'}`}>
                <div className="h-full">
                  <Itinerary />
                </div>
              </div>

              <div className={`h-full ${activeIndex == 1 ? 'block' : 'hidden'}`}>
                <GlobalMap />
              </div>

              <div className='absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 print:hidden'>
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
    </TooltipProvider >
  )
}

export default CreateNewTrip;