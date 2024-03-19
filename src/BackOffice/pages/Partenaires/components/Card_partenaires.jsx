import { Avatar, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card_partenaires = ({ partenaire ,setPartenaires }) => {
  const [publishStatus, setPublishStatus] = useState(partenaire.status_partenaire);
const toast = useToast()

const handlePublishStatusChange = (event) => {
  event.stopPropagation()
  setPublishStatus(event.target.checked);
  handleSubmit()
};

const handleSubmit = (e) => {

  const formData = {
    status_partenaire: !publishStatus, 
  };

  axios.put(`http://localhost:3000/partenaire/${partenaire._id}`, formData)
  .then((res) => {
    setPartenaires(prevPartenaires => prevPartenaires.map(partenaire => partenaire._id === partenaire._id ? { ...partenaire, ...formData } : partenaire));
    const toastMessage = partenaire.status_partenaire ? 'partenaire en attente de publication.' : 'partenaire publie.';
    const toastStatus = partenaire.status_partenaire ? 'info' : 'success';
  
    toast({
      title: toastMessage,
      status: toastStatus,
      duration: 9000,
      isClosable: true,
    });
    
    setPublishStatus(!publishStatus);
   
  })
  .catch((err) => {
    console.error('Error:', err);
  });   

};


const Delete = (e) =>{
  e.preventDefault();
  axios.delete(`http://localhost:3000/partenaire/${partenaire._id}`)
  .then((res) => {
      setPartenaires(prevPartenaires => prevPartenaires.filter(b => b._id !== partenaire._id));
      toast({
        title: 'partenaire supprimer.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      }) 
    })
    .catch((err) => console.log(err));
}









  return (
    <>
      <div className='cursor-pointer relative shadow-lg flex overflow-hidden group h-80'>
          <div className='bg-slate-300 w-1/3 h-auto relative'>
            <img src={partenaire.logo_partenaire} alt={partenaire.nom_partenaire} className='w-full'/>
            <Avatar width={155} height={155} src={partenaire.logo_partenaire} alt={partenaire.nom_partenaire} className='absolute overflow-hidden top-8 left-2/4 border-8 border-white '/>
          
          </div>
         
            
          <div className='w-2/3 px-2 py-5 relative'>
    
                
          
            <h3 className='text-skin-color1 font-semibold text-right mr-5 hover:text-2xl  transition'>    <Link  to={`detail/${partenaire._id}`}>{partenaire.nom_partenaire} </Link></h3>
           
            
            <div className='text-slate-400 text-xs font-semibold w-9/12 mx-auto py-20'>
                {partenaire.histoire_partenaire}
            </div>
            <div className='absolute bottom-5 right-5'>
            <div className='grid grid-cols-1 gap-2 opacity-0 group-hover:opacity-100 transition'>
              <div>
              <form >
                <div className="flex justify-end items-center  prvlg-switcher">
                    <input className="form-checkbox" type="checkbox"  id={`status_partenaire${partenaire._id}`}
                      name={`status_partenaire${partenaire._id}`} onChange={handlePublishStatusChange}  defaultChecked={partenaire.status_partenaire} />
                    <label className="ml-2" htmlFor={`status_partenaire${partenaire._id}`}> </label>
                </div>
              </form>
              </div>
              <div className='flex justify-end items-center gap-2'>
          <div className='w-auto'>
                <Link to={`edit/${partenaire._id}`}>
                  <button className="border px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold ">
                <FaPen />
                </button>   
                </Link>
                         
            </div>
            <div className='w-auto'>
                <button className="border px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white font-bold "   onClick={Delete}>
                  <FaTrash />
                </button>            
            </div>
            
        </div>
            </div>
         
            </div>
          </div>
      </div>
    </>
  )
}

export default Card_partenaires;
