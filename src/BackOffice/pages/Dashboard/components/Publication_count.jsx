import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaNewspaper } from 'react-icons/fa';

const Publication_count = () => {
  const [publicationCount, setPublicationCount] = useState(0);
  useEffect(() => {
    const fetchPublicationCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/blog/count/AllBlog'); // Remplacez l'URL par celle de votre API
        setPublicationCount(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre de publications :', error);
      }
    };

    fetchPublicationCount();
  }, []);
  const { count } = publicationCount;
  
    return (
      <div className="w-1/2 p-5 shadow-lg mb-2 ">
        <div className="mb-5 text-3xl font-bold text-skin-color1">
          <FaNewspaper />
        </div>
        <br/>
        <span className="mt-5 text-base font-semibold">Nombre de publication</span>
        <br/> <br/> <br/>
  
        <div className="mt-8">
          <div className="font-semibold text-base ">
            {count}
          </div>
        </div>
      </div>
    );
  };

export default Publication_count
