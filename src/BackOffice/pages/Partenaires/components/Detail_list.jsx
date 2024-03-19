import React from 'react'

const Detail_list =  ({ partenaire }) => {
  return (
    <div className='mt-16 w-full'>
      <div className='flex justify-between items-center border-b h-12'>
        <p className='w-5/12 text-slate-400'>Nom du partenaire:</p>
        <p className='w-7/12'>{partenaire ? partenaire.nom_partenaire : ''}</p>
      </div>
      <div className='flex justify-between items-center border-b h-12'>
        <p className='w-5/12 text-slate-400'>Abbreviation:</p>
        <p className='w-7/12'>{partenaire ? partenaire.abbrev_partenaire : ''}</p>
      </div>
      <div className='flex justify-between items-center border-b h-12'>
        <p className='w-5/12 text-slate-400'>Relation:</p>
        <p className='w-7/12'>{partenaire ? partenaire.type_partenaire : ''}</p>
      </div>
      <div className='flex justify-between items-center border-b h-12'>
        <p className='w-5/12 text-slate-400'>Petite historique:</p>
        <p className='w-7/12'>{partenaire ? partenaire.histoire_partenaire : ''}</p>
      </div>
    </div>
  )
}

export default Detail_list
