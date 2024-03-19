import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCamera, FaPlus, FaTrashAlt, FaVideo } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import InputFields from '../../../../components/InputField';
import TextArea from '../../../../components/TextArea';

const From_blog_update = () => {
    const [selectedOption, setSelectedOption] = useState('Publication');
    const toast = useToast();
    const navigate = useNavigate();
    const { blogId } = useParams();
      const [blogData, setBlogData] = useState(null);
      const [photoCounter, setPhotoCounter] = useState(0);
      const [photos, setPhotos] = useState([]);
      

  
  
  const [formData, setFormData] = useState({
    titre_blog: '',
    sous_titre_blog: '',
    contenu_blog: '',
    type_blog: "",
    url_blog: "",
    couv_blog: "",
    status_blog: "",
    approb_blog: false,
    publish_blog: false,
    date_publi_blog: "",
  });
  
  
  useEffect(() => {
    axios
        .get(`http://localhost:3000/blog/${blogId}`)
        .then((res) => {
            setBlogData(res.data);
            setFormData({
                titre_blog: res.data.titre_blog,
                sous_titre_blog: res.data.sous_titre_blog,
                contenu_blog: res.data.contenu_blog,
                type_blog: res.data.type_blog,
                url_blog: res.data.url_blog,
            });
        })
        .catch((err) => console.error(err));
}, [blogId]);

console.log(formData)
const handleSubmit = (e) => {
    e.preventDefault();
    axios
        .put(`http://localhost:3000/blog/${blogId}`, formData)
        .then((res) => {
            console.log('Response data:', res.data);
            toast({
                title: 'Blog modifié.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
        })
        .catch((err) => {
            console.error('Error:', err);
        });
        navigate('/');
};
    
const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };
    
    
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
    <>
       <form onSubmit={(e) => handleSubmit(e)}>
            <div className="block md:flex max-w-5xl gap-2">
                <div className=" md:w-1/2 p-5 mb-5 md:mb-0 shadow-lg">
                      <h4 className="mb-5 font-semibold">Quoi de neuf à partager ?</h4>
                      <InputFields
                          label="H1"
                          name="titre_blog"
                          placeholder="Titre"
                          onChange={handleChange}
                          value={formData.titre_blog} // Ajout de la valeur
                      />
                      <InputFields
                          label="H2"
                          name="sous_titre_blog"
                          placeholder="Sous-titre"
                          onChange={handleChange}
                          value={formData.sous_titre_blog} // Ajout de la valeur
                      />
                  
                      <TextArea
                          name="contenu_blog"
                          onChange={handleChange}
                          value={formData.contenu_blog} // Ajout de la valeur
                      />
                  
                      <div className="mb-5 mx-auto border-b w-10/12 flex justify-center items-center">
                          <div className="w-1/12 relative flex justify-center">
                              <FaCamera className={` ${selectedOption === 'Publication' ? '' : 'hidden'}`} />
                              <FaVideo className={` ${selectedOption === 'Publication' ? 'hidden' : ''}`} />
                          </div>
                          <select
                              name="blog-type"
                              id=""
                              className="p-5 w-11/12 outline-none bg-none"
                              value={selectedOption}
                              onChange={handleSelectChange}
                          >
                              <option className="p-5" value="Publication">
                                  Publication
                              </option>
                              <option value="Reportage">
                                  Reportage
                              </option>
                          </select>
                      </div>
                      <div className={`${selectedOption === 'Publication' ? 'hidden' : ''}`}>
                          <InputFields
                              label="URL"
                              name="blog_url"
                              placeholder="youtube.com"
                              onChange={handleChange}
                              value={formData.blog_url} // Ajout de la valeur
                          />
                      </div>
                </div>
              

                <div className=" min-h-fit md:w-1/2 p-5 shadow-lg">
                    <h4 className="mb-5 font-semibold">Media</h4>
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
                    <div>
                    
                    </div>
                    </div>
                    
                    
                    <hr className='my-5' />
                    <h5 className="my-5">Autre photo</h5>
                    <p className='text-slate-300'>{photoCounter === 0 ? 'Aucune photo ajoutée' : ``}</p>
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
                        
                    <div className='my-5 flex gap-2 justify-center mr-5'>
                      <button className='flex justify-around items-center border-2 border-green-500 text-green-500 px-10 py-2 hover:bg-green-500 hover:text-white transition-colors '>Enregistrer</button>
                      <button className='flex justify-around items-center border-2 border-slate-500 text-slate-500 px-10 py-2 hover:bg-slate-500 hover:text-white transition-colors ' type='reset'>Annuler</button>
                    </div>
                </div>
            </div>
        </form> 
    
    
    
    </>
  )
}

export default From_blog_update
