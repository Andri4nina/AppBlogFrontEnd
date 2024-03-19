import React, { useEffect, useState } from 'react'
import Public_partenaire from '../components/Public_partenaire'
import Detail_list from '../components/Detail_list'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Detail_part = () => {

  const { partId } = useParams();
 
  const [partenaireData, setPartenaireData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/partenaire/${partId}`);
        setPartenaireData(res.data);
      } catch (error) {
        console.error('Error fetching partenaire data:', error);
      }
    };

    fetchData();
  }, [partId]);
  




  return (
   <>
   <div className='flex  gap-5'>
     <div>
      <h2 className='my-5 text-2xl font-semibold '>Appercu pour les visiteurs</h2>
      <Public_partenaire partenaire={partenaireData}  />
     </div>
     <div className='w-10/12'>
     <h2 className='my-5 text-2xl font-semibold '>Autre details</h2>
        <Detail_list partenaire={partenaireData} />
      </div>
    
   
   
   </div>
   
   
      <h2 className='my-5 text-2xl font-semibold '>Couverture</h2>
    
    <div  className='w-full bg-slate-400 h-96'>
      <img src={partenaireData ? partenaireData.couv_partenaire : ''} alt="" className='w-full h-full object-cover' />
    
    </div>
    
   </>
  )
}

export default Detail_part
