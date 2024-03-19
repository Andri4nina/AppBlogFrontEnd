import { Avatar } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';



const Connect_user = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios
          .get('http://localhost:3000/user')
          .then((res) => {
           
            setUsers(res.data);
          })
          .catch((err) => {
            console.error('Error:', err);
            if (err.response) {
              console.error('Error response:', err.response.data);
            }
          });
      };
      
  return (
   <>
    <div className="sm:w-1/3 p-5 shadow-lg mb-2 h-96">
        <h3 className="text-sm mb-5 font-semibold">Listes des Utilisateurs</h3>
        <div className="overflow-y-hidden h-full">
            <ul className="overflow-y-scroll h-5/6">
                {users.map && users.map((user) => (
                    <li  key={user._id} className="text-xs my-5 flex justify-between ">
                    <div className="flex gap-2 justify-center items-center">
                    <div className="bg-red-300 relative w-10 h-10 rounded-full overflow-hidden">
                        <Avatar name={user.firstName_user}  className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl '/>
                    </div>
                        <div>
                            {user.firstName_user} 
                        </div>
                    </div>
                    <div className=" flex gap-2 justify-center items-center text-sm font-bold ">
                    <div>
                      {user.status_user === "online" ? (
                        <div className="bg-green-600 w-3 h-3 rounded-full "></div>
                      ) : (
                        <div className=" bg-slate-600 w-3 h-3 rounded-full "></div>
                      )}
                    </div>

                    </div> 
                </li>
                ))}
            </ul>
        </div>
    </div>
   
   </>
  )
}

export default Connect_user
