import React, { useState } from 'react';
import Icon from '../images/icons/icon.png';
import Email from '../images/icons/email.png';
import Pad from '../images/icons/pad.png';
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/auth/loginuser', {  // Update with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to the dashboard or another page
        prompt('Successfull')
        navigate('/home');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <section>
      <div className='px-2 md:px-0 grid justify-center items-center align-middle content-center self-center middle my-auto h-screen bg-gray-lighter'>
        <div className='flex mx-auto items-center gap-1 pb-10'>
          <img src={Icon} alt="" />
          <h1 className='font-semibold text-2xl'>devlinks</h1>
        </div>

        <div className='bg-white rounded-md px-8 py-10'>
          <div className=''>
            <h1 className='font-semibold text-2xl'>Login</h1>
            <p className='text-gray py-3'>Add your details below to get back into the app</p>
          </div>
          <form onSubmit={handleLogin}>
            <div>
              <label className="block pb-5">
                <span className="block text-sm font-normal py-1 text-dark">Email address</span>
                <div className='flex flex-col relative w-96'>
                  <img className='absolute w-4 top-4 left-4' src={Email} alt="" />
                  <input 
                    type="email" 
                    placeholder='e.g. alex@email.com' 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                      disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                      invalid:border-danger invalid:text-danger
                      focus:invalid:border-danger focus:invalid:ring-danger"
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Invalid email address.
                  </p>
                </div>
              </label>
              <label className="block">
                <span className="block text-sm font-normal py-1 text-dark">Password</span>
                <div className='flex flex-col relative'>
                  <img className='absolute w-3 top-[14px] left-4' src={Pad} alt="" />
                  <input 
                    type="password" 
                    placeholder='Enter your password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                      focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                      disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                      invalid:border-danger invalid:text-danger
                      focus:invalid:border-danger focus:invalid:ring-danger"
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Please check again
                  </p>
                </div>
              </label>
            </div>
            {error && <p className='text-danger text-sm'>{error}</p>}
            <button 
              type="submit"
              className='bg-primary flex w-full justify-center py-3 rounded-md my-5 text-white'
            >
              Login
            </button>
            <p className='text-center cursor-pointer' onClick={() => navigate('/create-account')}>
              Don’t have an account? <span className='text-primary'>Create account</span> 
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
