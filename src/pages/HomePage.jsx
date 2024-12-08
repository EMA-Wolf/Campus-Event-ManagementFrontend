import React from 'react'
import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import EventCards from '../components/EventCards'
import { Link, useNavigate } from 'react-router-dom'
import Banner from '../components/Banner'
import api, { verifyToken } from '../services/api'
import { Hourglass } from 'react-loader-spinner'

const HomePage = () => {

    useEffect(() => {
        verifyToken();
        getAllEvents();
    }, []);

    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    const onClick = () => {
         navigate("/login")
    }

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

            {/* <header className='flex flex-col gap-3 justify-center items-center w-full' style={{
                backgroundImage: "url('Banner.png')",
                backgroundSize: "cover", // Ensures the image covers the entire header
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat",
                height: "70vh" // Sets the height of the header to 50% of the viewport height
            }}>
                <h1 className='text-6xl font-bold text-white uppercase'>Manage Your Campus Events</h1>
                <p className='text-3xl text-white'>Streamline event planning and coordination with ease.</p>
                <Link className='px-4 py-4 text-white bg-cyan-300' to='/login'>Login/Sign up</Link>
            </header> */}
            <Banner
                title="Manage Your Campus Events"
                subtitle="Streamline event planning and coordination with ease."
                linkText="Login/Sign up"
                onClick={onClick}
                backgroundImage="Banner.png"
            />

            <main>

                <section className='bg-black flex flex-col justify-center px-10 py-10'>
                    <h1 className=" font-bold text-white text-4xl mt-2 mb-4 text-center">Streamline event planning and coordination with ease.</h1>
                    <div className='grid grid-cols-2 gap-5"'>
                    {
                        isLoading ? <div className='flex justify-center items-center w-full h-full mt-5'> <Hourglass
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="hourglass-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                                colors={['#306cce', '#72a1ed']}
                            /></div> : events.length === 0 ? <p className=' text-center uppercase font-bold text-white text-2xl'>No events found.</p> : events
                                .map((event, index) => (
                                    <EventCards key={index} event={event} />
                                ))
                        }
                    </div>
                </section>

                <section className='flex jusify-center items-center flex-col gap-4 px-5 py-36' style={{ backgroundColor: "rgba(29, 33, 40, 1)" }}>
                    <h1 className="font-bold text-white text-5xl text-center">Join the Hub Today!</h1>
                    <p className='text-xl text-center text-white'>Unlock exclusive access to campus events and streamline your event management experience. Be part of our vibrant community!</p>
                    <Link className='px-4 py-4 text-white bg-cyan-300' to='/login'>Login/Sign up</Link>
                </section>

            </main>

            <Footer />
        </div>
    )
}

export default HomePage
