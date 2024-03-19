import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { FaTrash } from 'react-icons/fa';

 
const TaskField = ({ task , refresh} : { task : any , refresh  : ()=> void } ) => {

  let taskStatusColor = '';

  // Déterminez la couleur de fond en fonction de l'état de la tâche
  switch (task.status_task) {
    case 'In review':
      taskStatusColor = 'bg-red-200';
      break;
    case 'In progress':
      taskStatusColor = 'bg-blue-400';
      break;
    case 'Done':
      taskStatusColor = 'bg-green-400';
      break;
    default:
      taskStatusColor = 'bg-black-900';
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    let updatedStatus = '';
    switch (task.status_task) {
        case 'To do':
            updatedStatus = 'In progress';
            break;
        case 'In progress':
            updatedStatus = 'In review';
            break;
        case 'In review':
            updatedStatus = 'Done';
            break;
        default:
            return;
    }

    const updatedTask = { ...task, status_task: updatedStatus };
    axios
        .put(`http://localhost:3000/task/${task._id}`, updatedTask)
        .then((res) => {
            let message = "tache effectuer"
            
            toast({
                title: message,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            refresh()
        })
        .catch((err) => {
            console.error('Error:', err);
        });
  
};


    
    const toast = useToast() 
  
  

const Delete = (e) =>{
  e.preventDefault();
  axios.delete(`http://localhost:3000/task/${task._id}`)
  .then(() => {
  //     setTask((prevTasks) => prevTasks.filter((t) => t._id !== task._id));
      toast({
        title: 'tache supprimer.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      refresh()
    })
    .catch((err) => console.log(err));
}
  
  


  return (

    <div className={`flex p-5 justify-between ${taskStatusColor}`}>
        <div>
        {task.libele_task}
        </div>
        <div className="checkbox-wrapper flex justify-center items-center gap-5">
        {task.status_task !== 'Done' && (
            <form>
              <input
                name="checkbox"
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    handleSubmit(e); 
                  }
                }}
              />
            </form>
          )}
          
          {task.status_task == 'To do' && (
            <form >
            
             <FaTrash  className='text-red-500 cursor-pointer' onClick={Delete}/>
            </form>
          )}
       
        </div>
    </div>
  )
}

export default TaskField
