import React from 'react'
import Card from './Card'

const Tareas = ({listaTareas, setListaTareas}) => {
  return(
    <section className='flex flex-column justify-content-center align-items-center p-4 col-9'>
      {
      listaTareas.map(
        (tarea, index) => {
          return (
            <Card
              key={index}
              isComplete={tarea.status}
              titulo={tarea.titulo}
              descripcion={tarea.descripcion}
            />
          )
        }
      )
    }
    </section>
  )
}

export default Tareas