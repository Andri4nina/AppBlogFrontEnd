import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const Blog_general = ({ blogs ,setBlogs }) => {
  const toast = useToast() 
  const [approuveStatus, setApprouveStatus] = useState(blogs.approb_blog);


  const handleApprove = (event) => {
    setApprouveStatus(event.target.checked);
    handleSubmit()
  }
  
  const handleSubmit = (e) => { 
    const formData = {
      approb_blog: !approuveStatus,
      status_blog: approuveStatus ? 'En Attente' : 'Pret'
    };
  
    axios.put(`http://localhost:3000/blog/${blogs._id}`, formData)
      .then((res) => {
        setBlogs(prevBlogs => ({
          ...prevBlogs,
          [blogs._id]: { ...prevBlogs[blogs._id], ...formData }
        }));
        // Condition pour afficher le toast en fonction du statut d'approbation
      const toastMessage = approuveStatus ? 'Blog en attente d\'approbation.' : 'Blog approuvé.';
      const toastStatus = approuveStatus ? 'info' : 'success';
      toast({
        title: toastMessage,
        status: toastStatus,
        duration: 9000,
        isClosable: true,
      });
      })
      .catch((err) => {
        console.error('Error:', err);
      });

  };

  return (
    <>
   
        <div className="mb-5 ">
                <div className="w-10/12 relative mb-5  max-w-5xl  w-full h-80">
                    <img src="" alt="" className="absolute top-0 left-0 w-full h-full"/>
                    <div className="text-5xl absolute bottom-3 font-semibold right-3">
                    {blogs.titre_blog}
                    </div>
                    
                </div>
                <div className="max-w-5xl  bounceslideInFromRight">
                    <h4 className="text-lg font-semibold">{blogs.titre_blog}</h4>
                    <h5 className="text-lg font-semibold blog-subtitle">{blogs.sous_titre_blog}</h5>
                    <p>
                        {blogs.contenu_blog}
                    </p>
            </div>
            
            <div>
            <form >
              <div className="my-5 flex  items-center  prvlg-switcher">
                <p>Approbation</p>
                  <input className="form-checkbox" type="checkbox"  id={`approuveCheckbox`} checked={approuveStatus} onChange={handleApprove}/>
                  <label className="ml-2" htmlFor={`approuveCheckbox`}> </label>
              </div>
            </form>
        </div>
      </div>
    

  
    
    </>
  )
}

export default Blog_general
