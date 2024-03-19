import React from 'react'

const Project_card = ({ project }) => {
  return (
   <>
   <div className='cursor-pointer shadow-lg h-48 flex justify-between p-5'>
        <div>
        <h2>{project.titre_project}</h2>
        <p className=' text-slate-300 text-xs py-5 px-2'>
          {project.contenu_project}
        </p>
        </div>
   
        <div className='flex justify-center items-center'>
            <div className='w-20 h-20 border-8 border-slate-600 rounded-full'>
            
            </div>
        </div>
   </div>
   
   </>
  )
}

export default Project_card
