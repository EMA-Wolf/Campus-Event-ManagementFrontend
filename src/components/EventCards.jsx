import React from 'react'
import { useNavigate } from 'react-router-dom'

const EventCards = ({event}) => {

  const navigate  = useNavigate()

  const handleRsvp = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("User");

    if (!token || !user) {
      localStorage.setItem("Event", JSON.stringify(event));
      navigate("/login");
    } else {
      localStorage.setItem("Event", JSON.stringify(event));
      navigate("/rsvpconfirm");
    }
  }

  return (
    <div className="p-4 shadow mr-4 mt-4 flex flex-col gap-3" style={{backgroundColor:"rgba(23, 26, 31, 1)"}}>
    <h3 className="text-white text-4xl font-bold">{event.name}</h3>
    <p className='text-white'>{event.description}</p>
    <p className='text-white'>Date: {new Date(event.event_date).toLocaleDateString().split("T")[0]}</p>
    <p className='text-white'>Location: {event.location}</p>
    <p className='text-white'>Available Seats: {event.available_seats}</p>
    <p className='text-white'>Type: {event.type}</p>
    <button disabled={event.available_seats === 0} onClick={handleRsvp} className="bg-transparent text-cyan-300 px-4 py-2 mt-2 rounded-md border border-sky-300 hover:bg-cyan-300 hover:text-white">{event.available_seats === 0 ? "No Seats Available" : "RSVP"}</button>
  </div>
  )
}

export default EventCards
