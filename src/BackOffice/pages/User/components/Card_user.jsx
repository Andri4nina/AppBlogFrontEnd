import { Avatar, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Card_user =  ({ user , setUsers  }) => {
  const Delete = () =>{
    axios.delete(`http://localhost:3000/user/${user._id}`)
    .then((res) => {
        setUsers(prevUsers => prevUsers.filter(u => u._id !== user._id));
        toast({
          title: 'Utilisateur supprimer.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) 
      })
      .catch((err) => console.log(err));
  }

  const toast = useToast()

  return (
    <div className="overflow-hidden group relative flex justify-center w-full h-40 shadow-lg mt-5 hover:shadow-none transition peer">
    <div className="relative overflow-hidden bg-green-200 w-1/3 flex justify-center items-center">
      <Avatar width={200} height={ 250 } size='md'  name={user.firstName_user} className='avatar'  />
    </div>
    <div className="w-2/3 py-8 px-6">
      <div>
        <h2 className="font-bold cursor-pointer">
          <Link to={`profil/${user._id}`}>{user.name_user} <br /> {user.firstName_user}</Link>
        </h2>
        <p className="font-semibold italic">{user.role_user}</p>
        <span>{user.email_user}</span>
      </div>
    </div>
    <div className="absolute bottom-1 right-5 opacity-0 cursor-auto group-hover:opacity-100 group-hover:cursor-pointer transition-all">
      <div className="flex gap-1 justify-between">
      <Link to={`edit/${user._id}`}>
        <button className="border p-2 hover:text-white border-blue-500 hover:border-blue-900 hover:bg-blue-900  text-blue-500 transition-colors">
            <FaPen  />
        </button>
      </Link>
       
        <button
          onClick={Delete}
          className="border p-2 hover:text-white border-red-500 hover:border-red-900 hover:bg-red-900  text-red-500 transition-colors" >
              <FaTrash />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Card_user
