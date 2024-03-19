



import { Outlet  } from 'react-router-dom';

const Project = () => {
 
  return (  
   <>
    <section className='min-h-screen pt-20 max-w-7xl mx-auto'>
          <hr className='my-5'/>
        
          <Outlet /> 
     </section>
   </>
  )
}

export default Project
