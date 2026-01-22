import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
    const tripData = {
        origin: "Mumbai, India",
        destination: "Paris, France",
        duration: "5 Days",
        budget: "Luxury",
        group_size: "Couple",
        hotels: [],
        itinerary: []
    }

    const data = [
        {
            title: "Hotels",
            content: (
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
                    <div className='border rounded-xl hover:scale-105 transition-all cursor-pointer shadow-sm'>
                        <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop" className='rounded-t-xl h-[250px] w-full object-cover' />
                        <div className='p-4 flex flex-col gap-2'>
                            <h2 className='font-bold text-lg'>The Ritz Paris</h2>
                            <h2 className='text-xs text-gray-500'>📍 15 Place Vendôme, 75001 Paris</h2>
                            <div className='flex gap-2 justify-between items-center'>
                                <h2 className='text-sm text-green-700 font-medium'>💵 $1,200/night</h2>
                                <h2 className='text-sm font-bold'>⭐ 4.9</h2>
                            </div>
                            <div className='mt-2'>
                                <a href={`https://www.google.com/maps/search/?api=1&query=15 Place Vendôme, 75001 Paris`} target='_blank'>
                                    <button className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-md w-full border border-primary hover:bg-primary/20 transition-all'>View on Map</button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded-xl hover:scale-105 transition-all cursor-pointer shadow-sm'>
                        <img src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop" className='rounded-t-xl h-[250px] w-full object-cover' />
                        <div className='p-4 flex flex-col gap-2'>
                            <h2 className='font-bold text-lg'>Pullman Paris Tour Eiffel</h2>
                            <h2 className='text-xs text-gray-500'>📍 18 Avenue De Suffren, 75015 Paris</h2>
                            <div className='flex gap-2 justify-between items-center'>
                                <h2 className='text-sm text-green-700 font-medium'>💵 $450/night</h2>
                                <h2 className='text-sm font-bold'>⭐ 4.5</h2>
                            </div>
                            <div className='mt-2'>
                                <a href={`https://www.google.com/maps/search/?api=1&query=18 Avenue De Suffren, 75015 Paris`} target='_blank'>
                                    <button className='bg-primary/10 text-primary text-sm px-3 py-1 rounded-md w-full border border-primary hover:bg-primary/20 transition-all'>View on Map</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Day 1",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='border rounded-lg shadow-sm bg-white hover:shadow-md transition-all'>
                        <img src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop" className='rounded-t-lg h-[280px] w-full object-cover mb-3' />
                        <div className='p-4'>
                            <h3 className='font-bold text-lg mb-2'>Eiffel Tower</h3>
                            <p className='text-sm text-gray-600 line-clamp-2'>Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.</p>
                            <div className='flex gap-2 mt-3 items-center'>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>⏱️ 2-3 hours</span>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>🎟️ €26</span>
                            </div>
                            <div className='mt-4'>
                                <a href={`https://www.google.com/maps/search/?api=1&query=Eiffel Tower`} target='_blank'>
                                    <button className='block w-full text-center bg-black text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition-colors'>
                                        View on Map
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded-lg shadow-sm bg-white hover:shadow-md transition-all'>
                        <img src="https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=1000&auto=format&fit=crop" className='rounded-t-lg h-[280px] w-full object-cover mb-3' />
                        <div className='p-4'>
                            <h3 className='font-bold text-lg mb-2'>Louvre Museum</h3>
                            <p className='text-sm text-gray-600 line-clamp-2'>The world's largest art museum and a historic monument in Paris, home to the Mona Lisa.</p>
                            <div className='flex gap-2 mt-3 items-center'>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>⏱️ 3-4 hours</span>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>🎟️ €17</span>
                            </div>
                            <div className='mt-4'>
                                <a href={`https://www.google.com/maps/search/?api=1&query=Louvre Museum`} target='_blank'>
                                    <button className='block w-full text-center bg-black text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition-colors'>
                                        View on Map
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Day 2",
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div className='border rounded-lg shadow-sm bg-white hover:shadow-md transition-all'>
                        <img src="/disneyland.png" className='rounded-t-lg h-[280px] w-full object-cover mb-3 shadow-md' />
                        <div className='p-4'>
                            <h3 className='font-bold text-lg mb-2'>Disneyland Paris</h3>
                            <p className='text-sm text-gray-600 line-clamp-2'>Entertainment resort featuring two theme parks, resort hotels, nature resorts, and shopping.</p>
                            <div className='flex gap-2 mt-3 items-center'>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>⏱️ Full Day</span>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>🎟️ €90</span>
                            </div>
                            <div className='mt-4'>
                                <a href={`https://www.google.com/maps/search/?api=1&query=Disneyland Paris`} target='_blank'>
                                    <button className='block w-full text-center bg-black text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition-colors'>
                                        View on Map
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className='border rounded-lg shadow-sm bg-white hover:shadow-md transition-all'>
                        <img src="/pantheon.png" className='rounded-t-lg h-[280px] w-full object-cover mb-3 shadow-md' />
                        <div className='p-4'>
                            <h3 className='font-bold text-lg mb-2'>Panthéon</h3>
                            <p className='text-sm text-gray-600 line-clamp-2'>A monument in the 5th arrondissement of Paris, France. Modeled on the Pantheon in Rome.</p>
                            <div className='flex gap-2 mt-3 items-center'>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>⏱️ 1-2 hours</span>
                                <span className='bg-gray-100 p-1 rounded text-xs px-2'>🎟️ €11</span>
                            </div>
                            <div className='mt-4'>
                                <a href={`https://www.google.com/maps/search/?api=1&query=Panthéon`} target='_blank'>
                                    <button className='block w-full text-center bg-black text-white p-2 rounded-lg text-sm hover:bg-gray-800 transition-colors'>
                                        View on Map
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];
    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} tripData={tripData} />
        </div>
    );
}
