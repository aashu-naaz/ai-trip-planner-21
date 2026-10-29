import { PhotoCredit } from "@/components/ui/photo-credit";
import type { TripInfo } from "@/app/create-new-trip/_components/ChatBox";
import { Button } from '@/components/ui/button';
import { usePlacePhoto } from "@/hooks/use-place-photo";
import { Calendar,Printer,Share2,Sparkles,Users,Wallet } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';

function TripHeader({ trip, onPrint }: { trip: TripInfo | null, onPrint?: () => void }) {
    const photoUrl = usePlacePhoto(trip?.destination);

    return (
        <div className='relative w-full overflow-hidden rounded-3xl shadow-lg'>
            {/* Background Image with Gradient Overlay */}
            <Image
                src={photoUrl && typeof photoUrl === 'string' && photoUrl !== '' ? photoUrl : '/placeholder.jpg'}
                alt='trip-destination'
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className='object-cover'
            />
                    <PhotoCredit placeName={trip?.destination} />
            <div className='absolute inset-0 bg-linear-to-t from-indigo-950 via-purple-950/60 to-transparent' />

            {/* Content Container */}
            <div className='relative z-20 flex min-h-[360px] flex-col justify-end p-5 pt-16 sm:p-8 sm:pt-20 lg:min-h-[420px]'>
                <div className='flex flex-col xl:flex-row justify-between items-start xl:items-end gap-6'>

                    {/* Title & Location */}
                    <div className='min-w-0 space-y-4 max-w-2xl animate-fade-up'>
                        <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-cyan-300 shadow-lg shadow-cyan-500/20'>
                            <Sparkles className='w-3 h-3' />
                            <span>Your destination</span>
                        </div>
                        <h1 className='text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-white via-purple-200 to-cyan-200 drop-shadow-sm'>
                            {trip?.destination}
                        </h1>

                        <div className='flex flex-wrap gap-3'>
                            {/* New Badges for Pace/Style */}
                            {trip?.trip_style && (
                                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-purple-300 shadow-sm'>
                                    <span>{trip.trip_style}</span>
                                </div>
                            )}
                            {trip?.travel_pace && (
                                <div className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-cyan-300 shadow-sm'>
                                    <span>{trip.travel_pace}</span>
                                </div>
                            )}
                            {/* Interests as small tags */}
                            {trip?.interests?.map((interest: string, i: number) => (
                                <div key={i} className='flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-xs font-medium text-white/80'>
                                    <span>#{interest}</span>
                                </div>
                            ))}

                            <div className='w-full h-0 basis-full my-1 sm:hidden'></div>

                            <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg'>
                                <Calendar className='w-4 h-4 text-fuchsia-400' />
                                <span className='text-sm'>{trip?.duration} Days</span>
                            </div>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg'>
                                <Wallet className='w-4 h-4 text-purple-400' />
                                <span className='text-sm'>{trip?.budget} Budget</span>
                            </div>
                            <div className='flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 text-white/90 shadow-lg'>
                                <Users className='w-4 h-4 text-cyan-400' />
                                <span className='text-sm'>{trip?.group_size} Travelers</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons - Hidden when printing */}
                    <div className='flex gap-3 animate-fade-up print:hidden' style={{ animationDelay: '0.1s' }}>
                        {onPrint && (
                            <Button
                                onClick={onPrint}
                                className='bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full'
                            >
                                <Printer className='w-4 h-4 mr-2' />
                                Download PDF
                            </Button>
                        )}
                        <Button
                            onClick={async () => {
                                try {
                                    await navigator.clipboard.writeText(window.location.href);
                                    toast.success("Link copied to clipboard!");
                                } catch {
                                    toast.error("Couldn’t copy the link. You can copy it from the address bar.");
                                }
                            }}
                            className='bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full'
                        >
                            <Share2 className='w-4 h-4 mr-2' />
                            Share trip
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripHeader
