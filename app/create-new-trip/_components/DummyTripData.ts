import { TripInfo } from "./ChatBox";

export const DummyTripData: TripInfo = {
    budget: 'Luxury',
    destination: 'Paris, France',
    duration: '5 Days',
    group_size: 'Couple',
    origin: 'Mumbai, India',
    hotels: [
        {
            hotel_name: 'The Ritz Paris',
            hotel_address: '15 Place Vendôme, 75001 Paris',
            price: '$1,200/night',
            rating: 4.9,
            hotel_image_url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop'
        },
        {
            hotel_name: 'Pullman Paris Tour Eiffel',
            hotel_address: '18 Avenue De Suffren, 75015 Paris',
            price: '$450/night',
            rating: 4.5,
            hotel_image_url: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop'
        }
    ],
    itinerary: [
        {
            day: 'Day 1',
            activities: [
                {
                    place_name: 'Eiffel Tower',
                    place_details: "Gustave Eiffel's iconic, wrought-iron 1889 tower, with steps and elevators to observation decks.",
                    place_image_url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
                    geo_coordinates: { lat: 48.8584, lng: 2.2945 },
                    ticket_pricing: '€26',
                    time_to_travel: '2-3 hours'
                },
                {
                    place_name: 'Louvre Museum',
                    place_details: "The world's largest art museum and a historic monument in Paris, home to the Mona Lisa.",
                    place_image_url: 'https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=1000&auto=format&fit=crop',
                    geo_coordinates: { lat: 48.8606, lng: 2.3376 },
                    ticket_pricing: '€17',
                    time_to_travel: '3-4 hours'
                }
            ]
        },
        {
            day: 'Day 2',
            activities: [
                {
                    place_name: 'Disneyland Paris',
                    place_details: "Entertainment resort featuring two theme parks, resort hotels, nature resorts, and shopping.",
                    place_image_url: '/disneyland.png',
                    geo_coordinates: { lat: 48.8722, lng: 2.7758 },
                    ticket_pricing: '€90',
                    time_to_travel: 'Full Day'
                },
                {
                    place_name: 'Panthéon',
                    place_details: "A monument in the 5th arrondissement of Paris, France. Modeled on the Pantheon in Rome.",
                    place_image_url: '/pantheon.png',
                    geo_coordinates: { lat: 48.8462, lng: 2.3464 },
                    ticket_pricing: '€11',
                    time_to_travel: '1-2 hours'
                }
            ]
        }
    ]
}
