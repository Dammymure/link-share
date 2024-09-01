import React, { useEffect, useState } from 'react';
import GithubIcon from '../images/icons/iconwhite/git.svg';
import ArrowIcon from '../images/icons/iconwhite/arrow.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Preview() {
    const [userData, setUserData] = useState(null);
    const [copySuccess, setCopySuccess] = useState(''); // State to manage the copy success message
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from local storage
                const response = await axios.get('https://link-share-l6eq.onrender.com/profile/user', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                    },
                });
                console.log(response);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
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

    if (!userData) {
        return <p>Loading...</p>;
    }

    return (
        <div className='bg-gray-lighter h-screen'>
            <div className='bg-primary pt-10 pb-56 px-10 rounded-b-3xl relative'>
                <div className='flex justify-between py-5 px-8 bg-white rounded-lg z-0 relative'>
                    <button
                        className='text-primary border-[1px] hover:bg-primary hover:text-white px-4 py-2 rounded-md font-semibold border-primary'
                        onClick={() => navigate('/home')}
                    >
                        Back to Editor
                    </button>
                    <button className='bg-primary text-white py-2 px-4 rounded-md'>Share Link</button>
                </div>

                <div className='absolute bg-white drop-shadow-xl top-1/2 left-1/2 transform -translate-x-1/2 translate-y-5 p-14 z-50'>
                    <div className='flex flex-col items-center pb-12'>
                        <img
                            className='w-24 h-24 rounded-full bg-danger object-cover'
                            src={userData.picture ? `/uploads/${userData.picture}` : GithubIcon}
                            alt="User Profile"
                        />
                        <h2 className='text-3xl font-semibold'>{userData.firstname} {userData.lastname}</h2>
                        <p className='text-base text-gray'>{userData.email}</p>
                    </div>

                    <div className='flex flex-col gap-4'>
                        {userData.links.map((link, index) => (
                            <div
                                key={index}
                                onClick={() => copyToClipboard(link.url)} // Copy URL to clipboard on click
                                style={{
                                    backgroundColor: link.platform.value === 'git' ? '#1A1A1A' : // GitHub Black
                                                    link.platform.value === 'youtube' ? '#EE3939' : // YouTube Red
                                                    link.platform.value === 'linkedin' ? '#0077B5' : // LinkedIn Blue
                                                    '#000000', // Default Black
                                    color: '#FFFFFF',
                                    cursor: 'pointer'
                                }}
                                className='flex items-center justify-between py-3 px-2 rounded-md'
                            >
                                <div className='flex text-white items-center gap-1'>
                                    <img className='w-3 h-3' src={require(`../images/icons/iconwhite/${link.platform.icon}`)} alt={link.platform.label} />
                                    <p className='text-sm font-extralight'>{link.platform.label}</p>
                                </div>
                                <div>
                                    <img src={ArrowIcon} alt="Arrow" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {copySuccess && (
                <div className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-md'>
                    {copySuccess}
                </div>
            )}
        </div>
    );
}

export default Preview;
