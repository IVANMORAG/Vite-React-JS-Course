import React from 'react'

function Tareas() {
  return (

    <section
    className='flex flex-column justify-content align-items-center
    p-4 col-9'>

        <div className="card col-12 p-2 shadow--sm flex-row m-4">
            <div className='col-8'>

                <h3 className='text-primary'> Deploy </h3>
                <p className='text-secondary'>Despejar app en Netlify</p>
            </div>
          
                <button className='btn btn-outline-success col-2' >
                    <i className=' bi-journal-check text-succes'></i>
                </button>
         
        </div>

        

    </section>

  )
}

export default Tareas