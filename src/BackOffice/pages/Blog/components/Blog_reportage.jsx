import React from 'react';

const Blog_reportage = ({ blog })  => {
  return (
   <>
    <div className="mb-5 mx-auto bounceInLeft max-w-5xl">
            <iframe width="560" height="315" src={blog.url_blog} frameBorder="0" allowFullScreen></iframe>
      </div>
          
   </>
  )
}

export default Blog_reportage
