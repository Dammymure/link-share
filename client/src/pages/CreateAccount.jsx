import React, { useState } from 'react';
import Icon from '../images/icons/icon.png';
import Email from '../images/icons/email.png';
import Pad from '../images/icons/pad.png';
import { useNavigate } from "react-router-dom";

function CreateAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');

      return;
    }

    try {
      const response = await fetch('https://link-share-l6eq.onrender.com/auth/creataccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to login or home page on success
        navigate('/');
        prompt("Successful")
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
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
            <h1 className='font-semibold text-2xl'>Create Account</h1>
            <p className='text-gray py-3'>Let’s get you started sharing your links!</p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className="block pb-5">
                <span className="block text-sm font-normal py-1 text-dark">Email address</span>
                <div className='flex flex-col relative w-96'>
                  <img className='absolute w-4 top-4 left-4' src={Email} alt="" />
                  <input 
                    type="email" 
                    placeholder='e.g. alex@email.com' 
                    className="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                    disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                    invalid:border-danger invalid:text-danger
                    focus:invalid:border-danger focus:invalid:ring-danger"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Invalid email address.
                  </p>
                </div>
              </label>

              <label className="block pb-5">
                <span className="block text-sm font-normal py-1 text-dark">Create password</span>
                <div className='flex flex-col relative'>
                  <img className='absolute w-3 top-[14px] left-4' src={Pad} alt="" />
                  <input 
                    type="password" 
                    minLength="8" 
                    maxLength="16" 
                    placeholder='At least 8 characters' 
                    className="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                    disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                    invalid:border-danger invalid:text-danger
                    focus:invalid:border-danger focus:invalid:ring-danger"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Please check again
                  </p>
                </div>
              </label>

              <label className="block">
                <span className="block text-sm font-normal py-1 text-dark">Confirm password</span>
                <div className='flex flex-col relative'>
                  <img className='absolute w-3 top-[14px] left-4' src={Pad} alt="" />
                  <input 
                    type="password" 
                    minLength="8" 
                    maxLength="16" 
                    placeholder='At least 8 characters' 
                    className="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                    disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                    invalid:border-danger invalid:text-danger
                    focus:invalid:border-danger focus:invalid:ring-danger"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Please check again
                  </p>
                </div>
              </label>
            </div>

            {error && <p className='text-danger text-xs text-center'>{error}</p>}

            <button type="submit" className='bg-primary flex w-full justify-center py-3 rounded-md my-5 text-white'>
              Create Account
            </button>
            <p className='text-center cursor-pointer' onClick={() => navigate('/login')}>
              Already have an account? <span className='text-primary'>Login</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateAccount;
