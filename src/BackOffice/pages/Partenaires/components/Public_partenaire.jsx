import React from 'react'
import "./Public_part.css"
const Public_partenaire = ({ partenaire }) => {
  return (
    <div className="card">
    <button className="mail">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
    </button>
    <div className="profile-pic">
      <img src={partenaire ? partenaire.logo_partenaire : ''} alt={partenaire ? partenaire.nom_partenaire : ''} />
    </div>
    <div className="bottom">
      <div className="content">
        <span className="name">{partenaire ? partenaire.abbrev_partenaire : ''}</span>
        <span className="about-me">{partenaire ? partenaire.histoire_partenaire : ''}</span>
      </div>
      <div className="bottom-bottom">
        <div className="social-links-container">
      
        </div>
        <button className='flex justify-around items-center border-2 border-white text-white translate-y-3 px-10 py-2 hover:bg-white hover:text-black rounded-r-xl rounded-t-none transition-colors '>Visiter</button>
      </div>
    </div>
  </div>
  )
}

export default Public_partenaire
