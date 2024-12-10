import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineAttachEmail } from "react-icons/md";
import { IoEnterOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { logout } from '../services/api';

const NavBar = () => {
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("User")))
    }, [])
    // const [test, setTest] = useState(true)
    const [user, setUser] = useState({})
    return (
        <nav className='bg-black text-white flex justify-between p-4'>
            <div className='flex gap-2 items-center'>
                <MdDateRange />
                <h1 className="text-xl font-bold">Campus Event Management Hub</h1>
            </div>

            {
                user ? 
                <div className='flex items-center'>
                    {
                        user.role === "admin" ? <Link className="mx-2" to="/admin">Dashboard</Link> : <></>
                    }
                    {
                        user.role === "admin" ? <Link className="mx-2" to="/createevent">Create Event</Link> : <Link className="mx-2" to="/home">Dashboard</Link>
                    }
                    {
                        user.role === "user" ? <Link className="mx-2" to="/myevents">My Events</Link> : <></>
                    }{
                        user.role === "user" ? <Link className="mx-2" to="/calendar">Calendar</Link> : <></>
                    }
                    {
                        user?<button onClick={logout}>Logout</button>:<></>
                    }
                </div> :
                    <></>
            }


            <div className='flex gap-3'>
                {
                    user ?
                        <>
                            <img className='rounded-full size-9' src="ProfilePic.png" alt="profilePicture" />
                        </>
                        : <>
                            <Link className="px-7 py-1.5 text-white bg-cyan-300 rounded-md flex items-center justify-center gap-2" to='/signup'><MdOutlineAttachEmail />Sign Up</Link>
                            <Link className="px-7 py-1.5 text-cyan-300 bg-white rounded-md flex items-center justify-center gap-2" to='/login'><IoEnterOutline />Log In</Link>
                        </>

                }

                {/* <Link className="px-7 py-1.5 text-cyan-300 bg-white rounded-md flex items-center justify-center gap-2" to='/signup'><MdOutlineAttachEmail />Sign Up</Link>
        <Link className="px-7 py-1.5 text-white bg-cyan-300 rounded-md flex items-center justify-center gap-2" to='/login'><IoEnterOutline />Log In</Link> */}
            </div>
        </nav>
    )
}

export default NavBar
