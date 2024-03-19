import React from 'react';

const InputFields = ({ label, name, placeholder, value, onChange, type = "text", required = false, pattern }) => {
  
  
  const cleanInput = (inputValue, pattern) => {
    let cleanedValue = inputValue;
    let inputCleaned;
    if (pattern === '^[a-zA-Z ]+$' ){
      inputCleaned = cleanedValue.replace(/\d/g, '');
     
    }else if(pattern === '^[0-9]+$'){
      inputCleaned = cleanedValue.replace(/\D/g, '');
   
    }else{
      inputCleaned = cleanedValue
    }
    
    
    return inputCleaned;
  };

  const handleInputChange = (e) => {
    const cleanedValue = cleanInput(e.target.value, pattern);
    onChange({ target: { name, value: cleanedValue } });
  };
  
  
  return (
    <div className="mx-auto my-5 w-10/12 flex justify-center items-center border-b px-8 py-4">
      <div className="w-4/12"><i>{label}</i></div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        {...(required && { required: true })}
        {...(pattern && { pattern })}
        className="w-8/12 outline-none bg-none"
      />
    </div>
  );
}

export default InputFields;
