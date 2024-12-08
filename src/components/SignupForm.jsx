import React from 'react'
import { useState } from 'react';
import { CiMail } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { IoPersonOutline } from "react-icons/io5";
import { MdDateRange } from "react-icons/md";
import { signup } from '../services/api';
import Select from 'react-select'
import { Hourglass } from 'react-loader-spinner';
const SignupForm = () => {
    const options = [
        { value: 'Workshops', label: 'Workshops' },
        { value: 'Seminars', label: 'Seminars' },
        { value: 'Club activities', label: 'Club Activities' },
    ]

    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        eventPreferences: []
    })
    const [isLoading, setIsLoading] = useState(false);

    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "rgba(50, 56, 66, 1)",
            borderColor: "transparent",
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
                borderColor: "transparent",
            },
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "rgba(50, 56, 66, 1)",
            color: "#fff",
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? "rgba(0, 204, 255, 0.2)" : "rgba(50, 56, 66, 1)",
            color: state.isFocused ? "#fff" : "#ccc",
            "&:active": {
                backgroundColor: "rgba(0, 204, 255, 0.4)",
            },
        }),
        singleValue: (base) => ({
            ...base,
            color: "#fff",
        }),
        multiValue: (base) => ({
            ...base,
            backgroundColor: "rgba(0, 204, 255, 0.3)",
        }),
        multiValueLabel: (base) => ({
            ...base,
            color: "#fff",
        }),
        multiValueRemove: (base) => ({
            ...base,
            color: "#fff",
            "&:hover": {
                backgroundColor: "rgba(0, 204, 255, 0.5)",
                color: "#000",
            },
        }),
    };

    const handlePreferencesChange = (selectedOptions) => {
        // Map selected options to their values
        const preferences = selectedOptions.map(option => option.value);
        setUserDetails({ ...userDetails, eventPreferences: preferences });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (userDetails.password !== userDetails.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const finalUserDetails = {
            name: userDetails.name,
            email: userDetails.email,
            password: userDetails.password,
            role: "user",
            preferences: userDetails.eventPreferences
        }

        // console.log(finalUserDetails);
        try {
            setIsLoading(true);
            await signup(finalUserDetails)
            setIsLoading(false);
        } catch (error) {
            // console.error('Signup failed:', error.response ? error.response.data : error.message);
            console.log('Signup failed:', error)
            setIsLoading(false);
            setUserDetails({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                eventPreferences: []
            })
        }
    }

    return (
        <div className='w-screen h-screen flex justify-center' style={{
            backgroundImage: "url(forest.png)",
            backgroundSize: "fit", // Ensures the image covers the entire header
            backgroundPosition: "center", // Centers the image
            backgroundRepeat: "no-repeat",
        }}>

            <div className='bg-black w-4/12 flex flex-col items-center gap-3 pt-10'>
                <h1 className='text-white text-3xl'>Create Account</h1>
                <p className='text-white'>Join us to stay updated on all campus events!</p>

                <form onSubmit={handleSignup} className='text-white flex flex-col gap-5 w-full p-6'>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="username"><IoPersonOutline /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, name: e.target.value })} className='bg-transparent border-slate-900 w-full p-2' type="text" id="username" name="username" value={userDetails.name} placeholder='Enter a username' required />
                    </div>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="username"><CiMail /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} className='bg-transparent border-slate-900 w-full p-2' type="email" id="email" name="email" value={userDetails.email} placeholder='Enter an email' required />
                    </div>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="password"><GiPadlock /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} className='bg-transparent border-slate-900 w-full p-2' type="password" id="password" name="password" value={userDetails.password} placeholder='Enter your password' required />
                    </div>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="confirmPassword"><GiPadlock /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, confirmPassword: e.target.value })} className='bg-transparent border-slate-900 w-full p-2' type="password" id="confirmPassword" name="confirmPassword" value={userDetails.confirmPassword} placeholder='Enter your password again' required />
                    </div>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="confirmPassword"><MdDateRange /></label>
                        {/* <input onChange={e=> setUserDetails({...userDetails,eventPreferences:e.target.value})} className='bg-transparent border-slate-900 w-full p-2' type="text" id="eventPreferences" name="eventPreferences" placeholder='Your Event Preferences' required /> */}
                        <Select
                            isMulti
                            name="colors"
                            options={options}
                            onChange={handlePreferencesChange}
                            className='bg-transparent border-slate-900 w-full p-2'
                            styles={customStyles}
                            classNamePrefix="select"
                        />
                    </div>

                    <button type='submit' className='px-4 py-3 text-white bg-cyan-300 rounded-md flex justify-center'>{isLoading ? <Hourglass
                        visible={true}
                        height="32"
                        width="32"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    /> : "Sign Up"}</button>
                    <p className='text-center'>Already registered?<Link className='text-cyan-300' to='/login'> Login</Link></p>
                </form>
            </div>

        </div>
    )
}

export default SignupForm
