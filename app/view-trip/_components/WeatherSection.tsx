import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Cloud, CloudRain, Sun, Snowflake, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface WeatherData {
    temp: number;
    main: string;
    description: string;
    icon: string;
}

function WeatherSection({ coordinates }: { coordinates: { lat: number, lng: number } }) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (coordinates) {
            GetWeather();
        }
    }, [coordinates?.lat, coordinates?.lng]); // Use primitive values to avoid re-renders on object reference change

    const GetWeather = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
            if (!apiKey) {
                console.error("OpenWeather API key not found");
                setError("API Key Missing");
                setLoading(false);
                return;
            }

            const resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&appid=${apiKey}&units=metric`);

            setWeatherData({
                temp: Math.round(resp.data.main.temp),
                main: resp.data.weather[0].main,
                description: resp.data.weather[0].description,
                icon: resp.data.weather[0].icon
            });
        } catch (e: any) {
            console.error("Weather Fetch Error:", e);
            if (e.response && e.response.status === 429) {
                setError("API Limit Reached");
                toast.error("Weather API Usage Limit Reached (429). Key might be new or quota exceeded.");
            } else if (e.response && e.response.status === 401) {
                setError("API Key Invalid/Activating");
                toast.error("Weather API Key Invalid (401). New keys take 10-15 mins to activate.");
            } else {
                setError("Failed to load weather");
            }
        } finally {
            setLoading(false);
        }
    }

    const getWeatherIcon = (main: string) => {
        switch (main?.toLowerCase()) {
            case 'clouds': return <Cloud className="w-8 h-8 text-gray-400" />;
            case 'rain': return <CloudRain className="w-8 h-8 text-blue-400" />;
            case 'clear': return <Sun className="w-8 h-8 text-yellow-400" />;
            case 'snow': return <Snowflake className="w-8 h-8 text-cyan-400" />;
            default: return <Sun className="w-8 h-8 text-yellow-500" />;
        }
    }

    if (loading) {
        return (
            <div className="mt-5 border p-4 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm animate-pulse">
                <Loader2 className='w-6 h-6 animate-spin text-primary' />
            </div>
        )
    }

    if (error) {
        return (
            <div className="mt-5 border p-4 rounded-xl bg-red-500/10 border-red-500/30 flex items-center gap-3">
                <Cloud className='w-6 h-6 text-red-400' />
                <h2 className="text-red-400 font-medium">{error}</h2>
            </div>
        )
    }

    if (!weatherData) return null;

    return (
        <div className="mt-5 border p-4 rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/30 transition-all">
            <h2 className='font-bold text-xl mb-3 text-white'>Weather</h2>
            <div className="flex items-center gap-5">
                <div className="p-3 bg-white/10 rounded-full">
                    {getWeatherIcon(weatherData.main)}
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-white">{weatherData.temp}°C</h2>
                    <h2 className="text-gray-400 capitalize">{weatherData.description}</h2>
                </div>
            </div>
        </div>
    )
}

export default WeatherSection
