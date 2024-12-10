import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Hourglass } from 'react-loader-spinner';
import api, { verifyToken } from '../services/api';
import UserRsvpEventCards from '../components/UserRsvpEventCards';
import CancelDialoguebox from '../components/CancelDialoguebox';
import { toast } from 'react-toastify';

const UserEventsPage = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [cancelDialogue, setCancelDialogue] = useState(false);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        verifyToken();
        const storedUser = JSON.parse(localStorage.getItem("User"));
        if (storedUser) {
            setUser(storedUser); // This will update the state
        }
    }, []); // Only runs once on component mount

    useEffect(() => {
        if (user?.id) { // Wait until user is properly set
            getUserEvents();
        }
    }, [user]); // Runs when the `user` state changes

    const getUserEvents = async () => {
        try {
            setIsLoading(true);
            const response = await api.get(`/api/events/user/events/${user.id}`);
            setEvents(response.data.events); // Use response.data.events if the backend returns `events` inside the response object
        } catch (error) {
            console.error("Error fetching user events:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = async () => {
        const event = JSON.parse(localStorage.getItem("Event"))
        setIsDeleted(true);
        try {
            const response = await api.delete(`/api/events/rsvp/cancel/${event.event_id}`)
            toast.success(response.data.message);
            setCancelDialogue(false);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.error("Error cancelling RSVP:", error);
        } finally {
            setIsDeleted(false);
        }

    }

    const handleClose = () => {
        setCancelDialogue(false)
    }

    return (
        <div>
            <NavBar />
            <main className='h-screen bg-black px-10'>
                <h1 className='text-4xl text-white font-bold'>My Events</h1>
                <div className='grid grid-cols-3 gap-5 items-center'>
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
                        events.map((event, index) => (
                            <UserRsvpEventCards key={index} event={event} onClick={() => {
                                setCancelDialogue(true)
                            }} />
                        ))
                    )}
                </div>
                {cancelDialogue && <CancelDialoguebox onClick={handleCancel} onClose={handleClose} isDeleted={isDeleted} />}
            </main>

        </div>
    );
};

export default UserEventsPage;
