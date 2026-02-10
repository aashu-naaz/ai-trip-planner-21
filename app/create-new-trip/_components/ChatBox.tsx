"use client"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState, useEffect, useRef } from 'react'
import { Send, Loader } from 'lucide-react'
import EmptyBoxState from './EmptyBoxState';
import GroupSizeUi from './GroupSizeUi';
import BudgetUi from './BudgetUi';
import TripDurationUi from './TripDurationUi';
import axios from 'axios';
import GeneratingTripUi from './GeneratingTripUi';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useTripDetail } from '@/app/provider';
import { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';

import HotelCardItem, { Hotel } from './HotelCardItem';

type Message = {
    role: string,
    content: string,
    ui?: string
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
    plan: string; // Sometimes AI returns a plan summary?
    activities: Activity[];
}

export type TripInfo = { // Exported for use in page.tsx
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: Hotel[],
    itinerary: ItineraryDay[]
}

function ChatBox({ setTripData }: { setTripData?: (trip: TripInfo) => void }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState<string>('')
    const [isLoading, setIsLoading] = useState(false)
    const [isFinal, setIsFinal] = useState(false)
    const [tripDetail, setTripDetail] = useState<TripInfo>()
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const SaveTripDetail = useMutation(api.tripDetail.CreateTripDetail)
    const router = useRouter();
    const { user } = useUser();
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isLoading])

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.ui == 'final') {
            setIsFinal(true);
            setUserInput('Ok, Great!')
            // onSend();
        }
    }, [messages])

    useEffect(() => {
        if (isFinal && userInput) {
            onSend();
        }
    }, [isFinal]);

    const onSaveTrip = async () => {
        const result = await SaveTripDetail({
            tripId: uuidv4(),
            tripDetail: tripDetail,
            uid: userDetail?._id
        })
        console.log(result)
        router.push('/my-trips')
    }

    const onSend = () => {
        sendMessage(userInput)
    }

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const newMsg: Message = {
            role: 'user',
            content: text
        }

        setMessages((prev) => [...prev, newMsg])
        setUserInput('')
        setIsLoading(true)

        try {
            const result = await axios.post('/api/arcjet/aimodel', {
                messages: [...messages, newMsg],
                isFinal: isFinal
            }, {
                timeout: 60000 // 60 seconds timeout
            })

            console.log("TRIP", result.data);

            if (!isFinal) {
                // Parse response: The API returns { resp: 'Text', ui: '...' }
                // or an error object. We must ensure content is a string.
                const data = result.data;
                let aiContent = "Sorry, I encountered an error.";

                if (data && typeof data === 'object') {
                    if (data.resp || data.resp === "") {
                        aiContent = data.resp || "I'm thinking..."; // Fallback if empty
                    } else if (data.error) {
                        aiContent = typeof data.error === 'string' ? data.error : JSON.stringify(data.error);
                    } else {
                        aiContent = "Error: " + (data.message || JSON.stringify(data));
                    }
                } else if (typeof data === 'string') {
                    aiContent = data;
                }

                // parsing raw json check
                if (aiContent.trim().startsWith('{') && aiContent.includes('"resp"')) {
                    try {
                        const parsed = JSON.parse(aiContent);
                        if (parsed.resp) {
                            aiContent = parsed.resp;
                        }
                        // If we successfully parsed, we might want to use the ui field too
                        if (parsed.ui) {
                            result.data.ui = parsed.ui;
                        }
                        if (parsed.trip_plan) {
                            result.data.trip_plan = parsed.trip_plan;
                            // triggering final update via side effect if needed?
                            // logic below uses result.data.ui, so updating it here matters.
                        }
                    } catch (e) {
                        // If parsing fails, it's likely truncated or invalid JSON
                        // We can choose to show a friendly error or leave as is.
                        // Given the user report, hiding the scary JSON is better.
                        aiContent = "Sorry, I encountered an error generating the plan (incomplete response). Please try again.";
                    }
                }

                setMessages((prev) => [...prev, {
                    role: 'assistant',
                    content: aiContent,
                    ui: result?.data?.ui
                }])
            }

            if (isFinal) {
                setTripDetail(result?.data?.trip_plan);
                setTripDetailInfo(result?.data?.trip_plan);
                if (setTripData) setTripData(result?.data?.trip_plan); // Update parent state
                setIsFinal(false);
                const tripId = uuidv4();
                const saveResult = await SaveTripDetail({
                    tripDetail: result?.data?.trip_plan,
                    tripId: tripId,
                    uid: userDetail?._id
                });
                console.log(saveResult)
                // router.push('/view-trip/' + saveResult)
            }

        } catch (error: any) {
            console.error("Error sending message:", error)
            let errorMessage = "Network error. Please try again.";
            if (error.response) {
                errorMessage = error.response.data?.error || `Error ${error.response.status}: ${error.response.statusText}`;
            } else if (error.message) {
                errorMessage = error.message;
            }

            setMessages((prev) => [...prev, {
                role: 'assistant',
                content: errorMessage,
            }])
        } finally {
            setIsLoading(false)
        }
    }









    // ... (existing imports)

    const RenderGenerativeUi = (ui: string | undefined) => {
        const option = ui?.toLowerCase()
        if (option == 'budget') {
            return <BudgetUi onOptionSelect={(v: string) => sendMessage(v)} />
        } else if (option == 'groupsize') {
            return <GroupSizeUi onOptionSelect={(v: string) => sendMessage(v)} />
        } else if (option == 'tripduration') {
            return <TripDurationUi onOptionSelect={(v: string) => sendMessage(v)} />
        } else if (option == 'final') {
            return <GeneratingTripUi viewTrip={onSaveTrip} disable={!tripDetail} />
        }
        return null
    }

    return (
        <div className='h-[85vh] flex flex-col'>
            {/* Display Messages Area */}
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.length == 0 ? <EmptyBoxState setMsg={sendMessage} /> :
                    <div className='flex flex-col gap-2'>
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mt-2`}
                            >
                                <div className={`px-4 py-2 rounded-xl max-w-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-gray-100'}`}>
                                    {msg.content}
                                    {RenderGenerativeUi(msg.ui ?? '')}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className='flex justify-start mt-2'>
                                <div className='bg-gray-100 px-4 py-2 rounded-xl'>
                                    <Loader className='animate-spin' />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                }
            </section>

            {/* Input Area */}
            <div className='border rounded-2xl p-4 relative'>
                <Textarea
                    placeholder='Start typing here...'
                    className='w-full h-28 bg-transparent border-none focus-visible:ring-0'
                    value={userInput}
                    onChange={(event) => setUserInput(event.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onSend();
                        }
                    }}
                />
                <Button
                    size='icon'
                    className='absolute bottom-6 right-6'
                    onClick={onSend}
                >
                    <Send className='h-4 w-4' />
                </Button>
            </div>
        </div>
    )
}

export default ChatBox