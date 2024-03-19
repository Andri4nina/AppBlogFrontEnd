import './Blog_appercu.css';

import React from 'react';



const Blog_appercu =   ({ blogs , setBlogs  })  => {
  function formatDate(date) {
    const formattedDate = new Date(date);
    
    const year = formattedDate.getFullYear(); 
    const month = formattedDate.getMonth() + 1; 
    const day = formattedDate.getDate(); 
  
    // Formate la date pour l'afficher au format "YYYY-MM-DD"
    const formattedDateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    
    return formattedDateString;
  }
  
  
  const publishDate = formatDate(blogs.date_publi_blog);
  return (
   <>
      <div className=" relative max-w-5xl w-full mb-10 rounded-lg text-lg overflow-hidden cursor-pointer Blogcard">
            <div className="absolute top-0 left-0 right-0 bottom-0">
                <img className="absolute top-0 left-0 blog-img" src="" />
                <div className="absolute blog-textbox">
                    <div className="blog-title">{blogs.titre_blog}</div>
                    <div className="blog-subtitle">{blogs.sous_titre_blog}</div>
                    <div className="blog-bar"></div>
                    <div className="blog-description">{blogs.contenu_blog}</div>
                    <div className="blog-tagbox">
                        <span className="blog-tag">{publishDate} </span>
                        <span className="blog-tag">0 Commentaire(s)</span>
                    </div>
                </div>
            </div>
        </div>
    
   </>
  )
}

export default Blog_appercu
