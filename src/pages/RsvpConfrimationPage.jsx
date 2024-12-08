import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Banner from '../components/Banner'
import { MdDateRange } from "react-icons/md";
import { CiClock2 } from "react-icons/ci";
import { CiLocationOn } from "react-icons/ci";
import api from '../services/api';
import { verifyToken } from '../services/api';
import { Hourglass } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const RsvpConfrimationPage = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    verifyToken();
    setEventDetails(JSON.parse(localStorage.getItem("Event")))
    setUserDetails(JSON.parse(localStorage.getItem("User")))
  },[])

  const [eventDetails, setEventDetails] = useState({})
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [userDetails, setUserDetails] = useState({})

  const onClick = () => {
    const upcomingSection = document.getElementById('event-details-section');
    if (upcomingSection) {
        upcomingSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const handleConfirm = async ()=>{
    setIsConfirmed(true);
  try{
    const response = await api.post(`/api/events/rsvp/confirm`, {
      event_id: eventDetails.id,
      user_id: userDetails.id,
    })
    setIsConfirmed(false);
    toast.success(response.data.message)
  }catch(error){
    setIsConfirmed(false);
    if(error.response.data.error === "Event is already full"){
      toast.error("Event is already full")
    }else if(error.response.data.error === "User has already RSVP'd for this event"){
      toast.error("User has already RSVP'd for this event")
    }else{
      toast.error("Error confirming RSVP")
    }
    console.log(error)
  }
  }
  // console.log(eventDetails)
  // console.log(userDetails)
  return (
    <div>
      <NavBar/>
      <Banner
       title="Thank You for Your RSVP!"
       subtitle={`We're excited to see you at the ${eventDetails.name} on ${new Date(eventDetails.event_date).toLocaleDateString().split("T")[0]}!`}
       linkText="View Event Details"
       onClick={onClick}
       backgroundImage="image.png"
      />
      <main>
      <section id="event-details-section" className='border-b-2 bg-black flex flex-col justify-center px-10 py-10'>
            <h1 className=" font-bold text-white text-5xl mt-2 mb-4 ">Event Details</h1>
            <div className='flex flex-col gap-3'>
                  <p className="text-white text-2xl mb-2 flex items-center gap-2"><MdDateRange />Date: {new Date(eventDetails.event_date).toLocaleDateString().split("T")[0]}</p>
                <p className="text-white text-2xl mb-2 flex items-center gap-2"><CiClock2 />Time: {eventDetails.event_time}</p>
                <p className="text-white text-2xl mb-2 flex items-center gap-2"><CiLocationOn />Address: {eventDetails.location}</p>
            </div>

            <div className='flex justify-end gap-3'>
              <button onClick={()=>navigate("/home")} className='bg-transparent text-cyan-300 px-4 py-2 mt-2 rounded-md border border-sky-300 hover:bg-cyan-300 hover:text-white'>Back to Dashboard</button>
              <button disabled={isConfirmed} onClick={handleConfirm} className='bg-transparent text-cyan-300 px-4 py-2 mt-2 rounded-md border border-sky-300 hover:bg-cyan-300 hover:text-white'>{isConfirmed ? <Hourglass
                                visible={true}
                                height="25"
                                width="25"
                                ariaLabel="hourglass-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                                colors={['#306cce', '#72a1ed']} /> : "Confirm RSVP"}</button>
            </div>
        </section>
      </main>
    </div>
  )
}

export default RsvpConfrimationPage
