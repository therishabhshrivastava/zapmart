import React, { useState } from 'react';
import loginImg from '../../assets/loginimage.jpg'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../FirebaseAuth/FirebaseAuth';

const Login = () => {
    const navigateHome = useNavigate(); 

    const [userSignUp, setUserSignUP] = useState({email:"", password:""});

    const handleChange = (e) => {
        setUserSignUP({...userSignUp, [e.target.name]: e.target.value})
    }

    const handleLogin = (e) => {
        e.preventDefault();

        if (!userSignUp.email || !userSignUp.password) {
            return toast.error("All Fields are Required")
        } else {
            signInWithEmailAndPassword(auth, userSignUp.email, userSignUp.password)
                .then((res) => {
                    const user = res.user;
                    
                    navigateHome("/")
                })
                .catch((err) => toast.error(err.message))

        }
    }

  return (
    <>
        <div className='relative'>
            <div className='relative'>
                <img 
                    src={loginImg} 
                    alt=""
                    className="object-cover w-full object-center h-[500px] mt-5 mb-5" 
                />
                <div className='w-full h-[500px] bg-black absolute top-0 left-0 opacity-[.4]'></div>
            </div>

            <div className="container px-5 py-14 mx-auto flex absolute top-0" >
                <div className="mx-auto bg-red-500 rounded-lg p-8 flex flex-col mt-8 md:mt-0 shadow-md text-white">
                    <h2 className="text-white text-4xl mb-5 font-medium title-font">Login</h2>       

                    <div className="relative mb-4">
                        <label for="email" className="leading-7 text-sm ">Email</label>
                        <input autoComplete='off' type="email" id="email" value={userSignUp.email} onChange={handleChange} name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <div className="relative mb-4">
                        <label for="password" className="leading-7 text-sm">Password</label>
                        <input autoComplete='off' type="password" id="password" value={userSignUp.password} onChange={handleChange} name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>

                    <button  onClick={handleLogin} className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Login</button>
                    <p className='text-xs text-white mt-5'>
                        Don't have an account? 
                        <Link to='/signup'><button className='cursor-pointer hover:text-blue-300'>
                             &nbsp;SignUp
                        </button></Link> 
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Login

