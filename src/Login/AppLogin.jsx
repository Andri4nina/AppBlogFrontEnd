import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import InputFields from '../components/InputField';




const AppLogin = (  ) => {
      const toast = useToast()
      const [userName , setUserName] = useState("");
      const [Email , setEmail] = useState("");
      const [password , setPassword] = useState("");
      const navigate = useNavigate();
      
      const handleLogin = async (e) => {
      e.preventDefault()
        try {
          const response = await axios.post('http://localhost:3000/auth/login', {
            email_user: Email,
            mdp_user: password
          });
          const token = response.data.token;
          localStorage.setItem('token', token);
          toast({
            title: 'Connexion réussie. Bienvenue',
            status: 'success',
            duration: 3000,
          });
          navigate('/back');
        } catch (err) {
          if (err.response && err.response.status === 401) {
            toast({
              title: 'Informations d\'identification incorrectes',
              status: 'error',
              duration: 3000,
            });
          } else {
            toast({
              title: 'Une erreur s\'est produite. Veuillez réessayer plus tard.',
              status: 'error',
              duration: 3000,
            });
          }
        }
      };
      
    
    
    
    
  return (
   <>
    <section className='realtive h-screen flex justify-center items-center'>
        <form  className='relative z-20 w-full sm:w-1/2 shadow-lg py-5 px-2'>
            <div className='flex justify-center items-center gap-5 mt-5 mx-auto w-10/12'>
                <div className='w-32 h-32 rounded-full'>
                <img src="/img/static/logo.png" alt="" className='h-full w-full object-contain'/>
                
                </div>
                <h2 className='text-3xl font-extrabold'>Logo</h2>
            </div>
            <div>
                <InputFields   
                 label="Nom"
                 name="firstName_user"
                 placeholder="Nom d'utilisateur"
                 value={userName}
                 onChange={(e) =>{
                  setUserName(e.target.value)
               }}
                 required
                 />
                <InputFields  
                label="Email"
                 name="email_user"
                 placeholder="Andrianina@exemple.com"
                 value={Email}
                 onChange={(e) =>{
                  setEmail(e.target.value)
               }}
                 required
                 />
                <InputFields 
                 label="Mot de passe"
                 name="mdp_user"
                 placeholder="Mots de passe"
                 type="password"
                 value={password}
                 onChange={(e) =>{
                    setPassword(e.target.value)
                 }}
                 required
                 />
            </div>
            
            <div className='flex justify-center my-10'>
                <button 
                        className='flex justify-around items-center border-2
                        border-green-500 text-green-500 px-10 py-2 hover:bg-green-500
                        hover:text-white transition-colors ' type='submit' onClick={handleLogin}>Se connecter
                </button>
            </div>
           
        </form>
        <div className='absolute z-0 bottom-0 right-1/2 translate-x-1/2' >
        </div>  
    </section>
  
   </>
  )
}

export default AppLogin
