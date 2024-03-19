import axios from 'axios';
import React, { useEffect, useState } from 'react';

import DoneList from './components/DoneList';
import InProgressList from './components/InProgressList';
import InReviewList from './components/InReviewList';
import ToDoForm from './components/ToDoForm';
import TodoList from './components/TodoList';

const Task = () => {

  const [tasks, setTask] = useState([]);
  useEffect(() => {
    fetchTask();
    fetchTaskProgress();
    fetchTaskreview();
    fetchTaskDone();
  }, []);

  const fetchTask = () => {
    axios
      .get(`http://localhost:3000/task/todotask/alltask`)
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


  const handleRefresh =() =>{
    fetchTask()
    fetchTaskProgress()
    fetchTaskreview()
    fetchTaskDone();
  }
  
  const [tasksProgress, setTaskProgress] = useState([]);


  const fetchTaskProgress = () => {
    axios
      .get(`http://localhost:3000/task/InProgresstask/alltask`)
      .then((res) => {
        setTaskProgress(res.data);

      })
      .catch((err) => {
        console.error('Error:', err);
        if (err.response) {
          console.error('Error response:', err.response.data);
        }
       
      });
  };
  
  
  const [tasksReview, setTaskReview] = useState([]);
  
  
  
  const fetchTaskreview = () => {
    axios
      .get(`http://localhost:3000/task/InReviewtask/alltask`)
      .then((res) => {
        setTaskReview(res.data);
      })
      .catch((err) => {
        console.error('Error:', err);
        if (err.response) {
          console.error('Error response:', err.response.data);
        }
       
      });
  };
  
  const [tasksDone, setTaskDone] = useState([]);
 
  const fetchTaskDone = () => {
    axios
      .get(`http://localhost:3000/task/donetask/alltask`)
      .then((res) => {
        setTaskDone(res.data);

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
  <section className='min-h-screen pt-20 max-w-7xl mx-auto'>
        <hr className='my-5'/>
        <ToDoForm  refresh={handleRefresh} />
        <div className='w-full grid grid-cols-4 gap-2 '>
        <div>  <TodoList tasks={tasks}  refresh={handleRefresh} /> </div>
        <div> <InProgressList tasks={tasksProgress}  refresh={handleRefresh}  /></div>
        <div><InReviewList tasks={tasksReview}  refresh={handleRefresh}  /></div>
        <div> <DoneList tasks={tasksDone}  refresh={handleRefresh} /></div>
        
        
        </div>
   </section>
  
  
  </>
  )
}

export default Task
