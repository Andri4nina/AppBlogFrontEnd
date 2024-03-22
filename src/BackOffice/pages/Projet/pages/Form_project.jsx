import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import InputFields from '../../../../components/InputField';
import TextArea from '../../../../components/TextArea';



const Form_project = () => {
    const [photoCounter, setPhotoCounter] = useState(0);
    const [photos, setPhotos] = useState([]);
    const toast = useToast() 
    const navigate = useNavigate();
    const [objectives, setObjectives] = useState([]);
    const [nextId, setNextId] = useState(1);


    
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

    const [formData, setFormData] = useState({
        titre_project: '',
        contenu_project: '',
        zone_project: '',
        status_project: "En cours",
        
      });
      
      
      const resetForm = () => {
        setFormData({
            titre_project: '',
            contenu_project: '',
            zone_project: '',
            status_project: "En cours",
        });
    /*     setSelectedFile(null); */
      };
      
      
      const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await onAdd(formData);
            await getTheLastProjet();
            const projectId = await getTheLastProjet();
            for (const objective of objectives) {
                await addObj(objective.value, projectId); 
            }
    
            resetForm();
            navigate('/back/Project');
        } catch (error) {
            console.error('Error in handleSubmit:', error);
            // Gérer l'erreur si nécessaire
        }
    };
    
    
      
      
      
      const onAdd = (formData) => {
        axios.post('http://localhost:3000/projet', formData)
            .then( () => {
                toast({
                    title: 'Projet ajouté avec succès.',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });

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
    
    
    useEffect(() => {
      getTheLastProjet();
  }, []);
  
  const getTheLastProjet = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/projet/give/thelastest`);
        const projectId = response.data._id;
        return projectId; 
    } catch (error) {
        console.error('Error fetching latest project:', error);
        throw error; // Rejette l'erreur pour propager l'exception
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
      
     

  return (
   <>
   
          <form onSubmit={handleSubmit}>
       
            <div className="mx-auto flex max-w-5xl gap-2">

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
                        <button className='flex justify-around items-center border-2 border-slate-500 text-slate-500 px-10 py-2 hover:bg-slate-500 hover:text-white transition-colors 'onClick={resetForm}>Annuler</button>                
                   
                    </div>
                    
                     
                 
                
                    </div>
                
         
            </div>
        </form>
   
   
   </>
  )
}

export default Form_project
