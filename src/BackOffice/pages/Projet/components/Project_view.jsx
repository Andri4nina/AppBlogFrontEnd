import React from 'react';

const Project_view = ({ projet }) => {
  return (
    <div className="relative flex w-80 mt-5 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-blue-gray-500 bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-blue-500 to-blue-600">
      </div>
      <div className="p-6">
        <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {projet && projet.titre_project} {/* Affiche le titre du projet */}
        </h5>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          {projet && projet.contenu_project} {/* Affiche le contenu du projet */}
        </p>
        <p className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          Zone d'activité: {projet && projet.zone_project} {/* Affiche la zone d'activité du projet */}
        </p>
      </div>
    </div>
  );
};

export default Project_view;
