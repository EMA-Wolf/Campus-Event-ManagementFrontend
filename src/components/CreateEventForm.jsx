import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import api from '../services/api';
const CreateEventForm = () => {
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("User")));
        setToken(localStorage.getItem("token"));
    }, []);

  const [startDate, setStartDate] = useState(new Date());
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [event, setEvent] = useState({
    name: "",
    description: "",
    event_date: startDate.toISOString().split('T')[0],
    event_time: startDate.toISOString().split('T')[1].split('.')[0],
    capacity: 1,
    available_seats: 1,
    location: "",
    type: "",
    created_by:"",
  });

  const handleDateChange = (date) => {
    setStartDate(date);
    setEvent({
      ...event,
      event_date: date.toISOString().split('T')[0], // Update date in the event object
    });
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setEvent({
      ...event,
      event_time: time, // Update time in the event object
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    event.created_by = user.id;
    await api.post("/api/events/create", event,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(event); // Will now show the correct date and time from the form
  };

//   console.log(user.id);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-4xl text-white font-bold mb-4">Create Event</h1>

      <form
        className="flex gap-4 text-white w-10/12 border-2 border-white rounded-md p-4"
        onSubmit={handleSubmit}
      >
        <section className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="eventName">Event Name</label>
            <input
              className="bg-transparent border-2 border-white rounded-md p-3"
              type="text"
              id="eventName"
              placeholder="Event Name"
              value={event.name}
              onChange={(e) =>
                setEvent({ ...event, name: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventDescription">Event Description</label>
            <textarea
              className="bg-transparent border-2 border-white rounded-md p-3"
              id="eventDescription"
              placeholder="Event Description"
              value={event.description}
              onChange={(e) =>
                setEvent({ ...event, description: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventDate">Event Date</label>
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              className="bg-transparent w-full border-2 border-white rounded-md p-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventTime">Event Time</label>
            <input
              className="bg-transparent border-2 border-white rounded-md p-3"
              type="time"
              id="eventTime"
              value={event.event_time}
              onChange={handleTimeChange}
              required
            />
          </div>
        </section>

        <section className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="eventCapacity">Event Capacity</label>
            <input
              className="bg-transparent border-2 border-white rounded-md p-3"
              type="number"
              id="eventCapacity"
              placeholder="Event Capacity"
              value={event.capacity}
              onChange={(e) => {
                const capacity = e.target.value < 0 ? 1 : e.target.value;
                setEvent({
                  ...event,
                  capacity: capacity,
                  available_seats: capacity,
                });
              }}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventAvailableSeats">Event Available Seats</label>
            <input
              className="bg-transparent border-2 border-white rounded-md p-3"
              type="number"
              id="eventAvailableSeats"
              placeholder="Event Available Seats"
              value={event.available_seats}
              disabled
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventLocation">Event Location</label>
            <input
              className="bg-transparent border-2 border-white rounded-md p-3"
              type="text"
              id="eventLocation"
              placeholder="Event Location"
              value={event.location}
              onChange={(e) =>
                setEvent({ ...event, location: e.target.value })
              }
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="eventType">Event Type</label>
            <select
              className="bg-transparent border-2 border-white rounded-md p-3"
              id="eventType"
              value={event.type}
              onChange={(e) =>
                setEvent({ ...event, type: e.target.value })
              }
              required
            >
              <option value="">Select Event Type</option>
              <option value="Workshops">Workshops</option>
              <option value="Seminars">Seminars</option>
              <option value="Club activities">Club activities</option>
            </select>
          </div>

          <div className="w-full flex justify-end mt-4">
            <button
              className="bg-cyan-500 text-white px-2 py-3 rounded-md"
              type="submit"
            >
              Create Event
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};

export default CreateEventForm;
