import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Comment_visiteur =({ comment, setComments }) => {
    const toast = useToast() 

    const handleDelete = () => {
        axios.delete(`http://localhost:3000/commentaire/${comment.id}`)
          .then(() => {
           
            setComments((prevComments) => prevComments.filter((c) => c.id !== comment.id));
            toast({
                title: 'commentaire supprimer.',
                status: 'success',
                duration: 9000,
                isClosable: true,
              }) 
          })
          .catch((error) => {
            console.error('Error deleting comment:', error);
          
          });
      };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  return (
    <li key={comment.id} className="mb-5 flex flex-row-reverse justify-center items-center blog-comment-card response">
      <div className="h-full w-3/12 blog-visiteur">
        <div className="text-2xl font-semibold blog-visiteur-name">
          MyApp
        </div>
        <div className="text-xs">
          {formatDate(comment.createdAt)}
        </div>
      </div>
      <div className="p-5 w-8/12">
        {comment.libelle_com}
      </div>
      <div className="w-1/12 flex">
        <form onSubmit={handleDelete}>
          <button type="submit">
            <FaTrash className="text-slate-500" />
          </button>
        </form>
      </div>
    </li>
  );
};


export default Comment_visiteur
