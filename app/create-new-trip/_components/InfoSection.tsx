import type { TripInfo } from "./ChatBox";

function InfoSection({ trip }: { trip: TripInfo | null }) {
    return (
        <div>
            <h2 className='font-bold text-3xl'>Your Trip Itinerary to {trip?.destination} is Ready</h2>

            <div className='flex flex-wrap gap-3 mt-5'>
                <h2 className='p-1 px-3 bg-primary/10 border border-border rounded-full text-muted-foreground text-sm md:text-md'>📅 {trip?.duration} Days</h2>
                <h2 className='p-1 px-3 bg-primary/10 border border-border rounded-full text-muted-foreground text-sm md:text-md'>💰 {trip?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-primary/10 border border-border rounded-full text-muted-foreground text-sm md:text-md'>👥 {trip?.group_size} Travelers</h2>
            </div>
        </div>
    )
}

export default InfoSection;
