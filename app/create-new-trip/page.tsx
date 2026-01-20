"use client"
import React, { useState } from 'react';
import ChatBox, { TripInfo } from './_components/ChatBox';
import Itinerary from './_components/Itinerary';
import { TimelineDemo } from '@/components/TimelineDemo';

function CreateNewTrip() {
  const [tripData, setTripData] = useState<TripInfo>();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-10 pt-5'>
      <div>
        <ChatBox setTripData={(v: any) => setTripData(v)} />
      </div>
      <div>
        {tripData ? <Itinerary trip={{ tripDetail: tripData }} /> :
          <div className='hidden md:block h-[85vh] overflow-y-auto'><TimelineDemo /></div>
        }
      </div>
    </div>
  )
}

export default CreateNewTrip;