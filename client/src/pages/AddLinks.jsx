import React, { useState } from 'react';
import Navbar from '../components/Home';
import Hand from '../images/hand.svg';
import Link from '../images/icons/link2.svg';
import SelectLink from '../components/SelectLink';
import PhoneMockup from '../components/PhoneMockup';

function AddLinks() {
  const options = [
    { value: 'git', label: 'GitHub', icon: 'git.svg' },
    { value: 'youtube', label: 'Youtube', icon: 'youtube.svg' },
    { value: 'linkedin', label: 'LinkedIn', icon: 'linkedin.svg' },
    { value: 'facebook', label: 'Facebook', icon: 'facebook.svg' },
    { value: 'frontendmentor', label: 'Frontend Mentor', icon: 'frontendmentor.svg' },
    { value: 'hashnode', label: 'Hashnode', icon: 'hashnode.svg' },
  ];


  const [links, setLinks] = useState([
    { platform: options[0], url: '' }
  ]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const addNewLink = () => {
    setLinks([...links, { platform: options[0], url: '' }]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleOptionClick = (index, option) => {
    const updatedLinks = [...links];
    updatedLinks[index].platform = option;
    setLinks(updatedLinks);
  };

  const handleUrlChange = (index, url) => {
    const updatedLinks = [...links];
    updatedLinks[index].url = url;
    setLinks(updatedLinks);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You are not logged in');
        return;
      }

      const response = await fetch('https://link-share-l6eq.onrender.com/profile/addlinks', {  // Update with your actual API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(links),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Links saved successfully!');
        setError('');
      } else {
        setError(data.message || 'Failed to save links');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <section className=''>
      <div className='flex mx-auto justify-center bg-gray-lighter gap-x-5'>
        <PhoneMockup/>

        <div className='w-full md:w-[55%] bg-white mt-5 p-8'>
          <h1 className='font-semibold text-2xl'>Customize your links</h1>
          <p className='text-gray py-3'>Add/edit/remove links below and then share all your profiles with the world!</p>

          <div className='flex w-full pb-5'>
            <button
              className='border-[1px] border-primary text-primary hover:bg-primary hover:text-white w-full rounded-md py-2'
              onClick={addNewLink}
            >
              + Add new link
            </button>
          </div>

          <div className='max-h-[370px] overflow-y-auto'>
            {links.length === 0 && (
              <div className='text-center flex flex-col justify-center items-center my-auto py-20 content-center'>
                <img className='w-40' src={Hand} alt="" />
                <h2 className='font-semibold text-xl py-3'>Let's get you started</h2>
                <p className='text-xs w-80'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!</p>
              </div>
            )}

            {links.map((link, index) => (
              <div key={index} className='bg-gray-lighter p-3 mb-4'>
                <div className='flex justify-between text-sm pb-2'>
                  <p className='text-gray font-semibold'>
                    <span className='text-gray font-semibold'>=</span> Link #{index + 1}
                  </p>
                  <button
                    className='text-gray hover:text-danger'
                    onClick={() => removeLink(index)}
                  >
                    Remove
                  </button>
                </div>

                <div className="relative w-full">
                  <p className='text-xs text-gray'>Platform</p>
                  <button
                    onClick={() => setLinks([...links.slice(0, index), { ...link, isOpen: !link.isOpen }, ...links.slice(index + 1)])}
                    className="w-full p-3 border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                            focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary 
                            bg-white text-dark flex justify-between items-center"
                  >
                    <div className='flex gap-3'>
                      <img className='w-3' src={require(`../images/icons/${link.platform.icon}`)} alt="" />
                      <p>{link.platform.label}</p>
                    </div>
                    <svg
                      className={`w-4 h-4 transition-transform transform ${link.isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {link.isOpen && (
                    <div className="absolute mt-1 w-full bg-white border border-gray-light rounded-md shadow-lg z-10 divide-y-[1px] divide-gray-light">
                      {options.map((option) => (
                        <div
                          key={option.value}
                          onClick={() => handleOptionClick(index, option)}
                          className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer text-dark gap-3 hover:bg-tertiary hover:text-primary"
                        >
                          <img className='w-3' src={require(`../images/icons/${option.icon}`)} alt="" />
                          <p>{option.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <label className="block pb-5">
                  <span className="block text-xs font-normal pt-3 text-gray">Link</span>
                  <div className='flex flex-col relative w-full'>
                    <img className='absolute w-3 top-4 left-4' src={Link} alt="" />
                    <input
                      type="url"
                      placeholder='e.g. https://www.example.com/johnappleseed'
                      value={link.url}
                      onChange={(e) => handleUrlChange(index, e.target.value)}
                      className="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                              focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                              disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                              invalid:border-danger invalid:text-danger
                              focus:invalid:border-danger focus:invalid:ring-danger"
                    />
                    <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                      Please check the URL.
                    </p>
                  </div>
                </label>
              </div>
            ))}
          </div>

          {error && <p className='text-danger text-sm'>{error}</p>}
          {successMessage && <p className='text-success text-sm'>{successMessage}</p>}

          <div className='flex content-end items-end justify-end border-t-[1px] border-gray-light py-5'>
            <button
              onClick={handleSave}
              className='bg-primary text-white py-2 px-4 rounded-md'
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddLinks;
