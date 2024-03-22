import './Sidebar.css';

import { Avatar } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import tinycolor from 'tinycolor2';



const Sidebar = () => {

  const [modeSombre, setModeSombre] = useState(false);

  const toggleMode = () => {
    setModeSombre(!modeSombre);
  };
  
  useEffect(() => {
    const body = document.body;
    if (modeSombre) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [modeSombre]);
 
  const [themeColor, setThemeColor] = useState('#4863A0'); // Couleur par défaut du thème

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setThemeColor(newColor);
    updateThemeColor(newColor);
  };
  
  const darkenColor = (color, percent) => {
    const tcColor = tinycolor(color);
    const darkerColor = tcColor.darken(percent).toString();
    return darkerColor;
  };
  
  const lightenColor = (color, percent) => {
    const tcColor = tinycolor(color);
    const lighterColor = tcColor.lighten(percent).toString();
    return lighterColor;
  };
  
  const updateThemeColor = (selectedColor) => {
    const currentColor1 = localStorage.getItem('color1');
    
    // Calculer la différence de luminosité entre la nouvelle couleur et la couleur actuelle du skin 1
    const brightnessDiff = tinycolor.readability(currentColor1, selectedColor);
    
    // Ajuster la luminosité du skin 2 en conséquence
    const adjustedColor2 = brightnessDiff > 4.5 ? darkenColor(selectedColor, 20) : lightenColor(selectedColor, 20);
  
    document.documentElement.style.setProperty('--skin--color1', selectedColor);
    document.documentElement.style.setProperty('--skin--color2', adjustedColor2);
  
    localStorage.setItem('lastSelectedColor', selectedColor);
  
    // Mettez à jour les couleurs dans le stockage local
    localStorage.setItem('color1', selectedColor);
    localStorage.setItem('color2', adjustedColor2);
  };
  
  useEffect(() => {
    // Appliquer le thème par défaut lors du chargement
    const themeUserInput = document.getElementById('ThemeUser');
    themeUserInput.value = themeColor;
  }, [themeColor]);
  

  const [userData, setUserData] = useState(null); 

  useEffect(() => {
  
    const userDataFromLocalStorage = localStorage.getItem('TheUser');
    if (userDataFromLocalStorage) {
      const userDataObject = JSON.parse(userDataFromLocalStorage); 
      setUserData(userDataObject); 
    }
  }, []);
  

  
 
  
  return (
   <>
       <nav className="w-full h-20 fixed z-10 top-0 left-0">
          <div className="flex gap-10 justify-center items-center mt-5 mr-5 float-right usercontent">
              <div className=" flex gap-2 justify-center items-center text-sm font-bold ">
                <div>
               {userData ? userData.firstName_user : ''}
                </div>
                <div>
                  <div className="bg-green-600 w-3 h-3 rounded-full userstatus"></div>
                </div>
        
              </div>
        
              <div className="bg-blue-300 relative w-10 h-10 rounded-full overflow-hidden">
                <Avatar name={userData ? userData.firstName_user : ''} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl '/>
              </div>
          </div>
        </nav>
    
        <aside className="fixed shadow-lg z-20   top-0 left-0  h-screen">
          <div className="mt-5 w-full flex mx-5  items-center gap-2">
         
            <div className="w-1/3 h-10 flex justify-center bg-red-100">
             
            </div>
            <div>
              <h3 className="text-base font-extrabold text-center ">
                    Logo
              </h3>
            </div>
          </div>
          
          <hr className='my-5' />
            
          <div className="h-full">
              <div className="overflow-hidden pb-5 h-full">
                  <ul className="overflow-y-auto h-screen pb-28 scroollbar">
                      <li className="px-5 menu-item active">
                      <NavLink to="" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon tf-icons bx bx-home-circle"></i>
                        <div className="text-sm">Tableau de bords</div>
                      </NavLink>
                    </li>
                    <li className="px-5 menu-item">
                      <NavLink to="Blog" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon bx bx-news"></i>
                        <div className="text-sm">Gestion de blog</div>
                      </NavLink>
                    </li>
        
                    <li className="px-5 menu-item">
                    <NavLink to="Partenaire" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                     
                        <div className='relative'>
                        <i className="text-2xl menu-icon bx bx-cog "></i>
                        <i className="absolute -top-2 left-0 text-sm  menu-icon bx bx-cog "></i>
                        <i className="absolute -top-4 left-2 text-xl  menu-icon bx bx-cog "></i>
                        </div>
                        <div className="text-sm">Gestion de partenaires</div>
                      </NavLink>
                    </li>
                    
                    <li className="px-5 menu-item">
                      <NavLink to="Project" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon bx bx-sitemap "></i>
                        <div className="text-sm">Gestion de project</div>
                      </NavLink>
                    </li>   
                    <br />
                    <hr />
                    <br />
                    <li className="px-5 menu-item">
                      <NavLink to="Utilisateur" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon tf-icons bx bx-user "></i>
                        <div className="text-sm">Utilisateurs</div>
                      </NavLink>
                    </li>
                    
                    <li className="px-5 menu-item">
                      <NavLink to="Tache" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon tf-icons bx bx-task"></i>
                        <div className="text-sm">Taches</div>
                      </NavLink>
                    </li>
                    
                 
                    
                    <li className="px-5 menu-item">
                      <NavLink to="Galerie" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon tf-icons bx bx-image"></i>
                        <div className="text-sm">Galerie</div>
                      </NavLink>
                    </li>
                    
                    
                    <br />
                    <hr />
                    <br />
                    <li className="px-5">
                      <span
                        className={`cursor-pointer mode flex gap-3 items-center px-2 py-5 text-sm menu-link ${
                          modeSombre ? 'text-yellow-500' : 'text-blue-600'
                        }`}
                        onClick={toggleMode}
                      >
                        <i className={`text-2xl menu-icon tf-icons bx ${modeSombre ? 'bx-sun' : 'bx-moon'}`}></i>
                        <div className="text-sm">Mode</div>
                      </span>
                    </li>
                    <li className="relative px-5 ">
                      <span  className="cursor-pointer flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon tf-icons bx bx-palette"></i>
                        <div className="text-sm">Theme</div>
                        <input type="color" name="Mycolors" id="ThemeUser" className='w-6 border-none' onChange={handleColorChange}/>
                      </span>
                    </li>
                    
                    <li className="px-5 menu-item">
                      <NavLink to="Parametre" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                        <i className="text-2xl menu-icon tf-icons bx bx-cog"></i>
                        <div className="text-sm">Parametre</div>
                      </NavLink>
                    </li>
                    
                    <br />
                    <hr />
                    <br />
                    
                    <li className="px-5 menu-item"> 
                        <form >
                          <button  href="#deconnection" id="logoutButton" className="flex gap-3 items-center px-2 py-5 text-sm menu-link">
                            <i className="text-2xl menu-icon tf-icons bx bx-log-out"></i>
                            <div className="text-sm">Deconnexion</div>
                          </button>
                        </form>
                    </li>
        
                  </ul>
              </div>
            </div>
        </aside>
    </>
  )
}

export default Sidebar



