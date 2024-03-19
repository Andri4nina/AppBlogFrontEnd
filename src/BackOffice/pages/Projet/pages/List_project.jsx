import React, { useEffect, useState } from 'react'
import Project_add from '../components/Project_add'
import Searchbar from '../../../components/Searchbar'
import { Link } from 'react-router-dom';
import Project_card from '../components/Project_card';
import axios from 'axios';
import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
const List_project = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = (keyword = '') => {
    axios
      .get(`http://localhost:3000/projet?keyword=${keyword}`)
      .then((res) => {
        setProjects(res.data);
        console.log(res.data)
        setLoading(false);
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
      <section>
      <Searchbar onSearch={fetchProjects}/>
        <div className='mt-5 grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            <Link to="/Project/Formulaire">
              <Project_add />
            </Link>
            {loading ? (
             <Box padding='6' boxShadow='lg' bg='white'>
             <div className='flex'>
                 <div className='w-2/3 h-auto relative'>
                   <Skeleton height='5' />

                    <SkeletonText  width={250}  noOfLines={4} spacing='4' skeletonHeight='2' />
                 </div>
                 <div className=' w-1/3 h-auto flex justify-center items-center relative'>
                   <SkeletonCircle size='105'  /> 
                 </div>
             </div>       
           </Box>
            ) : (
              projects.map(project => (
                  <Link to={`detail/${project._id}`}>
                          <Project_card key={project._id} project={project} setProjects={setProjects} />
                  </Link>
          
              ))
            )}
          
          
        </div>

  </section>
   </>
  )
}

export default List_project
