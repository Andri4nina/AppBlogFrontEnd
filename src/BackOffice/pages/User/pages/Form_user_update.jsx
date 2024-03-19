import { Avatar, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import InputFields from '../../../../components/InputField';


const Form_user_update = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
      name_user: '',
      firstName_user: '',
      email_user: '',
      role_user: '',
      Tel_user: '',
      pdp_user: null,
      super_user: false,
      tache: false,
      project: false,
      partenaire: false,
      create_user: false,
      updat_user: false,
      del_user: false,
      create_blog: false,
      updat_blog: false,
      del_blog: false,
      approb_blog: false,
  });

  const toast = useToast();

  useEffect(() => {
      axios
          .get(`http://localhost:3000/user/${userId}`)
          .then((res) => {
              setUserData(res.data);
              setFormData({
                  name_user: res.data.name_user,
                  firstName_user: res.data.firstName_user,
                  email_user: res.data.email_user,
                  role_user: res.data.role_user,
                  Tel_user: res.data.Tel_user,
                  pdp_user: res.data.pdp_user,
                  super_user: res.data.super_user,
                  tache: res.data.tache,
                  project: res.data.project,
                  partenaire: res.data.partenaire,
                  create_user: res.data.create_user,
                  updat_user: res.data.updat_user,
                  del_user: res.data.del_user,
                  create_blog: res.data.create_blog,
                  updat_blog: res.data.updat_blog,
                  del_blog: res.data.del_blog,
                  approb_blog: res.data.approb_blog,
              });
          })
          .catch((err) => console.error(err));
  }, [userId]);

  const handleSubmit = (e) => {
      e.preventDefault();
      axios
          .put(`http://localhost:3000/user/${userId}`, formData)
          .then((res) => {
              console.log('Response data:', res.data);
              toast({
                  title: 'Utilisateur modifié.',
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
              });
          })
          .catch((err) => {
              console.error('Error:', err);
          });
          navigate('/Utilisateur');
  };


