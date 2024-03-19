import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSearch }) => {

  const [keyword, setKeyword] = useState('');

  const handleChange = (e) => {
    const newKeyword = e.target.value;
    setKeyword(newKeyword);
    onSearch(newKeyword); // Appeler la fonction de recherche à chaque changement dans l'entrée
  };
  return (
    <div className='w-full  flex'>
        <form className='w-full flex' >
          <input 
              type="search " 
              className='w-11/12 border-b bg-transparent outline-none' 
              placeholder='Rechercher...' 
              onChange={handleChange} />
          <button 
                className='flex justify-around items-center 
                          border-2 border-green-500 text-green-500 px-10 py-2
                          hover:bg-green-500 hover:text-white transition-colors '
              
          >
            <FaSearch  />
          <span className='hidden md:block'>Chercher</span></button>
        </form>
    </div>
  )
}

export default Searchbar
