import React, { useState } from 'react';
import Mock from '../images/mockup.svg'


const LinkManager = () => {
  const [links, setLinks] = useState([{ platform: '', url: '' }]);

  const addNewLink = () => {
    setLinks([...links, { platform: '', url: '' }]);
    console.log(links);
  };

  const handleLinkChange = (index, event) => {
    const newLinks = links.map((link, i) => {
      if (i === index) {
        return { ...link, [event.target.name]: event.target.value };
      }
      return link;
    });
    setLinks(newLinks);
  };

  const handleRemoveLink = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleSave = () => {
    console.log('Links:', links);
    // Add your save logic here
  };

  return (
    <div className='flex mx-auto justify-center bg-gray-lighter gap-x-5'>
    <div className='md:flex hidden mx-auto bg-white justify-center items-center w-[45%] mt-5 p-8'>
      <img className='max-h-[32rem]' src={Mock} alt="" />
    </div>

    <div className="w-full md:w-[55%] bg-white mt-5 p-8">
      <h2 className="font-semibold  text-2xl">Customize your links</h2>
      <p className="text-gray py-3">Add/edit/remove links below and then share all your profiles with the world!</p>
      
      {links.map((link, index) => (
        <div key={index} className="mb-4 border border-gray-200 p-4 rounded-lg relative  ">

        <div className='flex justify-between text-sm pb-2'>
            <p className='text-gray font-semibold '> <span className='text-gray font-semibold'>=</span> Link #1</p>
            <p onClick={() => handleRemoveLink(index)} className='text-gray'>Remove</p>
            </div>

          <div className="flex justify-between items-center">
            <label className="text-xs text-gray">Platform</label>
            {/* <button
              type="button"
              className="text-red-500 text-sm"
              onClick={() => handleRemoveLink(index)}
            >
              Remove
            </button> */}
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              name="platform"
              value={link.platform}
              onChange={(event) => handleLinkChange(index, event)}
              placeholder="e.g. GitHub"
              className="w-full py-2 px-3 border border-gray-light rounded-md text-sm shadow-sm focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <label className="block mt-4 text-sm font-normal text-dark">Link</label>
          <input
            type="url"
            name="url"
            value={link.url}
            onChange={(event) => handleLinkChange(index, event)}
            placeholder="e.g. https://www.example.com/johnappleseed"
            className="w-full py-2 px-3 border border-gray-light rounded-md text-sm shadow-sm focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary mt-2"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addNewLink}
        className="w-full py-2 px-4 border border-primary text-primary rounded-lg shadow-sm focus:outline-none focus:shadow-outline mt-4"
      >
        + Add new link
      </button>

      <button
        type="button"
        onClick={handleSave}
        className="w-full py-2 px-4 bg-primary text-white rounded-lg shadow-sm focus:outline-none focus:shadow-outline mt-4"
      >
        Save
      </button>
    </div>
    </div>
  );
};

export default LinkManager;
