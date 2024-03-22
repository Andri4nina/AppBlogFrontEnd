import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Salut = () => {


  const [userData, setUserData] = useState(null); 

  useEffect(() => {
  
    const userDataFromLocalStorage = localStorage.getItem('TheUser');
    if (userDataFromLocalStorage) {
      const userDataObject = JSON.parse(userDataFromLocalStorage); 
      setUserData(userDataObject); 
    }
  }, []);

  return (
    <>
    <div className="p-10 w-full lg:w-2/4 shadow-lg mb-2">
        <h3 className="font-semibold text-xl dash-hello">Bonjour {userData ? userData.firstName_user : ''} </h3>
        <br/>
        <br/>
              
        <p className="pb-10 text-xs">Une belle journee aujourd'hui vous pouvez verifier toute les taches a faire </p>
        <br/>
        <Link to="Tache" ><button className="flex justify-center items-center gap-2 bg-skin-color1 px-8 py-4 text-white text-xs"><span>Nouvelles taches</span><i className="bx bx-plus"></i>   </button></Link>
    </div>
    </>
  )
}

export default Salut
