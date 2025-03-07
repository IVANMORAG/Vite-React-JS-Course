import React, { useState } from 'react'

const Card = ({ isComplete, titulo, descripcion }) => {

  const [isCompleteState, setIsCompleteState] = useState(isComplete);

  return (

    <div className='card col-12 p-2 shadow border-success flex-row justify-content-between mb-3'>
      
      <div className='col-8'>
        <h3 className={isCompleteState ? "text-secondary text-decoration-line-through" : `text-primary`}>{titulo}</h3>
        <p className='text-secondary'>{descripcion}</p>
      </div>
      <i className={isCompleteState ? 'bi bi-trash2 text-danger fs-4' : `bi bi-journal-check text-success fs-4`}
      
      onClick={()=>{
        isComplete = !isComplete
        setIsCompleteState(!isCompleteState)

      }}
      
      ></i>

    </div>
  )
}

export default Card