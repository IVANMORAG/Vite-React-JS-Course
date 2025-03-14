import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useEffect, useState } from 'react'
import Header from './Header';
import Formulario from './Formulario';
import Tareas from './Tareas';
import { URL_BACKEND } from './common/servers';

const App = () => {
  const [listaTareas, setListaTareas] = useState([]);

  const obtenerDatos = async () => {
    const response = await fetch(URL_BACKEND);

    if (response.status === 200) { // Se cambió 201 por 200, ya que este código es para obtener datos
      const tareas = await response.json();
      setListaTareas(tareas);
      console.log(tareas);
    }
  };

  useEffect(() => {
    obtenerDatos(); // Obtén las tareas iniciales al cargar la aplicación
  }, []);

  return (
    <>
      <Header />
      <Formulario obtenerDatos={obtenerDatos} />
      <Tareas listaTareas={listaTareas} setListaTareas={setListaTareas} />
    </>
  );
};

export default App;
