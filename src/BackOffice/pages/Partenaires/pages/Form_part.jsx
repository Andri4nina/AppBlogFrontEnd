import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { FaCamera, FaHandshake } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import InputFields from '../../../../components/InputField';
import TextArea from '../../../../components/TextArea';

const Form_part = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(null);
  const [partenaires, setPartenaires] = useState([]);

  const [formData, setFormData] = useState({
    nom_partenaire: '',
    abbrev_partenaire: '',
    histoire_partenaire: '',
    siteOff_partenaire: "",
    logo_partenaire: "",
    status_partenaire: false,
    couv_partenaire: "",
    type_partenaire: "",
  });
  
  const resetForm = () => {
    setFormData({
      nom_partenaire: '',
      abbrev_partenaire: '',
      histoire_partenaire: '',
      siteOff_partenaire: "",
      logo_partenaire: "",
      status_partenaire: false,
      couv_partenaire: "",
      type_partenaire: "",
    });
    setSelectedFile(null);
  };
  



  const handleAddPhoto = () => {
    document.getElementById('part_logo').click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();          
        onAdd(formData);
        resetForm(); 
        navigate('/Partenaire');
      };
      
      const toast = useToast() 
    
      const onAdd = (formData) => {
        axios.post('http://localhost:3000/partenaire', formData)
          .then((res) => {
            setPartenaires([...partenaires, res.data]);
            toast({
                title: 'partenaire creer.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              }) 
          })
          .catch((err) => {
            console.error('Error:', err);
            
          });
      };
  
  
  

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
    <div className="flex max-w-5xl gap-2">

        <div className="shadow-lg w-1/2 p-5 ">
            <h4 className="mb-5 font-semibold">Nouveau partenaire</h4>
            <InputFields
                label="Nom du partenaire"
                name="nom_partenaire"
                placeholder="Nom du partenaire"
                value={formData.nom_partenaire}
                onChange={(e) => setFormData({ ...formData, nom_partenaire: e.target.value })}
            />
            
              <InputFields
                  label="Abbreviation"
                  name="abbrev_partenaire"
                  placeholder="Abbreviation"
                  value={formData.abbrev_partenaire}
                  onChange={(e) => setFormData({ ...formData, abbrev_partenaire: e.target.value })}
              />
              
              <TextArea
                  label="Histoire du partenaire"
                  name="histoire_partenaire"
                  placeholder="Histoire du partenaire"
                  value={formData.histoire_partenaire}
                  onChange={(e) => setFormData({ ...formData, histoire_partenaire: e.target.value })}
              />
              
              <InputFields
                  label="URL"
                  name="siteOff_partenaire"
                  placeholder="Site officiel du partenaire"
                  value={formData.siteOff_partenaire}
                  onChange={(e) => setFormData({ ...formData, siteOff_partenaire: e.target.value })}
              />
         

         <div className="mb-5 mx-auto border-b w-10/12 flex justify-center items-center">
              <div className="w-4/12 relative flex justify-center">
                <FaHandshake />
              </div>
              <select
                name="partenaire-type"
                id=""
                className="p-5 w-9/12 outline-none bg-none"
                value={formData.type_partenaire}
                onChange={(e) => setFormData({ ...formData, type_partenaire: e.target.value })}
            >
                <option value="">Sélectionnez le type de partenaire</option>
                <option value="Economique">Economique</option>
                <option value="Education">Education</option>
                <option value="Communautaire">Communautaire</option>
            </select>

          </div>
        </div>

        <div className=" w-1/2 p-5 shadow-lg">
            <h4 className="mb-5 font-semibold">Logo</h4>
            <div className="my-5 flex justify-center items-center">
                <div className="relative bg-slate-100 rounded-full h-20 w-20">
                <div className='w-full h-full rounded-full overflow-hidden'>
                    <img
                            src={selectedFile ? URL.createObjectURL(selectedFile) : "{{asset( 'images/sans-image/nopdp.png') }}"}
                            alt=""
                            className="h-full w-full object-cover border "
                          />
                    </div>
              
                    <label 
                        className="cursor-pointer absolute bottom-0
                                    right-0 flex justify-center items-center" 
                        htmlFor="part_logo"
                        onClick={handleAddPhoto}
                        >
                        <FaCamera className="text-white bg-slate-300 border border-gray-300 rounded-full bx bx-camera" />
                    </label>
                    <div className="hidden">
                        <input type="file" id="part_logo" name="part_logo" accept="images/*" onChange={handleFileChange}/>
                    </div>
                </div>
            </div>
       
            
            <h5>Photo de couverture</h5>
                    <div>
                      <label htmlFor="file" className="w-full h-52 flex flex-col items-center gap-2 cursor-pointer justify-center border-dashed border-2 border-slate-300 bg-black-100 p-5 rounded-md shadow-lg ">
                      <div className="flex items-center justify-center">
                      <svg className='h-20 fill-slate-300 ' viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
                      </div>
                      <div className="flex items-center justify-center ">
                         <span className='font-normal text-black-700'>Cliquer pour ajouter une image</span>
                         </div>
                         <input className='hidden' id="file" type="file" />
                      </label>
                    </div>
            <br/>
            <br/> 
          
                
            <div className='my-5 flex justify-center gap-2 mr-5'>
                    <button className='flex justify-around items-center border-2 border-green-500 text-green-500 px-10 py-2 hover:bg-green-500 hover:text-white transition-colors '>Enregistrer</button>                
                    <button className='flex justify-around items-center border-2 border-slate-500 text-slate-500 px-10 py-2 hover:bg-slate-500 hover:text-white transition-colors ' type='reset'>Annuler</button>                
        
            
            </div>
        </div>

    </div>
</form>
  )
}

export default Form_part
