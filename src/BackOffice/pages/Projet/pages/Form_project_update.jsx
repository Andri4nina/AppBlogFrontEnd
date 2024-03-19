import React, { useEffect, useState } from 'react'
import InputFields from '../../../../components/InputField'
import TextArea from '../../../../components/TextArea'
import { FaPlus, FaTrashAlt } from 'react-icons/fa'
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Form_project_update = () => {

  const { projId } = useParams();
    
  const [projData, setProjData] = useState(null);
  
  useEffect(() => {
      axios
          .get(`http://localhost:3000/projet/${projId}`)
          .then((res) => {
              setProjData(res.data);
              setFormData({
                titre_project: res.data.titre_project,
                contenu_project: res.data.contenu_project,
                zone_project: res.data.zone_project,
              });
          })
          .catch((err) => console.error(err));
  }, [projId]);

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    titre_project: '',
    contenu_project:'',
    zone_project: '',
  });
  

  const [photoCounter, setPhotoCounter] = useState(0);
  
  const resetForm = () => {
    setFormData({
        titre_project: '',
        contenu_project: '',
        zone_project: '',

    });
/*     setSelectedFile(null); */
  };
  
  const handleSubmit = (e) => {
      e.preventDefault();
      axios
          .put(`http://localhost:3000/projet/${projId}`, formData)
          .then((res) => {
              console.log('Response data:', res.data);
              toast({
                  title: 'Projet modifié.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
              });
          })
          .catch((err) => {
              console.error('Error:', err);
          });
          navigate('/Project');
  };

      
      const toast = useToast() 
      const [photos, setPhotos] = useState([]);


      const handlePhotoChange = (event) => {
        setFormData({
          ...formData,
        });
        const files = event.target.files;
        setPhotoCounter(files.length);
        const newPhotos = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = () => {
            newPhotos.push(reader.result);
            if (newPhotos.length === files.length) {
              setPhotos([...photos, ...newPhotos]);
            }
          };
          reader.readAsDataURL(file);
        }
      };
    
      const handleRemovePhoto = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
        setPhotoCounter(updatedPhotos.length);
      };



  return (
      <form onSubmit={handleSubmit}>
         
      <div className="flex max-w-5xl gap-2">
  
          <div className=" w-1/2 p-5 shadow-lg">
              <h4 className="mb-5 font-semibold">Un project a realiser ?</h4>
              <InputFields
                  label="H1"
                  name="titre_project"
                  placeholder="Titre du project"          
                  value={formData.titre_project}
                      onChange={(e) => setFormData({ ...formData, titre_project: e.target.value })}
                
                />
                <TextArea 
                  label="P"
                  name="contenu_project"
                  placeholder="Contenu"       
                  value={formData.contenu_project}
                  onChange={(e) => setFormData({ ...formData, contenu_project: e.target.value })}
          
                />
               <InputFields
                  label="Zone d'activite"
                  name="zone_project"
                  placeholder="Zone d'activite"      
                  value={formData.zone_project}
                  onChange={(e) => setFormData({ ...formData, zone_project: e.target.value })}
            
                />
            
  
              <div className="mb-5 w-full">
                  Les objectifs
                  <div className=" mb-5 obj_container">
                    
                  </div>
  
                  <div className="mb-5 w-full">
                      <div className="flex justify-end items-end">
                          <div className="mb-5 w-12 h-12 cursor-pointer flex justify-center items-center  input-field add-obj" id="objadder">
                              <i className=" fa fa-plus"></i>
                          </div>
                      </div>
                     
                  </div>
              </div>
  
  
          </div>
  
          <div className=" w-1/2 p-5 shadow-lg">
              <h4 className="mb-5 font-semibold">Galerie photo </h4>
  
              <div className=" mb-5 grid grid-cols-4 gap-1"  id="photosContainer">
                  {photos.map((photo, index) => (
                    <div key={index} className="group relative w-full h-32 text-center align-middle my-auto items-center rounded-lg bg-slate-200 text-slate-200 cursor-pointer">
                      <img src={photo} alt="" className="w-full h-full object-contain" />
                      <div className="absolute top-0 right-0 hidden group-hover:block" onClick={() => handleRemovePhoto(index)}>
                        <FaTrashAlt  className='text-red-500'/>
                      </div>
                    </div>
                  ))}
                  <div className="flex relative w-full h-32 text-center align-middle my-auto items-center rounded-lg bg-slate-300 text-slate-200 cursor-pointer" id="adderphoto">
                      <label htmlFor="otherphotoInput" className="mx-auto my-auto text-lg relative w-5 h-5 cursor-pointer">
                          <FaPlus className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-7xl" />
                          <input type="file" id='otherphotoInput' accept='image/png,image/jpeg' onChange={handlePhotoChange}  multiple className='hidden'/>
                      </label>
                  </div>  
                  
                  
                  
                  
              </div>
                  
             
  
              <div className='my-5 flex justify-center mr-5 gap-2'>
                  <button className='flex justify-around items-center border-2 border-green-500 text-green-500 px-10 py-2 hover:bg-green-500 hover:text-white transition-colors '>Enregistrer</button>                
                  <button className='flex justify-around items-center border-2 border-slate-500 text-slate-500 px-10 py-2 hover:bg-slate-500 hover:text-white transition-colors 'onClick={resetForm}>Annuler</button>                
             
              </div>
              
               
           
          
              </div>
          
   
      </div>
  </form>

  )
}

export default Form_project_update
