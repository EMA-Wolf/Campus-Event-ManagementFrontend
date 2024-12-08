import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import CreateEventForm from '../components/CreateEventForm'
import Footer from '../components/Footer'
import { verifyToken } from '../services/api'
const CreateEventPage = () => {
  useEffect(() => {
    verifyToken();
  }, []);
  return (
    <div>
      <NavBar />

      <main className='h-screen w-full bg-black'>
        <CreateEventForm />
      </main>

      <Footer />
    </div>
  )
}

export default CreateEventPage
