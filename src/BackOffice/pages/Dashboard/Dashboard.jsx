import React from 'react';

import Connect_user from './components/Connect_user';
import DateTime from './components/DateTime';
import Mini_Card from './components/Mini_Card';
import Publication_count from './components/Publication_count';
import Salut from './components/Salut';
import Stat_Creation_blog from './components/Stat_Creation_blog';
import Stat_partenaire from './components/Stat_partenaire';
import Task_list_dash from './components/Task_list_dash';
import Visite_number from './components/Visite_number';

const Dashboard = () => {
  return (
   <>
     <section className='min-h-screen pt-20 max-w-7xl mx-auto'>
        <hr className='my-5'/>
        <div className="block lg:flex gap-2 mb-5 mx-6 ">
          <Salut />
          <div className="flex w-full lg:w-2/4 gap-2 " >
            <Visite_number/>
            <Publication_count />
          </div>
        
        </div>
        <div className="block lg:flex gap-2 mb-5 mx-6 ">
          <Stat_Creation_blog />
          <div className="w-full lg:w-2/6">
                <div className="block sm:flex gap-2 mb-5">
                    <Mini_Card />
                    <Mini_Card /> 
                </div>
                <DateTime />
            </div>
        </div>
        <div className="  sm:flex gap-2 mb-5 mx-6 ">
          <Stat_partenaire/>
          <Connect_user />
          <Task_list_dash />
        </div>
        
   </section>

   </>
  )
}

export default Dashboard
