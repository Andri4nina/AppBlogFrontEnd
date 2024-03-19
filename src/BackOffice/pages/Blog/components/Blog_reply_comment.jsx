import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';

const Blog_reply_comment =  ({ blogId }) => {
  const [libelleCom, setLibelleCom] = useState('');
  const toast = useToast(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onAdd(); 
  };
  
  const onAdd = async () => {
    try {
      await axios.post('http://localhost:3000/commentaire/', {
        libelle_com: libelleCom,
        type_com: 'response',
        blog_id: blogId
      });

      // Afficher un toast pour indiquer que le message a été envoyé avec succès
      toast({
        title: 'Message envoyé.',
        status: 'success',
        duration: 5000, // Durée pendant laquelle le toast reste affiché
        isClosable: true, // Permet à l'utilisateur de fermer le toast
      });

      // Réinitialiser le contenu du textarea après l'envoi du commentaire
      setLibelleCom('');
    } catch (error) {
      console.error('Error:', error);
      // Afficher un toast pour indiquer qu'une erreur s'est produite
      toast({
        title: 'Une erreur s\'est produite.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex justify-center items-center input-field">
        <textarea
          name="contenu_com"
          value={libelleCom}
          onChange={(e) => setLibelleCom(e.target.value)}
          cols="30"
          rows="10"
          className="w-11/12 bg-none outline-none border-b-2"
        ></textarea>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="flex justify-around items-center border-2 border-green-500 text-green-500 px-10 py-2 hover:bg-green-500 hover:text-white transition-colors"
        >
          Répondre
        </button>
      </div>
    </form>
  );
};


export default Blog_reply_comment
