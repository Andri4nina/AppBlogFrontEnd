import axios from 'axios';
import React, { useEffect, useState } from 'react';

import TaskField from '../../Task/components/TaskField';

const Task_list_dash = () => {
    const [tasks, setTask] = useState([]);
    useEffect(() => {
      fetchTask();
    }, []);
    
    const refresh =() =>{
      fetchTask()
    }
    
  
    const fetchTask = () => {
      axios
        .get(`http://localhost:3000/task/todaytask/alltask`)
        .then((res) => {
          setTask(res.data);
        })
        .catch((err) => {
          console.error('Error:', err);
          if (err.response) {
            console.error('Error response:', err.response.data);
          }
         
        });
    };
  


  return (
   <>
   <div className="sm:w-1/3 p-5 shadow-lg mb-2 h-96">
        <h3 className="text-sm mb-5 font-semibold">Listes des taches</h3>
        <div className="overflow-y-hidden h-full">
            <ul className="overflow-y-scroll h-5/6">
            {tasks.map(task => (
                    <li className='mb-5' key={task._id}>
                      <TaskField task={task} refresh={refresh}/>
                    </li>
                  ))}
            </ul>
        </div>
    </div> 
   </>
  )
}

export default Task_list_dash
