import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../services/api';

const UserRsvpEventCards = ({event, onClick}) => {
  // const navigate  = useNavigate()
  const handleRsvp = async () => {
    localStorage.setItem("Event", JSON.stringify(event))
    onClick()
  }

  return (
    <div className="p-4 shadow mr-4 mt-4 flex flex-col gap-3" style={{backgroundColor:"rgba(23, 26, 31, 1)"}}>
    <h3 className="text-white text-4xl font-bold">{event.name}</h3>
    <p className='text-white'>{event.description}</p>
    <p className='text-white'>Date: {new Date(event.event_date).toLocaleDateString().split("T")[0]}</p>
    <p className='text-white'>Location: {event.location}</p>
    <p className='text-white'>Available Seats: {event.available_seats}</p>
    <button onClick={handleRsvp} className="bg-transparent text-red-600 px-4 py-2 mt-2 rounded-md border border-red-600 hover:bg-red-600 hover:text-white">Cancel RSVP</button>
  </div>
  )
}

export default UserRsvpEventCards
