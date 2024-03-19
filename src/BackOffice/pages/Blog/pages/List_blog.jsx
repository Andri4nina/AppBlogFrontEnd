import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Searchbar from '../../../components/Searchbar';
import Blog_Action from '../components/Blog_Action';
import Blog_appercu from '../components/Blog_appercu';
import Blog_Aut from '../components/Blog_Aut';
import Card_add_blog from '../components/Card_add_blog';

const List_blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = (keyword = '') => {
    axios
      .get(`http://localhost:3000/blog?keyword=${keyword}`)
      .then((res) => {
        setBlogs(res.data);
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
      <Searchbar onSearch={fetchBlogs}/>
      <Link to="Formulaire">
          <Card_add_blog />
      </Link>
        {blogs.map && blogs.map((blog) => (
          <div key={blog._id} className='mt-5 block lg:flex justify-center items-center'>
             <div className='w-full lg:w-1/2 cursor-pointer'>
             <Link to={`approuve/${blog._id}`}>
                <Blog_appercu  blogs={blog} setBlogs={setBlogs} />
             </Link>
                 
             </div>
             <div className='w-full lg:w-1/2 flex gap-2 mx-5 justify-between'>
                  <Blog_Aut blogs={blog} setBlogs={setBlogs}/>
                  <Blog_Action blogs={blog} setBlogs={setBlogs}/>
             </div>
         </div>
        ))} 
        
      
   </>
  )
}

export default List_blog
