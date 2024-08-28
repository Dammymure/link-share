import React, { useState } from 'react'
import Icon from '../images/icons/icon.png'
// import Link from '../images/icons/link.png'
import { ReactComponent as  ProfileIcn } from '../images/icons/profile.svg'
import { ReactComponent as  Link } from '../images/icons/Link.svg'
import { useNavigate } from "react-router-dom";
import AddLinks from '../pages/AddLinks';
import Profile from '../pages/Profile';
import LinkManager from '../pages/LinkManager';


function Home() {
  const [right, setRight] = useState(true)
  const navigate = useNavigate()

  return (
    <div className=''>
        <div className='flex justify-between py-8 px-10'>
            <div className='flex items-center'>
                    <img className='w-10 h-10' src={Icon} alt="" />
                    <h1 className='hidden md:flex font-semibold text-2xl'>devlinks</h1>
            </div>

            <div className='flex gap-x-5'>
                <div 
                onClick={()=> {setRight(true)}}
                className={`flex items-center px-4 py-2 rounded-md gap-x-2 cursor-pointer ${right ?'bg-tertiary text-primary':'text-gray bg-white '}`}>
                    {/* <img className='w-4 h-4' src={Link} alt="" /> */}
                    <Link/>
                    <p className='hidden md:flex '>Links</p>
                </div>
                <div 
                onClick={()=> {setRight(false)}}
                className={`flex items-center px-4 py-2 rounded-md gap-x-2 cursor-pointer ${right ?'text-gray bg-white':' bg-tertiary text-primary'}`}>
                    {/* <img className='' src={Profile} alt="" /> */}
                    <ProfileIcn className='text-primary'/>
                    <p className='hidden md:flex '>Profile Details</p>
                </div>
            </div>

            <button className='text-primary border-[1px] hover:bg-primary hover:text-white px-4 py-2 rounded-md font-semibold border-primary'
            onClick={()=> navigate('/preview')}
            >Preview</button>
        </div>

        {right ? 
        // <AddLinks/> 
        <AddLinks/>
        : <Profile/>}

        <div>
          
        </div>
    </div>
  )
}

export default Home