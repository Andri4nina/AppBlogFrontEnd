import { Avatar } from '@chakra-ui/react';
import React from 'react';

const Profil_Personal_User = ({ userData }) => {
  const {
    name_user,
    firstName_user,
    email_user,
    Tel_user,
    pdp_user,
    role_user,
  } = userData;
  
  return (
    <div className="shadow-lg w-1/2 p-5 crud-card">
        <h4 className="text-center font-semibold">Information personnel de l'utilisateur</h4>
        <hr className='my-5 w-10/12 mx-auto'/>
        <div className="my-5 flex justify-center items-center">
            <div className="bg-red-300 relative w-auto h-auto rounded-full overflow-hidden">
                <Avatar width={ 20 } height= {20 }  name={firstName_user} />
            </div>
        </div>
        <div className="mb-5 flex justify-start items-center">
            <div className="w-1/12"><i className="">@</i></div>
            <span>{`${name_user} ${firstName_user} `} </span>
        </div>
        <div className="mb-5 flex justify-start items-center">
            <div className="w-1/12"><i className="bx bx-envelope"></i></div>
            <span>{email_user}</span>
        </div>

        <div className="mb-5 flex justify-start items-center">
            <div className="w-1/12"><i className="bx bx-badge"></i></div>
            <span>{role_user}</span>
        </div>

        <div className="mb-5 flex justify-start items-center">
            <div className="w-1/12"><i className="bx bx-phone"></i></div>
            <span>{Tel_user}</span>
        </div>
    </div>
  )
}

export default Profil_Personal_User
