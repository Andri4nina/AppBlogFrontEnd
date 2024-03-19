import React, { useEffect, useState } from 'react';

import TaskField from './TaskField';

const InReviewList = ({tasks , refresh} :{tasks : any, refresh : ()=> void}) =>{


  return (
   <>
   <h2 className='my-5 font-medium'>Liste de nos taches en progression</h2>
   <ul className=' mt-5'>
   {tasks.map(task => (
        <li className='mb-5' key={task._id}>
          <TaskField task={task} refresh={refresh}/>
        </li>
      ))}
   </ul>
   
   
   </>
  )
}

export default InReviewList
