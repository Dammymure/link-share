import React, { useEffect, useState } from 'react';
import Mock from '../images/mockup.svg';
import axios from 'axios';

function PhoneMockup() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/profile/getlinks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        // Accessing the correct path to links
        setLinks(response.data.links);
      } catch (error) {
        console.error('Error fetching links:', error);
      }
    };
  
    fetchLinks();
  }, []);
  

return (
  <div className='relative md:flex hidden mx-auto bg-white justify-center items-center w-[45%] mt-5 p-8'>
    <img className='max-h-[32rem]' src={Mock} alt="Phone Mockup" />

    <div className="absolute top-[15rem]">
      {links.length === 0 ? (
        <p>No links available</p>
      ) : (
        links.map((link, index) => (
          <div
            key={index}
            className='flex items-center justify-between w-48 h-9 rounded-md mb-4 px-3'
            style={{
              backgroundColor: link.platform.value === 'git' ? '#1A1A1A' : // GitHub Black
                              link.platform.value === 'youtube' ? '#EE3939' : // YouTube Red
                              link.platform.value === 'linkedin' ? '#0077B5' : // LinkedIn Blue
                              '#000000', // Default Black
              color: '#FFFFFF'
            }}
          >
            <div className='flex items-center gap-2'>
              <img className='w-4' src={require(`../images/icons/iconwhite/${link.platform.icon}`)} alt={`${link.platform.label} icon`} />
              <span>{link.platform.label}</span>
            </div>
            <a href={link.url} target='_blank' rel='noopener noreferrer' className='text-white'>
              <svg
                className='w-4 h-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                ></path>
              </svg>
            </a>
          </div>
        ))
      )}
    </div>
  </div>
);

}

export default PhoneMockup;
