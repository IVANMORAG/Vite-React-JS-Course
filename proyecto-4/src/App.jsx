import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import React, { useState } from 'react'
import Header from './Header';
import Formulario from './Formulario';
import Tareas from './Tareas';

const App = () => {
  const [listaTareas, setListaTareas] = useState([
    
  ]);

  return (
    <>
    <Header/>
    <Formulario setListaTareas = {setListaTareas}/>
    <Tareas listaTareas = {listaTareas} setListaTareas = {setListaTareas}/>
    </>
  );
}

export default App