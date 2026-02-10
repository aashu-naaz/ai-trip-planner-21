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
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setTripDetailInfo(null);
  }, []);

  return (
    <TooltipProvider>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-5 p-10'>
        <div className='md:col-span-2'>
          <ChatBox setTripData={(v: TripInfo) => setTripData(v)} />
        </div>
        <div className='md:col-span-3 relative'>
          {activeIndex == 0 ? <Itinerary /> : <GlobalMap />}

          <div className='absolute bottom-10 left-[50%] z-10'>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={'lg'}
                  onClick={() => setActiveIndex(activeIndex == 0 ? 1 : 0)}
                  className="bg-black hover:bg-gray-700 rounded-2xl"
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
    </TooltipProvider>
  )
}

export default CreateNewTrip;