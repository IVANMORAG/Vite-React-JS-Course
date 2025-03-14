import React from 'react'
import {URL_BACKEND} from '../common/servers'

const Formulario = ({ setListaTareas }) => {
    const [tarea, setTarea] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");

    const cargarDatos = async(tarea)=>{
        const response = await fetch(URL_BACKEND,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                // "Authorization": "Bearer dsfsdfs"
            },
            body:JSON.stringify(tarea)
        })

        if (response.status == 201){
            alert("Tarea creada")
            const tareaNueva = await response.json();
            setListaTareas(tareaNueva);
        }

    }

    const eventoFormulario = (evt) => {
        evt.preventDefault();

        // Crear nueva tarea
        const nuevaTarea = {
            title: tarea,
            description: descripcion
        };

        cargarDatos(nuevaTarea);

        // Actualizar la lista de tareas
        setListaTareas((prevTareas) => [...prevTareas, nuevaTarea]);
        // Limpia el formulario
        setTarea("");
        setDescripcion("");
    };

    return (
        <>
            <form onSubmit={eventoFormulario}
                className='flex flex-column col-9 shadow p-3 rounded mt-4'>
                <h2 className='text-center mt-3'>To - do List</h2>
                <div className='input-group mb-3 col-12'>
                    <label className='input-group-text'>
                        <i className='bi bi-list-task me-1'></i>
                    </label>
                    <input 
                        type="text"
                        placeholder='Tarea'
                        onChange={(evt) => setTarea(evt.target.value)}
                        value={tarea}
                        className='form-control'
                        required
                    />
                </div>
                <div className='input-group mb-3 col-12'>
                    <label className='input-group-text'>
                        <i className='bi bi-chat me-1'></i>
                    </label>
                    <input 
                        type="text"
                        onChange={(evt) => setDescripcion(evt.target.value)}
                        value={descripcion}
                        placeholder='Desplegar app en react'
                        className='form-control'
                        required
                    />
                </div>
                <button className='btn btn-dark col-12'>Agregar</button>
            </form>

            <div className='btn-group mt-3 col-9'>
                <button className='btn btn-primary'>Todos</button>
                <button className='btn btn-warning'>Pendientes</button>
                <button className='btn btn-success'>Completado</button>
            </div>
        </>
    )
}

export default Formulario;
