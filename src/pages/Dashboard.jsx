import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import EventCards from '../components/EventCards'
// import { useNavigate } from 'react-router-dom'
import { Hourglass } from 'react-loader-spinner';
import api from '../services/api'
import { verifyToken } from '../services/api'
const Dashboard = () => {
    // const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const onClick = () => {
        const upcomingSection = document.getElementById('upcoming-section');
        if (upcomingSection) {
            upcomingSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const [events, setEvents] = useState([]);

    useEffect(() => {
        verifyToken();
        getAllEvents();
        setUser(JSON.parse(localStorage.getItem("User")))
    }, []);

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
            <Banner
                title={`Welome ${user.name}`}
                subtitle="Empowering Your Campus Experience"
                linkText="Get Started"
                onClick={onClick}
                backgroundImage="DashboardBanner.png"
            />

            <main>
                <section id='upcoming-section' className='border-b-2 bg-black flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-white font-bold'>Upcoming Prefered Event</h1>
                    <div className='grid grid-cols-3 gap-5"'>
                    {isLoading ? (
                        <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            colors={['#306cce', '#72a1ed']}
                        />
                    ) : events.length === 0 ? (
                        <p className='text-white'>No events found.</p>
                    ) : (
                            events
                                .filter(event => user.preferences.includes(event.type))
                                .map((event, index) => (
                                    <EventCards key={index} event={event} />
                                ))
                        )}
                    </div>
                </section>

                <section className='bg-black flex flex-col justify-center px-10 py-10'>
                    <h1 className='text-4xl text-white font-bold'>All Events</h1>
                    <div className='grid grid-cols-3 gap-5"'>
                        {
                            isLoading ? <div className='flex justify-center mt-5'> <Hourglass
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#306cce', '#72a1ed']}
                            /></div> : events
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

export default Dashboard
