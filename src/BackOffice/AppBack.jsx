import { Route, Routes } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Blog from './pages/Blog/Blog';
import Approuve_blog from './pages/Blog/pages/Approuve_blog';
import Form_blog from './pages/Blog/pages/Form_blog';
import Form_blog_update from './pages/Blog/pages/From_blog_update';
import List_blog from './pages/Blog/pages/List_blog';
import Dashboard from './pages/Dashboard/Dashboard';
import Detail_part from './pages/Partenaires/pages/Detail_part';
import Form_part from './pages/Partenaires/pages/Form_part';
import Form_part_update from './pages/Partenaires/pages/Form_part_update';
import List_part from './pages/Partenaires/pages/List_part';
import Partenaire from './pages/Partenaires/Partenaire';
import Detail_project from './pages/Projet/pages/Detail_project';
import Form_project from './pages/Projet/pages/Form_project';
import Form_project_update from './pages/Projet/pages/Form_project_update';
import List_project from './pages/Projet/pages/List_project';
import Project from './pages/Projet/Project';
import Task from './pages/Task/Task';
import Form_user from './pages/User/pages/Form_user';
import Form_user_update from './pages/User/pages/Form_user_update';
import List_user from './pages/User/pages/List_user';
import Profil_user from './pages/User/pages/Profil_user';
import User from './pages/User/User';




const AppBack = () => {
  return (
  <>
  
  <Sidebar />
  
   <Routes>
        <Route path="/" index element={<Dashboard />} />
        <Route path="/Blog" element={<Blog />}>
        <Route index element={<List_blog />} />
        <Route path="Formulaire" element={<Form_blog />} />  
        <Route path='Edit/:blogId' element={<Form_blog_update />}/>
        <Route path='Approuve/:blogId' element={<Approuve_blog />}/>
      </Route>
      <Route path="Utilisateur" element={<User />}>
        <Route index element={<List_user />} />
        <Route path="Formulaire" element={<Form_user />} />
        <Route path="Profil/:userId" element={<Profil_user />} />
        <Route path='Edit/:userId' element={<Form_user_update />}/>
      </Route>
      <Route path="Partenaire" element={<Partenaire />}>
            <Route index element={<List_part />} />
            <Route path="Formulaire" element={<Form_part />} />
            <Route path='Edit/:partId' element={<Form_part_update />}/>
            <Route path="Detail/:partId" element={<Detail_part />} /> 
        </Route>
        
        <Route path="Project" element={<Project />}>
            <Route index element={<List_project />} />
            <Route path="Formulaire" element={<Form_project />} />
             <Route path='Edit/:projId' element={<Form_project_update />}/> 
            <Route path="Detail/:projId"  element={<Detail_project />} />
          </Route>
          
          
          <Route path="Tache" element={<Task />} />
      
      {/*  <Route path="Archive" element={<Archive />} />
          <Route path="Galerie" element={<Galerie />} />
          <Route path="Historique" element={<Historique />} />
          <Route path="Parametre" element={<Parametre />} />
      

          <Route path="Project" element={<Project />}>
            <Route index element={<List_project />} />
            <Route path="Formulaire" element={<Form_project />} />
            <Route path="Detail" element={<Detail_project />} />
          </Route>

          */}
   </Routes>
  </>
  )
}

export default AppBack
