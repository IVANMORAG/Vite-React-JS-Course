import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Tareas from './Tareas';
import { URL_BACKEND } from './common/servers';

const App = () => {
  const [listaTareas, setListaTareas] = useState([]);
  
  const obtenerDatos = async () => {
    try {
      const response = await fetch(URL_BACKEND);
      if (response.status === 200) {
        const tareas = await response.json();
        setListaTareas(tareas);
        console.log("Tareas cargadas:", tareas);
      }
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    obtenerDatos(); // Obtén las tareas iniciales al cargar la aplicación
  }, []);

  return (
    <>
      <Header />
      <main className="container d-flex flex-column align-items-center">
        <Formulario obtenerDatos={obtenerDatos} />
        <Tareas listaTareas={listaTareas} obtenerDatos={obtenerDatos} />
      </main>
    </>
  );
};

export default App;