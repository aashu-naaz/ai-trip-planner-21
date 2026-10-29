import { Cloud,CloudRain,Loader2,Snowflake,Sun } from 'lucide-react';
import { useEffect,useState } from 'react';

interface WeatherData {
    temp: number;
    main: string;
    description: string;
    icon: string;
}

function WeatherSection({ coordinates }: { coordinates?: { lat: number, lng: number } }) {
    const lat = coordinates?.lat;
    const lng = coordinates?.lng;
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const key = `${lat},${lng}`;
    const [result, setResult] = useState<{ key: string; data?: WeatherData; error?: string }>();
    const weatherData = result?.key === key ? result.data : undefined;
    const error = result?.key === key ? result.error : undefined;
    const loading = !!apiKey && lat !== undefined && lng !== undefined && result?.key !== key;

    useEffect(() => {
        if (!apiKey || lat === undefined || lng === undefined) return;
        const controller = new AbortController();
        const load = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`, { signal: controller.signal });
                if (!response.ok) throw new Error("Weather is temporarily unavailable");
                const data = await response.json();
                setResult({ key, data: { temp: Math.round(data.main.temp), main: data.weather[0].main, description: data.weather[0].description, icon: data.weather[0].icon } });
            } catch {
                if (!controller.signal.aborted) setResult({ key, error: "Weather is temporarily unavailable" });
            }
        };
        void load();
        return () => controller.abort();
    }, [lat, lng, apiKey, key]);

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
