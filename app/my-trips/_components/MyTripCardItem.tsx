import { PhotoCredit } from "@/components/ui/photo-credit";
import { usePlacePhoto } from "@/hooks/use-place-photo";
import Image from 'next/image';
import Link from 'next/link';
import { TripInfo } from '../../create-new-trip/_components/ChatBox';

function MyTripCardItem({ trip }: { trip: { tripDetail: TripInfo, tripId: string } }) {
    const photoUrl = usePlacePhoto(trip.tripDetail.destination);

    return (
        <Link href={'/view-trip/' + trip?.tripId}>
            <div className='p-5 shadow rounded-2xl hover:scale-105 transition-all'>
                <Image src={photoUrl ? photoUrl : '/placeholder.jpg'}
                    alt={trip?.tripDetail?.destination}
                    width={1280}
                    height={720}
                    className='rounded-xl object-cover w-full h-[220px]'
                />
                    <PhotoCredit linked={false} placeName={trip.tripDetail.destination} />
                <div>
                    <h2 className='font-bold text-lg'>{trip?.tripDetail?.destination}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.tripDetail?.duration} Days trip with {trip?.tripDetail?.budget} Budget</h2>
                </div>
            </div>
        </Link>
    )
}

export default MyTripCardItem
