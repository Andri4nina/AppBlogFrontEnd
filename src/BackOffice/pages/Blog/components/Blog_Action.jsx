import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Blog_Action =   ({ blogs , setBlogs  }) => {
  const [publishStatus, setPublishStatus] = useState(blogs.publish_blog);

  const handlePublishStatusChange = (event) => {
    setPublishStatus(event.target.checked);
    handleSubmit()
  };
  
  const handleSubmit = (e) => {
  
    const formData = {
      publish_blog: !publishStatus, 
      date_publi_blog: publishStatus ? null : new Date().toISOString(), 
      status_blog: publishStatus ? 'Pret' : 'Publier' 
    };

    axios.put(`http://localhost:3000/blog/${blogs._id}`, formData)
      .then((res) => {
       
        setBlogs(prevBlogs => prevBlogs.map(blog => blog._id === blogs._id ? { ...blog, ...formData } : blog));
        const toastMessage = publishStatus ? 'Blog en attente de publication.' : 'Blog publie.';
        const toastStatus = publishStatus ? 'info' : 'success';
      
        toast({
          title: toastMessage,
          status: toastStatus,
          duration: 9000,
          isClosable: true,
        });
       
      })
      .catch((err) => {
        console.error('Error:', err);
      });   
  };
  
  const Delete = () =>{
    axios.delete(`http://localhost:3000/blog/${blogs._id}`)
    .then((res) => {
        setBlogs(prevBlogs => prevBlogs.filter(b => b._id !== blogs._id));
        toast({
          title: 'Blog supprimer.',
          status: 'success',
          duration: 9000,
          isClosable: true,
        }) 
      })
      .catch((err) => console.log(err));
  }
  
  
  
  
  

const toast = useToast()

  return (
    <>
    <div className='w-full'>
        <div className=' flex justify-between items-center border-b h-12'>
            <p className='flex justify-center items-center text-slate-400'>Publier</p>
            <form >
              <div className="flex justify-end items-center  prvlg-switcher">
                  <input className="form-checkbox" type="checkbox"  id={`publishCheckbox_${blogs._id}`}
                name={`publish_blog_${blogs._id}`} onChange={handlePublishStatusChange} disabled={!blogs.approb_blog}  checked={blogs.publish_blog}/>
                  <label className="ml-2" htmlFor={`publishCheckbox_${blogs._id}`}> </label>
              </div>
            </form>
        </div>

        <div className='flex justify-between  gap-5  border-b h-12'>
        <p className='flex justify-center items-center text-slate-400'>Action</p>
        <div className='flex justify-end items-center gap-5'>
        <div className='w-auto'>
                <input type="hidden" name="the_user" />
                <Link to={`edit/${blogs._id}`}>
                  <button className="border px-2 py-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white font-bold ">
                <FaPen />
                </button>   
                </Link>
                         
            </div>
            <div className='w-auto'>
                <input type="hidden" name="the_user" />
                <button className="border px-2 py-1 text-red-500 border-red-500 hover:bg-red-500 hover:text-white font-bold "   onClick={Delete}>
                  <FaTrash />
                </button>            
            </div>
            
        </div>
           
            
        </div>
    </div>
   
   </>
  )
}

export default Blog_Action
