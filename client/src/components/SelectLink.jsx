import React, { useState } from 'react'
import Link from '../images/icons/link2.svg'


function SelectLink() {

    const options = [
        { value: 'git', label: 'GitHub', icon: "git.svg" },
        { value: 'youtube', label: 'Youtube', icon: "youtube.svg" },
        { value: 'linkedin', label: 'LinkedIn', icon: "linkedin.svg" },
        { value: 'facebook', label: 'Facebook', icon: "facebook.svg" },
        { value: 'frontendmentor', label: 'Frontend Mentor', icon: "frontendmentor.svg" },
        { value: 'hashnode', label: 'Hashnode', icon: "hashnode.svg" },
      ];
      const [selectedOption, setSelectedOption] = useState(options[0]);
      const [isOpen, setIsOpen] = useState(false);
      const [linkTrack, setLinktrack] = useState([])
    
    
      const toggleDropdown = () => setIsOpen(!isOpen);
      const handleOptionClick = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
      };
  return (
    <div className='bg-gray-lighter p-3'>
    <div className='flex justify-between text-sm pb-2'>
      <p className='text-gray font-semibold '> <span className='text-gray font-semibold'>=</span> Link #1</p>
      <p className='text-gray'>Remove</p>
    </div>

      <div className="relative w-full">
        <p className='text-xs text-gray'>Platform</p>
<button
  onClick={toggleDropdown}
  className="w-full p-3 border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400 
            focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary 
            bg-white text-dark flex justify-between items-center"
>
  <div className='flex gap-3'>
    <img className='w-3' src={require(`../images/icons/${selectedOption.icon}`)} alt="" />
    <p>{selectedOption.label}</p>
    

  </div>
  <svg
    className={`w-4 h-4 transition-transform transform ${
      isOpen ? 'rotate-180' : ''
    }`}
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

{isOpen && (
  <div className="absolute mt-1 w-full bg-white border border-gray-light rounded-md shadow-lg z-10 divide-y-[1px] divide-gray-light ">
    {options.map((option) => (
      <div
        key={option.value}
        onClick={() => handleOptionClick(option)}
        className="flex items-center py-2 px-4 hover:bg-gray-100 cursor-pointer text-dark gap-3 hover:bg-tertiary hover:text-primary stroke-primary"
      >
        <img className='stroke-primary w-3' src={require(`../images/icons/${option.icon}`)} alt="" />
        <p>{option.label}</p> 
      </div>
    ))}
  </div>
)}
      </div>

      <label class="block pb-5">
                    <span class="block text-xs font-normal pt-3 text-gray">Link</span>
                    {/* <!-- Using form state modifiers, the classes can be identical for every input --> */}
                    <div className='flex flex-col relative w-full'>
                    <img className='absolute w-3 top-4 left-4' src={Link} alt="" />
                    <input type="url" placeholder='e.g. https://www.example.com/johnappleseed' class="peer block w-full pl-10 py-3 bg-white border border-gray-light rounded-md text-sm shadow-sm placeholder-slate-400
                    focus:outline-none focus:border-primary focus:shadow-custom-purple focus:ring-1 focus:ring-primary
                    disabled:bg-gray-light disabled:text-gray disabled:border-gray disabled:shadow-none
                    invalid:border-danger invalid:text-danger
                    focus:invalid:border-danger focus:invalid:ring-danger
                    "/>
                        <p class="absolute top-2 right-4 mt-2 invisible peer-invalid:visible text-danger text-xs">
                        Please check the URL.
                        </p>

                    </div>
                </label>


  </div>
  )
}

export default SelectLink