import React from 'react';
import { parseISO, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, isWithinInterval } from 'date-fns';
// See the doc here: https://date-fns.org/docs/Getting-Started

interface Event {
    SUMMARY: string; // Event title (i can't use title due to the ICS format)
    DTSTART: string; // Event start date
    DTEND: string; // Event end date
    LOCATION?: string; // Event location
}

interface WeeklyCalendarProps {
    icsData: string;
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
    // Minimum 15 minutes gap will add spacing, you can adjust this threshold
    return gapMinutes >= 15 ? Math.min(300, gapMinutes * 0.5) : 0; // Scale the gap
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ icsData }) => {
    const events = parseICSEvents(icsData);
    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 });
    const endDate = endOfWeek(today, { weekStartsOn: 1 });

    // Filter out weekends (0 = Sunday (why xD??), 6 = Saturday)
    const weekDays = eachDayOfInterval({ start: startDate, end: endDate })
        .filter(day => day.getDay() !== 0 && day.getDay() !== 6);

    // Filter events that are within the current week
    const filteredEvents = events.filter(event => {
        const eventStart = parseISO(event.DTSTART);
        const eventEnd = parseISO(event.DTEND);
        return isWithinInterval(eventStart, { start: startDate, end: endDate }) ||
            isWithinInterval(eventEnd, { start: startDate, end: endDate }) || // Event ends in the current week, to avoid problems with multi-day events
            (eventStart <= startDate && eventEnd >= endDate); // Event starts before the week and ends after the week
    });

    return (
        <div className="p-4 pb-8 h-full">
            <h2 className="text-2xl font-bold mb-4">This Week&#39;s Schedule</h2>
            {/* 1 column for each day of the week */}
            <div className="grid grid-cols-5 gap-2 h-[calc(100%-2rem)]">
                {weekDays.map(day => {
                    const dayEvents = filteredEvents
                        .filter(event => isSameDay(parseISO(event.DTSTART), day))
                        // Sorting is not an option due to the ICS format
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

                                    // Compute the gap between previous and current event
                                    if (prevEvent) {
                                        gapHeight = computeGapHeight(prevEvent, event);
                                    }

                                    return (
                                        <React.Fragment key={index}>
                                            {/* Add gap if there is one */}
                                            {gapHeight > 0 && (
                                                <div style={{ height: `${gapHeight}px` }}></div>
                                            )}
                                            <div
                                                className="mb-2 p-2 rounded text-sm"
                                                style={{
                                                    // Orange for current event, blue otherwise
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