// Fonction de gestion des changements pour mettre à jour le state lors de la saisie
  const handleChange = (e) => {
    const { name, value , files ,checked } = e.target;
    if (name === "pdp_user" && files[0]) {
        setSelectedFile(files[0]);
      } else {
        setFormData({
            ...formData,
            [name]: e.target.type === 'checkbox' ? checked : value,
          });
      }
  };

  
  const handleAddPhoto = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, pdp_user: reader.result });
      };
      reader.readAsDataURL(selectedFile);
    }
  };


  return (
    <form  className='w-full mt-5'  onSubmit={(e) => handleSubmit(e)}>
      <div className='grid *:grid-cols-1 md:grid-cols-2 gap-2'>
          <div className='w-full shadow-lg'>
          <h2 className="text-2xl font-bold my-5 text-center">Profil de l'utilisateur</h2>
          <hr className='w-10/12 mx-auto'/>
          <div className="my-5 flex justify-center items-center">
              <div className="relative h-20 w-20">
                  <Avatar  alt="" id="pdp"   src={formData.user_pdp} className=" h-full w-full object-cover bg-slate-200  border rounded-full" />
                  <label 
                      className="cursor-pointer absolute bottom-0
                                  right-0 flex justify-center items-center" 
                      htmlFor="user-pdp"
                      onClick={handleAddPhoto}
                      >
                      <i className="text-white bg-slate-300 border border-gray-300 rounded-full bx bx-camera"></i>
                  </label>
                  <div className="hidden">
                      <input type="file" id="user-pdp" name="pdp_user" accept="images/*" onChange={handleChange}/>
                  </div>
              </div>
          </div>
          
      
          <InputFields
              label="Nom"
              name="name_user"
              placeholder="Entrez le nom d'utilisateur"
              value={formData.name_user}
              onChange={handleChange}
              required  
              pattern="^[a-zA-Z ]+$"
            />
          <InputFields
              label="Prénom"
              name="firstName_user"
              placeholder="Entrez le prénom d'utilisateur"
              value={formData.firstName_user}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z ]+$"
            />
          <InputFields
              label="Email"
              name="email_user"
              placeholder="Entrez l' email d'utilisateur"
              value={formData.email_user}
              onChange={handleChange}
              required
            />
          
            
            <InputFields
              label="Role"
              name="role_user"
              placeholder="Roles de l'utilisateur"
              value={formData.role_user}
              onChange={handleChange}
              required
              pattern="^[a-zA-Z]+$"
            />
          
            <InputFields
              label="Telephone"
              name="Tel_user"
              placeholder="032 32 032 32"
              value={formData.Tel_user}
              onChange={handleChange}
              pattern="^[0-9]+$"
            />
            
          
          </div>
          <div className='w-full shadow-lg'>
              <h2 className="text-2xl font-bold my-5 text-center">Privilege de l'utilisateur</h2>
              <hr className='w-10/12 mx-auto'/>
              
         
              
              <div className="my-5 mx-auto w-1/2 flex justify-center items-center">
              <h5 className="w-7/12">Super utilisateur</h5>
              <div className="w-5/12">
                  <div className="flex justify-center items-center mb-2 prvlg-switcher">
                      <input
                          className="form-checkbox"
                          type="checkbox"
                          id="super_user"
                          name="super_user"
                          onChange={handleChange}
                          checked={formData.super_user}
                      />
                      <label className="ml-2" htmlFor="super_user"></label>
                  </div>
              </div>
          </div>
          
          <div className="mb-5 mx-auto w-1/2 flex justify-center items-center">
              <h5 className="w-7/12">Gestion des taches</h5>
              <div className="w-5/12">
                  <div className="flex justify-center items-center prvlg-switcher">
                      <input
                          className="form-checkbox"
                          type="checkbox"
                          id="tache"
                          name="tache"
                          onChange={handleChange}
                          checked={formData.tache}
                      />
                      <label className="ml-2" htmlFor="tache"></label>
                  </div>
              </div>
          </div>
          
          <div className="mb-5 mx-auto w-1/2 flex justify-center items-center">
              <h5 className="w-7/12">Gestion des projets</h5>
              <div className="w-5/12">
                  <div className="flex justify-center items-center mb-2 prvlg-switcher">
                      <input
                          className="form-checkbox"
                          type="checkbox"
                          id="project"
                          name="project"
                          onChange={handleChange}
                          checked={formData.project}
                      />
                      <label className="ml-2" htmlFor="project"></label>
                  </div>
              </div>
          </div>
          
          <div className="mb-5 mx-auto w-1/2 flex justify-center items-center">
              <h5 className="w-7/12">Gestion des partenaires</h5>
              <div className="w-5/12">
                  <div className="flex justify-center items-center mb-2 prvlg-switcher">
                      <input
                          className="form-checkbox"
                          type="checkbox"
                          id="partenaire"
                          name="partenaire"
                          onChange={handleChange}
                          checked={formData.partenaire}
                      />
                      <label className="ml-2" htmlFor="partenaire"></label>
                  </div>
              </div>
          </div>
          
          <hr className='w-10/12 mx-auto'/>
          <h4 className="font-semibold mt-5 mx-auto w-10/12">Gestion des utilisateurs</h4>
          
          <div className="my-5 mx-auto w-10/12  grid grid-cols-2 justify-center items-center">
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div className=''>Creation</div>
                  <div className="flex ">
                      <div className="flex justify-center items-center prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="create_user"
                              name="create_user"
                              onChange={handleChange}
                              checked={formData.create_user}
                          />
                          <label className="ml-2" htmlFor="create_user"></label>
                      </div>
                  </div>
              </div>
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div>Modification</div>
                  <div className="flex">
                      <div className="flex justify-center items-center prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="updat_user"
                              name="updat_user"
                              onChange={handleChange}
                              checked={formData.updat_user}
                          />
                          <label className="ml-2" htmlFor="updat_user"></label>
                      </div>
                  </div>
              </div>
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div>Suppression</div>
                  <div className="flex">
                      <div className="flex justify-center items-center mb-2 prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="del_user"
                              name="del_user"
                              onChange={handleChange}
                              checked={formData.del_user}
                          />
                          <label className="ml-2" htmlFor="del_user"></label>
                      </div>
                  </div>
              </div>
          </div>
          
          <hr className='w-10/12 mx-auto'/>
          <h4 className="font-semibold mt-5 mx-auto w-10/12">Gestion des blogs</h4>
          
          <div className="my-5 mx-auto w-10/12  grid grid-cols-2 justify-center items-center">
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div>Creation</div>
                  <div className="flex">
                      <div className="flex justify-center items-center prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="create_blog"
                              name="create_blog"
                              onChange={handleChange}
                              checked={formData.create_blog}
                          />
                          <label className="ml-2" htmlFor="create_blog"></label>
                      </div>
                  </div>
              </div>
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div>Modification</div>
                  <div className="flex">
                      <div className="flex justify-center items-center prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="updat_blog"
                              name="updat_blog"
                              onChange={handleChange}
                              checked={formData.updat_blog}
                          />
                          <label className="ml-2" htmlFor="updat_blog"></label>
                      </div>
                  </div>
              </div>
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div>Suppression</div>
                  <div className="flex">
                      <div className="flex justify-center items-center mb-2 prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="del_blog"
                              name="del_blog"
                              onChange={handleChange}
                              checked={formData.del_blog}
                          />
                          <label className="ml-2" htmlFor="del_blog"></label>
                      </div>
                  </div>
              </div>
              <div className="mt-5 grid grid-cols-2 justify-center items-center">
                  <div>Approbation</div>
                  <div className="flex">
                      <div className="flex justify-center items-center mb-2 prvlg-switcher">
                          <input
                              className="form-checkbox"
                              type="checkbox"
                              id="approb_blog"
                              name="approb_blog"
                              onChange={handleChange}
                              checked={formData.approb_blog}
                          />
                          <label className="ml-2" htmlFor="approb_blog"></label>
                      </div>
                  </div>
              </div>
          </div>
              
  
              <div className='my-5 flex justify-center mr-5 gap-2'>
                  <button type="submit"
                      className='flex justify-around items-center border-2
                      border-green-500 text-green-500 px-10 py-2 hover:bg-green-500
                      hover:text-white transition-colors '>Enregistrer
                  </button>
                  <button 
                      className='flex justify-around items-center border-2
                      border-gray-500 text-gray-500 px-10 py-2 hover:bg-gray-500
                      hover:text-white transition-colors '
                      type='reset'
                      >Annuler
                  </button>                
              </div>
          
          </div>
      </div>
  </form>

  )
}

export default Form_user_update
