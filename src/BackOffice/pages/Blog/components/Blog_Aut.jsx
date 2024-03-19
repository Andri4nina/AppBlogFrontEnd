import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Blog_Aut = ({ blogs , setBlogs  }) => {



function formatDate(date) {
  const formattedDate = new Date(date);
  
  const year = formattedDate.getFullYear(); 
  const month = formattedDate.getMonth() + 1; 
  const day = formattedDate.getDate(); 

  // Formate la date pour l'afficher au format "YYYY-MM-DD"
  const formattedDateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
  return formattedDateString;
}

// Exemple d'utilisation :
const createdAtDate = formatDate(blogs.createdAt);
const publishDate = formatDate(blogs.date_publi_blog);


  const [user, setUser] = useState(null);

  useEffect(() => {
    // Effectuez une requête à votre API pour obtenir les données de l'utilisateur
    axios.get(`http://localhost:3000/user/${blogs.user_id}`)
      .then((res) => setUser(res.data) )
      .catch((err) => console.error(err));
  }, [blogs.user_id]);
  
  



  return (
    <>
     <div className='w-full'>
        <div className='flex justify-between items-center border-b h-12'>
            <p className='w-5/12 text-slate-400'>Auteur:</p>
            {user && <p className='w-7/12 text-wrap'>{user.firstName_user}</p>}
        </div>
        <div className='flex justify-between items-center border-b h-12'>
            <p className='w-5/12 text-slate-400'>Date de creation:</p>
            <p className='w-7/12'>{createdAtDate}</p>
        </div>
        <div className='flex justify-between items-center border-b h-12'>
            <p className='w-5/12 text-slate-400'>Date de publication:</p>
            <p className='w-7/12'>{publishDate}</p>
        </div>
        <div className='flex justify-between items-center border-b h-12'>
            <p className='w-5/12 text-slate-400'>Status:</p>
            <p className='w-7/12'>{blogs.status_blog}</p>
        </div>
    </div>
  
    
  
    
    </>
  )
}

export default Blog_Aut
