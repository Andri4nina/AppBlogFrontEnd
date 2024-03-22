import './Detail_project.css';

import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import Project_view from '../components/Project_view';

const COLORS = ['#0088FE', '#00C49F'];


const Detail_project = () => {
  const { projId } = useParams();
  
  
  const [projetData, setProjetData] = useState(null);
  const [objectifData, setObjectifData] = useState([]); 
  
  
  
  useEffect(() => {
    fetchProject();
    fetchObjectif();
   
  }, [projId]); 
  
  
  
  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/projet/${projId}`);
      setProjetData(res.data);
      fetchObjectif();
      fetchObjectif();
      fetchObjectif();
    } catch (error) {
      console.error('Error fetching partenaire data:', error);
    }
  };
  
  
  const Delete = (e) =>{
    e.preventDefault();
    axios.delete(`http://localhost:3000/projet/${projId}`)
    .then(() => {
        setProjetData(prevPojet => prevPojet.filter(p => p._id !== projId));
        toast({
          title: 'Project supprimer.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) 
      })
      .catch((err) => console.log(err));
      
      navigate('/back/Project');
  }
  const toast = useToast() 
  const navigate = useNavigate();
    
    
    
  const fetchObjectif = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/objectif/get/${projId}`);
      setObjectifData(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des objectifs:', error);
      }
  };
  
  const doneOrWaitObj =(e,objectifId,status) =>{
    const isChecked = e.target.checked;
    const index = parseInt(e.target.name.split('-')[1]);
    setObjectifData(prevObjectifData => {
      const updatedObjectifData = [...prevObjectifData];
      updatedObjectifData[index].status_obj = isChecked ? 'done' : 'waiting';
      return updatedObjectifData;
    });
    
    const newStatus = status === 'done' ? 'waiting' : 'done';
    const message = status === 'done' ? 'objectif en revision' : 'objectif atteint'; 
    const states = status === 'done' ? 'info' : 'success'; 
    
    
    axios
      .put(`http://localhost:3000/objectif/${objectifId}`, { status_obj: newStatus })
    .then(() => {
        toast({
            title: message,
            status: states,
            duration: 9000,
            isClosable: true,
        });
    })
    .catch((err) => {
        console.error('Error:', err);
    });
    
  }

  const objectifsEnAttente = objectifData.filter(objectif => objectif.status_obj === 'waiting');
  const objectifsTermines = objectifData.filter(objectif => objectif.status_obj === 'done');
  const totalObjectifs = objectifData.length;
  const percentDone = (objectifsTermines.length / totalObjectifs) * 100;
  
  
  
  return (
  <>
  <div className='grid grid-cols-3'>
        <div>
        <h2 className='text-2xl font-extrabold'>Le Project</h2>
          <div className='mt-10'>
            <Project_view projet={projetData}/>
          </div>
           
        </div>
        <div className='relative'>
        <h2 className='text-2xl font-extrabold'>Progression des objectifs</h2>
          <div className=' absolute -top-10'>
            <ResponsiveContainer width={400} height={400}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'En attente', value: objectifsEnAttente.length },
                    { name: 'Terminés', value: objectifsTermines.length }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {objectifsEnAttente.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[0]} />
                  ))}
                  {objectifsTermines.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[1]} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize={20}>
                  {`${percentDone.toFixed(0)}%`}
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div>
          <div className='flex justify-center w-full items-center gap-2'>
                <div className='w-1/2'>
                      <Link to={`/back/Project/edit/${projId}`}>
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
  <div className='flex mt-5 gap-2'>
    <div className='w-1/4'>
    <h2>Les objectifs</h2>
    <ul className="list_obj">
        {objectifData.map((objectif, index) => (
          <li className="relative px-2 my-5" key={index}>
            <label className="items-center align-middle text-lg pl-8 cursor-pointer">
              <span className="">{objectif.libele_obj}</span>
              <form>
                <input
                  type="checkbox"
                  name={`status-${index}`}
                  className="opacity-0 cursor-pointer statusCheckbox"
                  checked={objectif.status_obj === 'done'} 
                  onChange={(e) => doneOrWaitObj(e, objectif._id,objectif.status_obj)}
                />
                <span className="checker"></span>
              </form>
            </label>
          </li>
        ))}
      </ul>
    
    </div>
    <div className='w-3/4 bg-blue-300'>
    </div>
  
  </div>
  </>
    
  )
}

export default Detail_project
