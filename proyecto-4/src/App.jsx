import React, { useState }  from "react";
import Header from "./Header";
import Formulario from "./Formulario";
import Tareas from "./Tareas";
const App = ()=>{
  const[contador, setContador] = useState(0);
  const aumentarContador = ()=>{
    setContador(contador+1);
  }
  return ( 
    <>
    <Header/>
    <Formulario/>
    <Tareas/>
    </>
    
  )
}

export default App