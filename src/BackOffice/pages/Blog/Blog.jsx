import { Outlet } from 'react-router-dom';

const Blog = () => {
  return (
   <>
    <section className='min-h-screen pt-20 max-w-7xl mx-auto'>
        <hr className='my-5'/>
        <Outlet /> 
   </section>
   </>
  )
}

export default Blog
