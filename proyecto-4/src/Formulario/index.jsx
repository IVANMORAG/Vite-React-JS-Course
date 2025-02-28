import React from 'react'

const Formulario = () => {
  return (
    <>
    <form className='felx flex-column col-9 shadow p-3 rounded m-4'>

        <h2 className='text-center'> TO DO - LIST</h2>

        <div className='input-group mb-3 col-12'>

            <label className='input-group-text'>
            <i className='bi bi-list-task me-1'></i>
            </label>

            <input type="text" 
                placeholder='Tarea' 
                className='form-control'
                required />
        </div>

        <div className='input-group mb-3 col-12'>

            <label className='input-group-text'>
            <i className='bi bi-chat me-1'></i>
            </label>

            <input className='form-control' 
            type="text" 
            placeholder='Dessplegar una app en react'
            required />
        </div>

        <button className='btn btn-primary mb-3 col-12'>Agregar </button>

    </form>

    <div className='d-flex justify-content-between mt-4'>
        <button className='btn btn-outline-primary flex-grow-1 mx-2'>TODOS</button>
        <button className='btn btn-outline-warning flex-grow-1 mx-2'>PENDIENTES</button>
        <button className='btn btn-outline-success flex-grow-1 mx-2'>COMPLETADO</button>
    </div>

    </>
  )
}

export default Formulario