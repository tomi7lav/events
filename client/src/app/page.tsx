'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Event {
  id: number;
  name: string;
  date: string;
  description: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  console.log(events);

  useEffect(() => {
    fetch('/api/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <main className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Events list</h1>
      <Link href="/admin" className="text-blue-600 hover:text-blue-800">
        Create New Event
      </Link>
      <div className="grid gap-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
