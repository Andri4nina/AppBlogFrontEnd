import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Searchbar from '../../../components/Searchbar';
import Card_Add_User from '../components/Card_Add_User';
import Card_user from '../components/Card_user';

const List_user = () => {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);


/* Lister les utilisateur */
  const fetchUsers = (keyword = '') => {
    axios
      .get(`http://localhost:3000/user?keyword=${keyword}`)
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
     <section>
        <Searchbar  onSearch={fetchUsers} />
        <div className=' grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
            <Link to="Formulaire">
              <Card_Add_User />
            </Link>
             {users.map && users.map((user) => (
              <Card_user key={user._id} user={user} setUsers={setUsers}  />
            ))} 
        </div>
    </section>
    </>
  )
}

export default List_user
