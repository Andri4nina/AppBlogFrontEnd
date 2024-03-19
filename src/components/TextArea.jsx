

const TextArea = ({ name, placeholder, value, onChange })=> {
  return (
    <>
     <div className="mx-auto my-5 w-10/12 flex justify-center items-center border-b">
      <div className="w-4/12 flex justify-center mr-20">
        <i className="text-xl">P</i>
      </div>
      <div className="w-8/12">
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          cols="30"
          rows="10"
          className="outline-none bg-none"
        ></textarea>
      </div>
    </div>
    </>
  )
}

export default TextArea
