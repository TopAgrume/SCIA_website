"use client";

import React, { useEffect, useState } from 'react';
import { parseISO, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, isWithinInterval } from 'date-fns';

interface Event {
    SUMMARY: string;
    DTSTART: string;
    DTEND: string;
    LOCATION?: string;
}

interface WeeklyCalendarProps {
    isAuthenticated: boolean;
    authToken: string; // Bearer token
}

const parseICSEvents = (icsData: string): Event[] => {
    const events: Event[] = [];
    const lines = icsData.split('\n');
    let currentEvent: Partial<Event> = {};

    for (const line of lines) {
        if (line.startsWith('BEGIN:VEVENT')) {
            currentEvent = {};
        } else if (line.startsWith('END:VEVENT')) {
            events.push(currentEvent as Event);
        } else if (line.includes(':')) {
            const [key, value] = line.split(':');
            currentEvent[key.trim() as keyof Event] = value.trim();
        }
    }

    return events;
};

const formatEventTime = (dateString: string) => {
    const date = parseISO(dateString);
    return format(date, 'HH:mm');
};

const getEventDuration = (start: string, end: string) => {
    const startDate = parseISO(start);
    const endDate = parseISO(end);
    const durationMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    return Math.max(30, Math.min(durationMinutes, 720)); // Min 30 minutes, max 12 hours
};

const computeGapHeight = (prevEvent: Event, event: Event) => {
    const prevEnd = parseISO(prevEvent.DTEND);
    const currStart = parseISO(event.DTSTART);
    const gapMinutes = (currStart.getTime() - prevEnd.getTime()) / (1000 * 60);
    return gapMinutes >= 15 ? Math.min(300, gapMinutes * 0.5) : 0;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ isAuthenticated, authToken }) => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated && authToken) {
            fetchEvents();
        }
    }, [isAuthenticated, authToken]);

    const fetchEvents = async () => {
        setIsLoading(true);
        setError(null);

        const today = new Date();
        const startDate = startOfWeek(today, { weekStartsOn: 1 });
        const endDate = endOfWeek(today, { weekStartsOn: 1 });

        const startDateString = format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
        const endDateString = format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

        try {
            const response = await fetch(`https://zeus.ionis-it.com/api/reservation/filter/displayable?groups=21&startDate=${startDateString}&endDate=${endDateString}`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`,
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const data = await response.json();
            setEvents(parseICSEvents(data));
        } catch (err) {
            setError('Failed to load events. Please try again later.');
            console.error('Error fetching events:', err);
        } finally {
            setIsLoading(false);
        }
    };

    // Don't render anything if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    if (isLoading) {
        return <div>Loading calendar...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 });
    const endDate = endOfWeek(today, { weekStartsOn: 1 });

    // Filter out weekends (0 = Sunday, 6 = Saturday)
    const weekDays = eachDayOfInterval({ start: startDate, end: endDate })
        .filter(day => day.getDay() !== 0 && day.getDay() !== 6);

    // Filter events that are within the current week
    const filteredEvents = events.filter(event => {
        const eventStart = parseISO(event.DTSTART);
        const eventEnd = parseISO(event.DTEND);
        return isWithinInterval(eventStart, { start: startDate, end: endDate }) ||
            isWithinInterval(eventEnd, { start: startDate, end: endDate }) ||
            (eventStart <= startDate && eventEnd >= endDate);
    });

    return (
        <div className="p-4 pb-8 h-full">
            <h2 className="text-2xl font-bold mb-4">This Week&#39;s Schedule</h2>
            <div className="grid grid-cols-5 gap-2 h-[calc(100%-2rem)]">
                {weekDays.map(day => {
                    const dayEvents = filteredEvents
                        .filter(event => isSameDay(parseISO(event.DTSTART), day))
                        .sort((a, b) => parseISO(a.DTSTART).getTime() - parseISO(b.DTSTART).getTime());

                    return (
                        <div key={day.toISOString()} className="border rounded-lg overflow-hidden flex flex-col relative">
                            <div className="bg-gray-100 p-2 text-center font-semibold">
                                {format(day, 'EEE dd/MM')}
                            </div>
                            <div className="p-2 flex-grow overflow-y-auto relative">
                                {dayEvents.map((event, index) => {
                                    const eventStart = parseISO(event.DTSTART);
                                    const eventEnd = parseISO(event.DTEND);
                                    const isCurrentEvent = eventStart <= today && today <= eventEnd;
                                    const prevEvent = dayEvents[index - 1];
                                    let gapHeight = 0;

                                    if (prevEvent) {
                                        gapHeight = computeGapHeight(prevEvent, event);
                                    }

                                    return (
                                        <React.Fragment key={index}>
                                            {gapHeight > 0 && (
                                                <div style={{ height: `${gapHeight}px` }}></div>
                                            )}
                                            <div
                                                className="mb-2 p-2 rounded text-sm"
                                                style={{
                                                    backgroundColor: isCurrentEvent ? '#FFCC99' : '#bfdbfe',
                                                    minHeight: `${getEventDuration(event.DTSTART, event.DTEND) / 2}px`
                                                }}
                                            >
                                                <div className="font-semibold">{event.SUMMARY}</div>
                                                <div>{formatEventTime(event.DTSTART)} - {formatEventTime(event.DTEND)}</div>
                                                {event.LOCATION && <div className="text-xs text-gray-600">{event.LOCATION}</div>}
                                            </div>
                                        </React.Fragment>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyCalendar;