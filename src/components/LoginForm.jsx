import React, { useState } from 'react'
import { CiMail } from "react-icons/ci";
import { GiPadlock } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import { toast } from 'react-toastify';
import { Hourglass } from 'react-loader-spinner';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: ''
    })
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            await login(userDetails)
            setIsLoading(false);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
            console.error('Login failed:', error);
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setIsLoading(false);
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
                <h1 className='text-white text-3xl'>Access Account</h1>
                <p className='text-white'>Access your account to manage events.</p>

                <form onSubmit={handleLogin} className='text-white flex flex-col gap-3 w-full p-6'>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="username"><CiMail /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, email: e.target.value })} className='bg-transparent w-full p-2' type="email" id="email" name="email" value={userDetails.email} placeholder='Enter an email' required />
                    </div>

                    <div className='flex items-center gap-2 p-2' style={{ backgroundColor: "rgba(50, 56, 66, 1)" }}>
                        <label htmlFor="password"><GiPadlock /></label>
                        <input onChange={e => setUserDetails({ ...userDetails, password: e.target.value })} className='bg-transparent w-full p-2' type="password" id="password" name="password" value={userDetails.password} placeholder='Enter your password' required />
                    </div>

                    <div className='flex justify-end'>
                        <Link to='/' className='text-cyan-300'>Forget your password?</Link>
                    </div>
                    <button type='submit' className='px-4 py-3 text-white bg-cyan-300 rounded-md flex justify-center'>{isLoading ? <Hourglass
                        visible={true}
                        height="32"
                        width="32"
                        ariaLabel="hourglass-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        colors={['#306cce', '#72a1ed']}
                    /> : "Login"}</button>
                    <p className='text-center'>Need to create an account?<Link className='text-cyan-300' to='/signup'> Signup</Link></p>
                </form>

                {/* <RotatingLines
                        visible={true}
                        height="46"
                        width="46"
                        color="white"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> */}
            </div>

         
        </div>
    )
}

export default LoginForm
