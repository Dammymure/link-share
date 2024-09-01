import React, { useState } from 'react';
import Navbar from '../components/Home';
import PhoneMockup from '../components/PhoneMockup';
import Img from '../images/icons/img.png';
import axios from 'axios';

function Profile() {
  const [imagePreview, setImagePreview] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstname', firstName);
    formData.append('lastname', lastName);
    formData.append('email', email);
    if (image) {
      formData.append('picture', image);
    }

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.put('https://link-share-l6eq.onrender.com/profile/updateaccount', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
      setSuccessMessage("Successfully Updated")
      console.log(response.data.msg); // Handle success
    } catch (error) {
      console.error(error.response?.data?.message || 'An error occurred'); // Handle error
    }
  };

  return (
    <div className='flex mx-auto justify-center bg-gray-lighter gap-x-5'>
      <PhoneMockup />

      <div className='w-full md:w-[55%] bg-white mt-5 p-8'>
        <div>
          <h2 className='text-2xl font-semibold'>Profile Details</h2>
          <p className='text-gray'>Add your details to create a personal touch to your profile.</p>
        </div>

        <div className="flex items-center bg-gray-lighter p-2 rounded-md justify-center space-x-4">
          <p className="text-gray whitespace-nowrap">Profile picture</p>
          <div className="flex flex-col items-center">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-44 h-32 object-cover rounded-md shadow-lg"
              />
            ) : (
              <label className='flex flex-col items-center text-sm whitespace-nowrap text-primary bg-tertiary py-14 px-8 rounded-md cursor-pointer' htmlFor="file-upload">
                <img src={Img} alt="" />
                + Upload Image
              </label>
            )}

            {imagePreview && (
              <label
                htmlFor="file-upload"
                className="mt-4 cursor-pointer text-primary font-semibold hover:text-secondary"
              >
                Change Image
              </label>
            )}

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <p className="text-gray text-sm">Image must be below 1024x1024px. Use PNG or JPG format.</p>
        </div>

        <div className='py-5'>
          <form onSubmit={handleSubmit}>
            <ul className='flex flex-col bg-gray-lighter p-4 gap-y-5'>
              <li className='flex justify-between items-center'>
                <h1 className='text-gray'>First Name*</h1>
                <div className='flex flex-col relative'>
                  <input
                    type="text"
                    placeholder='eg. John'
                    className="peer block w-full md:w-[25rem] pl-5 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Please check again
                  </p>
                </div>
              </li>
              <li className='flex justify-between items-center'>
                <h1 className='text-gray'>Last Name*</h1>
                <div className='flex flex-col relative'>
                  <input
                    type="text"
                    placeholder='eg. Doe'
                    className="peer block w-full md:w-[25rem] pl-5 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Please check again
                  </p>
                </div>
              </li>
              <li className='flex justify-between items-center'>
                <h1 className='text-gray'>Email*</h1>
                <div className='flex flex-col relative'>
                  <input
                    type="email"
                    placeholder='eg. example@example.com'
                    className="peer block w-full md:w-[25rem] pl-5 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                    Please check again
                  </p>
                </div>
              </li>
              {successMessage}
            </ul>
            <div className='flex content-end items-end justify-end border-t-[1px] border-gray-light'>
              <button type="submit" className='bg-primary text-white py-2 px-4 rounded-md'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
