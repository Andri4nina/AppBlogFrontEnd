import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Profil_Contribution_User from '../components/Profil_Contribution_User.jsx';
import Profil_Personal_User from '../components/Profil_Personal_User.jsx';
import Profil_Privilege_User from '../components/Profil_Privilege_User.jsx';

const Profil_user = () => {
  const { userId } = useParams(); // Utilisation de useParams pour extraire le paramètre userId de l'URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Effectuez une requête à votre API pour obtenir les données de l'utilisateur
    axios.get(`http://localhost:3000/user/${userId}`)
      .then((res) => setUserData(res.data))
      .catch((err) => console.error(err));
  }, [userId]); // Assurez-vous d'inclure userId dans la liste des dépendances



  return (
   <>
     {userData && (
        <div className='flex flex-wrap'>
          <Profil_Personal_User userData={userData} />
          <Profil_Privilege_User userData={userData} /> 
          <Profil_Contribution_User userData={userData} />
        </div>
      )}
   
   </>
  )
}

export default Profil_user
