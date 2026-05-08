import React, { useState } from 'react';
import { useAllEvents } from '@/hooks/useReactQuery';
import { useNavigate } from 'react-router-dom';
import { Calendar1Icon } from 'lucide-react';
import { Location01Icon } from 'hugeicons-react';


function Events() {
  const { data: events, isLoading, isError } = useAllEvents();
  // console.log(events);

  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-500 font-semibold text-lg">Failed to load events. Please try again later.</div>
      </div>
    );
  }

  // Fallback data if events array is empty or undefined
  const eventList = events && events.data.length > 0 ? events.data : [];


  return (
    <div className="min-h-screen  bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className='w-full h-36'></div>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 tracking-tight">
            Upcoming Events
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Discover and register for the latest events, workshops, and activities.
          </p>
        </div>

        {eventList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            <h3 className="text-xl font-medium text-gray-900">No events currently available</h3>
            <p className="mt-2 text-gray-500">Check back later for new updates.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventList.map((event, index) => (
              <div key={event._id || event.id || index} className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col transform hover:-translate-y-1">
                {event.image ? (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.eventName || event.title || 'Event image'}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 m-3 rounded-full shadow-sm">
                      Upcoming
                    </div>
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center relative">
                    <Calendar1Icon className="w-12 h-12 text-indigo-300" />
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 m-3 rounded-full shadow-sm">
                      Upcoming
                    </div>
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
                      {event.eventName || event.title || event.name}
                    </h3>
                  </div>

                  {event.eventProgram && (
                    <div className="text-base  mb-6 tracking-wider">
                      {event.eventProgram}
                    </div>
                  )}

                  <div className="space-y-2 mb-4 text-sm text-gray-600 flex-grow">
                    {event.date && (
                      <div className="flex items-center gap-2">
                        <Calendar1Icon size={20} className='shrink-0' />
                        {new Date(event.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        {event.time?.from && ` at ${event.time.from}`}
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <Location01Icon size={20} className='shrink-0' />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>

                  {/* <div className="flex items-center justify-between mt-auto mb-6">
                    <span className="text-gray-900 font-bold text-lg">
                      {event.fee > 0 ? `₹${event.fee}` : 'Free'}
                    </span>
                    {event.participantType && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-md capitalize font-medium border border-gray-200">
                        {event.participantType}
                      </span>
                    )}
                  </div> */}

                  <button
                    onClick={() => navigate(`/events/${event._id}`)}
                    className="mt-5 w-full border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 focus:ring-4 focus:ring-indigo-100 flex justify-center items-center group"
                  >
                    View Details & Register
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;