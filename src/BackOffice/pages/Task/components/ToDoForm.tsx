import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const ToDoForm = ({refresh} : {refresh : ()=> void})=> {
    const toast = useToast() 

    const [formData, setFormData] = useState({
        libele_task: "",
        status_task: "To do",
      });
      
      
      const resetForm = () => {
        setFormData({
            libele_task: "",
            status_task: "To do",
        });
      };
      


    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        resetForm(); 
      };
      
      
      
      const onAdd = (formData) => {
        axios.post('http://localhost:3000/task', formData)
            .then((res) => {
                toast({
                    title: 'Tache ajouté avec succès.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                refresh()
            })
            .catch((err) => {
                console.error('Error:', err);
                toast({
                    title: 'Une erreur s\'est produite lors de l\'ajout du projet.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            });
    };
      


  return (
    <>
        <div className=' grid grid-cols-4 w-full'> 
            <form onSubmit={handleSubmit}>
                <div className='flex justify-around gap-2 items-center'>
                    <div className='w-3/4'>
                        <input type="text"  className='bg-none outline-none w-full border-b-2 p-5'
                          value={formData.libele_task}
                          onChange={(e) => {
                            setFormData({ ...formData, libele_task: e.target.value })
                            }
                            }
                        required/>
                    </div>
                    <button className='p-5 flex justify-center items-center h-auto w-1/4 shadow-xl border'>
                        <FaPlus />
                    </button>
                </div>
            </form>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </>
  )
}

export default ToDoForm
