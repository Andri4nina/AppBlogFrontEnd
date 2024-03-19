import { FaPlus } from 'react-icons/fa';


const Card_add_blog = () => {
  return (
   <>
      <div className='relative shadow-lg w-full h-60 mt-5 bg-black-900 rounded-lg hover:shadow-none cursor-pointer'>
         <FaPlus className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bx bx-plus text-slate-400 text-9xl' />
        </div>
   </>
  )
}

export default Card_add_blog
