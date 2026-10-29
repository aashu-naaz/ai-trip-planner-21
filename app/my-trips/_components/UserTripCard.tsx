import { PhotoCredit } from "@/components/ui/photo-credit";
import { usePlacePhoto } from "@/hooks/use-place-photo";
import { ArrowRight,Users,Wallet } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { TripInfo } from '../../create-new-trip/_components/ChatBox';

function UserTripCard({ trip }: { trip: { tripId: string; tripDetail: TripInfo } }) {
    const photoUrl = usePlacePhoto(trip.tripDetail.destination);

    const details = trip.tripDetail;

    return (
        <Link href={'/view-trip/' + trip.tripId} className='group'>
            <div className='relative overflow-hidden rounded-3xl bg-black/20 border border-white/10 shadow-lg group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300'>

                {/* Image Container with Aspect Ratio */}
                <div className='relative h-[250px] w-full'>
                    <Image
                        src={photoUrl && typeof photoUrl === 'string' && photoUrl !== '' ? photoUrl : '/placeholder.jpg'}
                        alt={details?.destination || 'Trip'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                    />
                    <PhotoCredit linked={false} placeName={trip.tripDetail.destination} />

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent' />

                    {/* Top Badge */}
                    <div className='absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-xs text-white/90'>
                        {details?.duration} Days
                    </div>
                </div>

                {/* Content */}
                <div className='p-5 relative'>
                    <h2 className='text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-cyan-300 transition-colors'>
                        {details?.destination}
                    </h2>

                    <div className='flex items-center gap-4 text-white/60 text-sm'>
                        <div className='flex items-center gap-1.5'>
                            <Wallet className='w-3.5 h-3.5 text-purple-400' />
                            <span>{details?.budget}</span>
                        </div>
                        <div className='flex items-center gap-1.5'>
                            <Users className='w-3.5 h-3.5 text-violet-400' />
                            <span>{details?.group_size}</span>
                        </div>
                    </div>

                    {/* Hover Action */}
                    <div className='absolute bottom-5 right-5 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300'>
                        <div className='p-2 rounded-full bg-cyan-500/20 text-cyan-400'>
                            <ArrowRight className='w-4 h-4' />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UserTripCard
