import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import InputFields from '../../../../components/InputField';
import TextArea from '../../../../components/TextArea';

const Form_project_update = () => {

  const { projId } = useParams();
    
  const [projData, setProjData] = useState(null);
  const [objectifData, setObjectifData] = useState([]); 
  const [objectives, setObjectives] = useState([]);
  const [nextId, setNextId] = useState(1);
  const [hiddenObj, setHiddenObj] = useState([]);
  
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
          
          
          fetchObjectif()  
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
    fetchObjectif()
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
              objectives.forEach(objective => {
                addObj(objective.value, projId);
              });
              
              hiddenObj.forEach(id => {
                axios.delete(`http://localhost:3000/objectif/${id}`)
                  .then(() => {
                    console.log(`Objectif avec l'ID ${id} supprimé.`);
                  })
                  .catch((err) => {
                    console.error(`Erreur lors de la suppression de l'objectif avec l'ID ${id}:`, err);
                  });
              });
          })
          .catch((err) => {
              console.error('Error:', err);
          });
          navigate(`/back/Project/detail/${projId}`);
        
          
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
      
      
      
      const fetchObjectif = async () => {
        try {
          const res = await axios.get(`http://localhost:3000/objectif/get/${projId}`);
          setObjectifData(res.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des objectifs:', error);
          }
      };
      
      
      
       const addObj = (objectiveValue, projectId) =>{
        console.log(projectId);
        console.log('hi')
        axios.post('http://localhost:3000/objectif', {
            libele_obj: objectiveValue,
            status_obj: "waiting",
            projId: projectId
        })
      } 
      
      
       
    const DeleteObj = (e) =>{
      e.preventDefault();
      axios.delete(`http://localhost:3000/objectif/${projId}`)
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
    }

      
      
      
      
      const enumObj = () =>{
        const inputElement = document.querySelector('#objadd');
        const objective = {
            id: nextId,
            value: inputElement.value
        };
        setObjectives(prevObjectives => [...prevObjectives, objective]);
        setNextId(nextId + 1); 
        inputElement.value = '';
      } 
      
      
      const delObj = (id) => {
        setObjectives(prevObjectives => prevObjectives.filter(obj => obj.id !== id));
    };
      
   
    const AddDelListObj = (id) => {
      setHiddenObj(prevHiddenObj => [...prevHiddenObj, id]);
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
                            <div className='flex justify-around gap-2 items-center'>
                                <div className='w-3/4'>
                                    <input type="text" id='objadd'  className='bg-none outline-none w-full border-b-2 p-5'
                                    />
                                </div>
                                <p className='cursor-pointer p-5 flex justify-center items-center h-auto w-1/4 shadow-xl border' onClick={enumObj}>
                                    <FaPlus />
                                </p>
                            </div>
                            <ul className='mt-5'>
                             
                              {objectifData.map((objective) => (
                                      <li key={objective._id}  className={`my-5 ${hiddenObj.includes(objective._id) ? 'hidden' : ''}`}>
                                         <div className='flex justify-around gap-2 items-center'>
                                              <div className='w-3/4 bg-slate-200 p-5 rounded-lg'>
                                                <p>{objective.libele_obj}</p>
                                              </div>
                                              <p className='cursor-pointer p-5 flex justify-center items-center h-auto w-1/4 shadow-xl border' onClick={() =>  AddDelListObj(objective._id)}>
                                                  <FaMinus />
                                              </p>
                                          </div>
                                      </li>
                                  ))}
                                {objectives.map((objective, index) => (
                                    <li key={index} className='my-5'>
                                       <div className='flex justify-around gap-2 items-center'>
                                            <div className='w-3/4 bg-slate-200 p-5 rounded-lg'>
                                              <p>{objective.value}</p>
                                            </div>
                                            <p className='cursor-pointer p-5 flex justify-center items-center h-auto w-1/4 shadow-xl border'  onClick={() => delObj(objective.id)}>
                                                <FaMinus />
                                            </p>
                                        </div>
                                    </li>
                                ))}
                               
 
                            </ul>
          
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
                  <button className='flex justify-around items-center border-2 border-slate-500 text-slate-500 px-10 py-2 hover:bg-slate-500 hover:text-white transition-colors 'type='reset' onClick={resetForm}>Annuler</button>                
             
              </div>
              
               
           
          
              </div>
          
   
      </div>
  </form>

  )
}

export default Form_project_update
