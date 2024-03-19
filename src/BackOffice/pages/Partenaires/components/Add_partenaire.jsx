import React from 'react';
import { FaPlus } from 'react-icons/fa';

const Add_partenaire = () => {
  return (
   <>
    <div className='cursor-pointer relative h-80 w-full bg-black-900 text-slate-400 shadow-lg hover:shadow-none'>
        <FaPlus className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl bx bx-plus' />
    </div>
   
   </>
  )
}

export default Add_partenaire
