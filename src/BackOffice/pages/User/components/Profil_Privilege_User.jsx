import React from 'react';

const Profil_Privilege_User = ({ userData }) => {
  const {
    super_user,
    tache,
    project,
    partenaire,
    create_user,
    updat_user,
    del_user,
    create_blog,
    updat_blog,
    del_blog,
    approb_blog,
  } = userData;
  return (
    <div className='grayscale w-1/2 shadow-lg'>
    <h4 className="text-center font-semibold">Privilèges de l'utilisateur</h4>
    <hr className='my-5 w-10/12 mx-auto' />

    <div className="my-5 mx-auto w-1/2 flex justify-center items-center">
      <h5 className="w-7/12">Super utilisateur</h5>
      <div className="w-5/12">
        <div className="flex justify-center items-center mb-2 prvlg-switcher">
          <input disabled checked={super_user} className="form-checkbox" type="checkbox" id="super-user" name="super-user" />
          <label className="ml-2" htmlFor="super-user"></label>
        </div>
      </div>
    </div>

    <div className="mb-5 mx-auto w-1/2 flex justify-center items-center">
      <h5 className="w-7/12">Gestion des taches</h5>
      <div className="w-5/12">
        <div className="flex justify-center items-center prvlg-switcher">
          <input disabled checked={tache} className="form-checkbox" type="checkbox" id="tache" name="tache" />
          <label className="ml-2" htmlFor="tache"></label>
        </div>
      </div>
    </div>

    <div className="mb-5 mx-auto w-1/2  flex justify-center items-center">
      <h5 className="w-7/12">Gestion des project</h5>
      <div className="w-5/12">
        <div className="flex justify-center items-center mb-2 prvlg-switcher">
          <input disabled checked={project} className="form-checkbox" type="checkbox" id="project" name="project" />
          <label className="ml-2" htmlFor="project"></label>
        </div>
      </div>
    </div>

    <div className="mb-5 mx-auto w-1/2  flex justify-center items-center">
      <h5 className="w-7/12">Gestion des partenaires</h5>
      <div className="w-5/12">
        <div className="flex justify-center items-center mb-2 prvlg-switcher">
          <input disabled checked={partenaire} className="form-checkbox" type="checkbox" id="partenaire" name="partenaire" />
          <label className="ml-2" htmlFor="partenaire"></label>
        </div>
      </div>
    </div>

    <hr className='w-10/12 mx-auto' />
    <h4 className="font-semibold mt-5 mx-auto w-10/12">Gestion des utilisateurs</h4>
    <div className="my-5 mx-auto w-10/12  grid grid-cols-2 justify-center items-center">
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div className=''>Creation</div>
        <div className="flex ">
          <div className="flex justify-center items-center prvlg-switcher">
            <input disabled checked={create_user} className="form-checkbox" type="checkbox" id="create-user" name="create-user" />
            <label className="ml-2" htmlFor="create-user"></label>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div>Modification</div>
        <div className="flex">
          <div className="flex justify-center items-center prvlg-switcher">
            <input disabled checked={updat_user} className="form-checkbox" type="checkbox" id="updat-user" name="updat-user" />
            <label className="ml-2" htmlFor="updat-user"></label>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div>Suppression</div>
        <div className="flex">
          <div className="flex justify-center items-center mb-2 prvlg-switcher">
            <input disabled checked={del_user} className="form-checkbox" type="checkbox" id="del-user" name="del-user" />
            <label className="ml-2" htmlFor="del-user"></label>
          </div>
        </div>
      </div>
    </div>

    <hr className='w-10/12 mx-auto' />
    <h4 className="font-semibold mt-5 mx-auto w-10/12">Gestion des blogs</h4>
    <div className="my-5 mx-auto w-10/12  grid grid-cols-2 justify-center items-center">
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div>Creation</div>
        <div className="flex">
          <div className="flex justify-center items-center prvlg-switcher">
            <input disabled checked={create_blog} className="form-checkbox" type="checkbox" id="create-blog" name="create-blog" />
            <label className="ml-2" htmlFor="create-blog"></label>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div>Modification</div>
        <div className="flex">
          <div className="flex justify-center items-center prvlg-switcher">
            <input disabled checked={updat_blog} className="form-checkbox" type="checkbox" id="updat-blog" name="updat-blog" />
            <label className="ml-2" htmlFor="updat-blog"></label>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div>Suppression</div>
        <div className="flex">
          <div className="flex justify-center items-center mb-2 prvlg-switcher">
            <input disabled checked={del_blog} className="form-checkbox" type="checkbox" id="del-blog" name="del-blog" />
            <label className="ml-2" htmlFor="del-blog"></label>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 justify-center items-center">
        <div>Approbation</div>
        <div className="flex">
          <div className="flex justify-center items-center mb-2 prvlg-switcher">
            <input disabled checked={approb_blog} className="form-checkbox" type="checkbox" id="approb-blog" name="approb-blog" />
            <label className="ml-2" htmlFor="approb-blog"></label>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Profil_Privilege_User
