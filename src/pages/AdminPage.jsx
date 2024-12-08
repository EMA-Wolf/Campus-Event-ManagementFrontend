import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import EventCards from '../components/EventCards'
import api from '../services/api'
import { Hourglass } from 'react-loader-spinner';
import { verifyToken } from '../services/api'
const AdminPage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        verifyToken();
        getAllEvents();
    }, []);

    const [isLoading, setIsLoading] = useState(true);

    const getAllEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/api/events/allevents");
            setEvents(response.data.events);
        } catch (error) {
            console.error("Error fetching all events:", error);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <div>
            <NavBar />
            <main className='h-screen bg-black'>
                <section className='border-b-2 bg-black flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-white font-bold'>Upcoming Prefered Event</h1>
                    <div className='grid grid-cols-3 gap-5"'>
                        {
                            isLoading ? <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#306cce', '#72a1ed']}
                            /> : events.length === 0 ? <p className='text-center uppercase font-bold text-white text-2xl'>No events found.</p> : events
                                .filter(event => new Date(event.event_date) >= new Date())
                                .map((event, index) => (
                                    <EventCards key={index} event={event} />
                                ))
                        }
                    </div>
                </section>

                <section className='bg-black flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-white font-bold'>All Event</h1>
                    <div className='grid grid-cols-3 gap-5"'>
                        {
                            events.length === 0 ? <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#306cce', '#72a1ed']}
                            /> : events
                                .map((event, index) => (
                                    <EventCards key={index} event={event} />
                                ))
                        }
                    </div>
                </section>
            </main>
        </div>
    )
}

export default AdminPage
