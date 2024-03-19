import React from 'react';
import { FaUserPlus } from 'react-icons/fa';


const Card_Add_User = () => {
  return (
    <>
     <div className="cursor-pointer  relative flex justify-center w-full  h-40 shadow-lg bg-black-900 mt-5 hover:shadow-none  transition">
        <FaUserPlus className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  text-9xl text-slate-400' />
    </div>
    </>
  )
}

export default Card_Add_User
