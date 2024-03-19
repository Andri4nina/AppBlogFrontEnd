import { Box, Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Searchbar from '../../../components/Searchbar';
import Add_partenaire from '../components/Add_partenaire';
import Card_partenaires from '../components/Card_partenaires';

const List_part = () => {
  const [partenaires, setPartenaires] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchPartenaires();
  }, []);

  const fetchPartenaires = (keyword = '') => {
    axios
      .get(`http://localhost:3000/partenaire?keyword=${keyword}`)
      .then((res) => {
        setPartenaires(res.data);
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
    <Searchbar onSearch={fetchPartenaires}/>
    <div className='mt-5'>
    <div className='grid lg:grid-cols-2 gap-2'>
      <Link to="/Partenaire/Formulaire"> <Add_partenaire /></Link>
   
        {loading ? (
            <Box padding='6' boxShadow='lg' bg='white'>
               <div className='flex'>
                   <div className='w-1/3 h-auto relative'>
                     <Skeleton height='270' />
                     <div className='absolute overflow-hidden top-8 left-2/4 border-8 border-white bg-white rounded-full'>
                       <SkeletonCircle size='155'  />
                     </div>
                   </div>
                   <div className=' w-2/3 h-auto relative'>
                     <Skeleton height='10' width='20' className='absolute right-0' />
                     <SkeletonText ml={100} width={250} mt='104' noOfLines={4} spacing='4' skeletonHeight='2' />
                   </div>
               </div>       
             </Box>
            
            ) : (
              partenaires.map(partenaire => (
              
                  <Card_partenaires key={partenaire._id} partenaire={partenaire} setPartenaires={setPartenaires} />
          
              ))
            )}
            
   
    </div>
    
    </div>
   
   </section>
   
   </>
  )
}

export default List_part
