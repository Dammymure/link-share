import React from 'react'
import Github from '../images/icons/iconwhite/git.svg'
import Arrow from '../images/icons/iconwhite/arrow.svg'
import { useNavigate } from 'react-router-dom'


function Preview() {
    const navigate = useNavigate()

  return (
<div className=' bg-gray-lighter h-screen'>
    <div className='bg-primary pt-10 pb-56 px-10 rounded-b-3xl relative'>
        <div className='flex justify-between py-5 px-8 bg-white rounded-lg z-0 relative'>
            <button className='text-primary border-[1px] hover:bg-primary hover:text-white px-4 py-2 rounded-md font-semibold border-primary' onClick={()=> navigate('/home')}>Back to Editor</button>
            <button className='bg-primary text-white py-2 px-4 rounded-md'>Share Link</button>
        </div>

        <div className='absolute bg-white drop-shadow-xl  top-1/2 left-1/2 transform -translate-x-1/2 translate-y-5 p-14 z-50'>
            <div className='flex flex-col items-center pb-12'>
                <img className='w-24 h-24 rounded-full bg-danger' src="" alt="" />
                <h2 className='text-3xl font-semibold'>Ben Wright</h2>
                <p className='text-base text-gray'>example@gmail.com</p>
            </div>

            <div className='flex flex-col gap-4'>
                <div className='flex items-center justify-between bg-black py-3 px-2 rounded-md'>
                    <div className='flex text-white items-center gap-1'>
                        <img className='w-3 h-3' src={Github} alt="" />
                        <p className='text-sm font-extralight'>GitHub</p>
                    </div>
                    <div>
                        <img src={Arrow} alt="" />
                    </div>

                </div>
                <div className='flex items-center justify-between bg-danger py-3 px-2 rounded-md'>
                    <div className='flex text-white items-center gap-1'>
                        <img className='w-3 h-3' src={Github} alt="" />
                        <p className='text-sm font-extralight'>GitHub</p>
                    </div>
                    <div>
                        <img src={Arrow} alt="" />
                    </div>

                </div>
                <div className='flex items-center justify-between bg-primary py-3 px-2 rounded-md'>
                    <div className='flex text-white items-center gap-1'>
                        <img className='w-3 h-3' src={Github} alt="" />
                        <p className='text-sm font-extralight'>GitHub</p>
                    </div>
                    <div>
                        <img src={Arrow} alt="" />
                    </div>

                </div>

            </div>
        </div>

    </div>
</div>


  )
}

export default Preview