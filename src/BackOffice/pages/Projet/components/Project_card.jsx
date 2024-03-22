import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
const COLORS = ['#0088FE', '#00C49F'];

const Project_card = ({ project }) => {

  const [objectifData, setObjectifData] = useState([]); 
  
  useEffect(() => {
    fetchObjectif();
  }, [project]); 
  
  
  const fetchObjectif = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/objectif/get/${project._id}`);
      setObjectifData(res.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des objectifs:', error);
      }
  };
  
  
  const objectifsEnAttente = objectifData.filter(objectif => objectif.status_obj === 'waiting');
  const objectifsTermines = objectifData.filter(objectif => objectif.status_obj === 'done');
  const totalObjectifs = objectifData.length;
  const percentDone = (objectifsTermines.length / totalObjectifs) * 100;

  return (
   <>
   <div className='cursor-pointer shadow-lg h-48 flex  justify-between p-5'>
        <div className='w-2/3'>
            <h2>{project.titre_project}</h2>
            <p className=' text-slate-300 text-xs py-5 px-2'>
              {project.contenu_project}
            </p>
        </div>
   
        <div className='relative w-1/3'>
          <h2> objectifs</h2>
          <div className='absolute -top-3/4 -left-full -translate-x-10 scale-75'>
            <ResponsiveContainer ResponsiveContainer width={400} height={400}>
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
   </div>
   
   </>
  )
}

export default Project_card
