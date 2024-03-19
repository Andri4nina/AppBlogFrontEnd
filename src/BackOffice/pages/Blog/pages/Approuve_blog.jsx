import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Blog_comment_zone from '../components/Blog_comment_zone';
import Blog_galerie from '../components/Blog_galerie';
import Blog_general from '../components/Blog_general';
import Blog_reportage from '../components/Blog_reportage';

const Approuve_blog = () => {
  const { blogId } = useParams();
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    axios
        .get(`http://localhost:3000/blog/${blogId}`)
        .then((res) => {
            setBlogData(res.data);
        })
        .catch((err) => console.error(err));
}, [blogId]);


  return (
   <>
    <Blog_general blogs={blogData} setBlogs={setBlogData} />
    <Blog_galerie />
    
    
    {blogData && blogData.type_blog === "reportage" ? (
      <Blog_reportage blog={blogData} />
    ) : null}
    
    
    
    <Blog_comment_zone blogs={blogData} />
   </>
  )
}

export default Approuve_blog
