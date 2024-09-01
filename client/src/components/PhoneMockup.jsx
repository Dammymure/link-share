import React, { useEffect, useState } from 'react';
import Mock from '../images/mockup.svg';
import axios from 'axios';

function PhoneMockup() {
  const [links, setLinks] = useState([]);
  const [copySuccess, setCopySuccess] = useState(''); // State to manage the copy success message


  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://link-share-l6eq.onrender.com/profile/getlinks', {
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

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
        .then(() => {
            setCopySuccess('Link copied to clipboard!');
            setTimeout(() => setCopySuccess(''), 2000); // Hide the message after 2 seconds
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        });
};
  

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
            className='flex items-center justify-between w-48 h-9 rounded-md mb-4 px-3 cursor-pointer'
            style={{
              backgroundColor: link.platform.value === 'git' ? '#1A1A1A' : // GitHub Black
                              link.platform.value === 'youtube' ? '#EE3939' : // YouTube Red
                              link.platform.value === 'linkedin' ? '#0077B5' : // LinkedIn Blue
                              '#000000', // Default Black
              color: '#FFFFFF'
            }}
            onClick={() => copyToClipboard(link.url)}
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
    {copySuccess && (
                <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md'>
                    {copySuccess}
                </div>
            )}
  </div>
);

}

export default PhoneMockup;
