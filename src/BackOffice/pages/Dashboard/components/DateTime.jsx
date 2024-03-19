import React, { useEffect, useState } from 'react'

const DateTime = () => {

    const [formattedDate, setFormattedDate] = useState('');

    useEffect(() => {
        const currentDate = new Date();       
        const options = {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        };

        
        const dateLocale = currentDate.toLocaleDateString('fr-FR', options);
        setFormattedDate(dateLocale);
    }, []);
    
    
  return (
    <>
      <div className="w-full shadow-lg p-16  mb-2">
        <div className="relative flex gap-2">
            <div className="left-panel panel">
                <div className="date">
                 
                <div className="date">{formattedDate}</div>
                    
                </div>
                
                <div className="city">
                    Antananarivo
                </div>
              
            </div>
        </div>
    </div>
    
    </>
  )
}

export default DateTime
