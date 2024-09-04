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
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/api/events', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);
  console.log({ events });
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <main className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Events list</h1>
      <Link href="/admin" className="text-blue-600 hover:text-blue-800">
        Create New Event
      </Link>
      <input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="grid gap-4">
        {filteredEvents.map((event) => (
          <div key={event.id} className="border p-4 rounded">
            <Link
              href={`/admin/event/${event.id}`}
              className="text-blue-600 hover:text-blue-800"
            >
              Edit/Delete
            </Link>
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p>Date: {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
