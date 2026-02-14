"use client"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect, useRef } from 'react'
import { Send, Loader, Sparkles, Wand2, Bot } from 'lucide-react'
import { toast } from 'sonner';
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import TripDurationUi from './TripDurationUi';
import InterestsUi from './InterestsUi';
import TravelPaceUi from './TravelPaceUi';
import TripStyleUi from './TripStyleUi';
import axios from 'axios';
import GeneratingTripUi from './GeneratingTripUi';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useTripDetail } from '@/app/provider';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import HotelCardItem, { Hotel } from './HotelCardItem';

type Message = {
    role: string,
    content: string,
    ui?: string,
    timestamp?: string
}

export type Activity = {
    place_name: string;
    place_details: string;
    place_image_url: string;
    geo_coordinates: {
        lat: number;
        lng: number;
    } | string;
    place_address: string;
    ticket_pricing: string;
    time_to_travel: string;
}

export type ItineraryDay = {
    day: string | number;
    plan: string;
    activities: Activity[];
}

export type TripInfo = {
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    interests?: string[],
    travel_pace?: string,
    trip_style?: string,
    hotels: Hotel[],
    itinerary: ItineraryDay[]
}

function ChatBox({ setTripData, onPrint }: { setTripData?: (trip: TripInfo) => void, onPrint?: () => void }) {
    // Session management for persistence
    const [tripId, setTripId] = useState<string | null>(null);

    // Fetch messages from Convex
    const convexMessages = useQuery(api.chat.getMessages, tripId ? { tripId } : "skip");
    const saveMessage = useMutation(api.chat.sendMessage);

    const [userInput, setUserInput] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isFinal, setIsFinal] = useState(false)
    const [tripDetail, setTripDetail] = useState<TripInfo>()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const messagesContainerRef = useRef<HTMLDivElement>(null)
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
    const router = useRouter();
    const searchParams = useSearchParams();
    const { user } = useUser();
    const initialized = useRef(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Initialize Trip ID
    useEffect(() => {
        // Priority 1: Check URL params (if user clicked a saved trip or refresh)
        let id = searchParams.get('tripId');

        // Priority 2: Check localStorage (if user is returning to a draft)
        if (!id) {
            id = localStorage.getItem('currentDraftTripId');
        }

        // Priority 3: Generate new (if nothing found)
        if (!id) {
            id = uuidv4();
            localStorage.setItem('currentDraftTripId', id);
        }

        setTripId(id);
    }, [searchParams]);

    // Fetch existing trip details if available (restores UI state on reload)
    const existingTrip = useQuery(api.tripDetail.GetTrip, tripId ? { tripId } : "skip");

    useEffect(() => {
        if (existingTrip && existingTrip.tripDetail) {
            setTripDetail(existingTrip.tripDetail);
            setTripData?.(existingTrip.tripDetail);
            setTripDetailInfo(existingTrip.tripDetail);
        }
    }, [existingTrip]);

    const scrollToBottom = () => {
        setTimeout(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
            }
        }, 100);
    }

    useEffect(() => {
        const query = searchParams.get('q');
        if (query && !initialized.current && tripId) {
            initialized.current = true;
            sendMessage(query);
            // Clean URL without refresh
            router.replace('/create-new-trip', { scroll: false });
        }
    }, [searchParams, tripId]);

    // Auto-scroll to bottom moved to separate useEffect
    useEffect(() => {
        scrollToBottom()
    }, [convexMessages, isLoading])


    const onSaveTrip = async () => {
        if (!tripId) return;

        // Ensure trip is saved before navigating (retry mechanism)
        if (userDetail && tripDetail) {
            await SaveTripDetail({
                tripId: tripId,
                tripDetail: tripDetail,
                uid: userDetail._id
            });
        }

        router.push('/view-trip/' + tripId);
    }

    const handleReset = () => {
        const newTripId = uuidv4();
        setTripId(newTripId);
        localStorage.setItem('currentDraftTripId', newTripId);
        setTripDetail(undefined);
        setTripData?.(undefined as any);
        setTripDetailInfo(null); // Clear context
        setIsFinal(false);
        setUserInput('');
        toast("Chat reset! Starting a new trip.");
    };

    const onSend = () => {
        sendMessage(userInput)
    }

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        // Check for reset commands
        if (['reset', 'start over', 'new trip', 'restart'].includes(text.trim().toLowerCase())) {
            handleReset();
            return;
        }

        if (!tripId) return;

        const timestamp = getCurrentTime();

        // 1. Save User Message
        await saveMessage({
            tripId,
            role: 'user',
            content: text,
            timestamp
        });

        setUserInput('')
        setIsLoading(true)

        // Prepare messages for API context
        const currentHistory = convexMessages?.map(m => ({ role: m.role, content: m.content })) || [];
        const apiMessages = [...currentHistory, { role: 'user', content: text }];

        try {
            const result = await axios.post('/api/arcjet/aimodel', {
                messages: apiMessages,
                isFinal: isFinal
            })

            if (result.data.trip_plan) {
                const tripPlan = result.data.trip_plan as TripInfo;
                setTripDetail(tripPlan);
                setTripData?.(tripPlan);
                setTripDetailInfo(tripPlan);

                // Auto-save the trip
                if (userDetail) {
                    await SaveTripDetail({
                        tripId: tripId,
                        tripDetail: tripPlan,
                        uid: userDetail._id
                    });

                    // Update URL with tripId without reloading
                    const newUrl = `/create-new-trip?tripId=${tripId}`;
                    window.history.pushState({ path: newUrl }, '', newUrl);

                    // Clear draft ID so next time user clicks "Create New Trip", they get a fresh session
                    localStorage.removeItem('currentDraftTripId');
                }

                // 2. Save AI Response (Final)
                await saveMessage({
                    tripId,
                    role: 'assistant',
                    content: "Your trip is generated. Click the button below to view it.",
                    ui: 'final',
                    timestamp: getCurrentTime()
                });

                setIsFinal(false);
            } else {
                const aiContent = result.data.resp || "I successfully processed that, but I have no text to show. Please continue.";
                const aiUi = result.data.ui;

                // 2. Save AI Response (Intermediate)
                await saveMessage({
                    tripId,
                    role: 'assistant',
                    content: aiContent,
                    ui: aiUi,
                    timestamp: getCurrentTime()
                });
            }

        } catch (error) {
            console.error(error);
            await saveMessage({
                tripId,
                role: 'assistant',
                content: "Something went wrong. Please try again.",
                timestamp: getCurrentTime()
            });
        } finally {
            setIsLoading(false)
        }
    }

    const RenderGenerativeUi = (ui: string) => {
        switch (ui) {
            case 'groupSize':
                return <GroupSizeUi onOptionSelect={sendMessage} />
            case 'budget':
                return <BudgetUi onOptionSelect={sendMessage} />
            case 'tripDuration':
                return <TripDurationUi onOptionSelect={sendMessage} />
            case 'interests':
                return <InterestsUi onSelect={(values) => sendMessage(values.join(', '))} />
            case 'travelPace':
                return <TravelPaceUi onSelect={sendMessage} />
            case 'tripStyle':
                return <TripStyleUi onSelect={sendMessage} />
            case 'final':
                return <GeneratingTripUi viewTrip={onSaveTrip} disable={!tripDetail && !existingTrip} onPrint={onPrint} tripId={tripId} />
            default:
                return null;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    const messagesToDisplay = convexMessages || [];

    return (
        <div className='h-full flex flex-col overflow-hidden relative'>
            {/* Dark cosmic gradient background */}
            <div className='absolute inset-0 bg-linear-to-b from-indigo-950 via-purple-950 to-black/95 pointer-events-none' />

            {/* Chat Header */}
            <div className='shrink-0 px-5 py-4 border-b border-white/10 backdrop-blur-xl bg-white/5 relative z-10'>
                <div
                    className='flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity group'
                    onClick={handleReset}
                    title="Start New Chat"
                >
                    <div className='w-10 h-10 rounded-full bg-linear-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform'>
                        <Sparkles className='w-5 h-5 text-white' />
                    </div>
                    <div>
                        <h2 className='text-base font-bold text-white tracking-tight'>SmartJourney AI</h2>
                        <p className='text-xs text-white/50'>Your personal trip planner ✈️</p>
                    </div>
                </div>
            </div>

            {/* Scrollable Messages Area */}
            <div ref={messagesContainerRef} className='flex-1 overflow-y-auto px-5 py-5 relative z-10 min-h-0 scroll-smooth'>
                {convexMessages === undefined ? (
                    <div className='flex items-center justify-center h-full'>
                        <Loader className='animate-spin text-white/50' />
                    </div>
                ) : messagesToDisplay.length === 0 && !isLoading ? (
                    <EmptyBoxState setMsg={sendMessage} />
                ) : (
                    <div className='flex flex-col gap-4 pb-4'>
                        {messagesToDisplay.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-up`} style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className={`px-4 py-3 max-w-[85%] transition-all duration-300 ${msg.role === 'user'
                                    ? 'rounded-[20px_20px_4px_20px] bg-linear-to-r from-purple-500 to-fuchsia-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] text-sm leading-relaxed'
                                    : 'rounded-[20px_20px_20px_4px] backdrop-blur-xl bg-white/5 border border-white/10 text-white/90 shadow-lg text-sm leading-relaxed'
                                    }`}>
                                    {msg.content}
                                </div>
                                {msg.timestamp && (
                                    <span className="text-[10px] text-white/30 mt-1 px-1">
                                        {msg.timestamp}
                                    </span>
                                )}

                                {/* Render Interactive UI */}
                                {msg.role === 'assistant' && msg.ui && (
                                    <div className="w-full mt-2">
                                        {RenderGenerativeUi(msg.ui)}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isLoading && (
                            <div className='flex flex-col items-start animate-scale-in'>
                                <div className='backdrop-blur-xl bg-white/5 border border-purple-500/30 px-4 py-3 rounded-[20px_20px_20px_4px] shadow-lg flex items-center gap-2'>
                                    <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-2 h-2 bg-fuchsia-400 rounded-full animate-bounce"></span>
                                </div>
                                <span className="text-[10px] text-white/30 mt-1 px-1">SmartJourney is thinking...</span>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className='shrink-0 backdrop-blur-xl bg-white/5 border-t border-white/10 p-4 relative z-10'>
                <div className='relative rounded-2xl border border-white/10 bg-white/5 p-1 focus-within:ring-2 focus-within:ring-purple-500/30 transition-all'>
                    <Textarea
                        placeholder='Describe your dream journey...'
                        className='min-h-[60px] max-h-[120px] w-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0 p-3 pr-12 text-sm text-white placeholder:text-white/40 leading-relaxed'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        suppressHydrationWarning
                    />
                    <Button
                        size='icon'
                        className={`absolute bottom-2 right-2 h-9 w-9 transition-all bg-linear-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 shadow-[0_0_15px_rgba(168,85,247,0.5)] hover:shadow-[0_0_25px_rgba(217,70,239,0.7)] hover:scale-105 rounded-full ${!userInput.trim() || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={onSend}
                        disabled={!userInput.trim() || isLoading}
                    >
                        {isLoading ? <Loader className='h-4 w-4 animate-spin' /> : <Send className='h-4 w-4' />}
                    </Button>
                </div>
                <p className="text-center text-[10px] text-white/30 mt-2">
                    Enter to send • Shift + Enter for new line
                </p>
            </div>
        </div>
    )
}

export default ChatBox