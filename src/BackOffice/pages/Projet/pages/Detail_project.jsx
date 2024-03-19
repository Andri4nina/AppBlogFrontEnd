import React, { useEffect, useState } from 'react'
import Project_view from '../components/Project_view'
import { FaPen, FaTrash } from 'react-icons/fa'
import { Link, useParams ,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { useToast } from '@chakra-ui/react';
const Detail_project = () => {
  const { projId } = useParams();
  
  const [projetData, setProjetData] = useState(null);
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/projet/${projId}`);
        setProjetData(res.data);
      } catch (error) {
        console.error('Error fetching partenaire data:', error);
      }
    };

    fetchData();
  }, [projId]);
  
  
  
  const Delete = (e) =>{
    e.preventDefault();
    axios.delete(`http://localhost:3000/projet/${projId}`)
    .then((res) => {
        setProjetData(prevPojet => prevPojet.filter(p => p._id !== projId));
        toast({
          title: 'Project supprimer.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) 
      })
      .catch((err) => console.log(err));
      
      navigate('/Project');
  }
  const toast = useToast() 
  const navigate = useNavigate();
  return (
   
    
  <>
  <div className='grid grid-cols-3'>
        <div>
            <Project_view projet={projetData}/>
        </div>
        <div>
        
        
        </div>
        <div>
            Action
            <div className='flex justify-center w-full items-center gap-2'>
          <div className='w-1/2'>
                <Link to={`/Project/edit/${projId}`}>
                  <button className="w-full flex justify-center h-20 items-center border px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold ">
                <FaPen />
                </button>   
                </Link>
                         
            </div>
            <div className='w-1/2'>
                <button className="w-full flex justify-center h-20 items-center border px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white font-bold "   onClick={Delete}>
                  <FaTrash />
                </button>            
            </div>
            
        </div>
        </div>
    </div>
  </>
    
  )
}

export default Detail_project
