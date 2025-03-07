import React from "react";
import Card from "./Card";

const Tareas = ({ listaTareas, setListaTareas }) => {

  // Cambiar estado de tarea (toggle)
  /* 
  Componente que permite cambiar entre dos estados,
  como verdadero y falso, seleccionado o no.
  */
  const toggleTarea = (index) => {
    const nuevasTareas = [...listaTareas];
    nuevasTareas[index].status = !nuevasTareas[index].status;
    setListaTareas(nuevasTareas);
  };

  // Eliminar tarea
  const eliminarTarea = (index) => {
    const nuevasTareas = listaTareas.filter((_, i) => i !== index); // Filtrar tareas para excluir la del índice dado
    setListaTareas(nuevasTareas); // Actualizar el estado con la lista filtrada
  };
  

  return (
    <section className="flex flex-column justify-content-center align-items-center p-4 col-9">
      {listaTareas.map((tarea, index) => (
        <Card
          key={index}
          isComplete={tarea.status}
          titulo={tarea.titulo}
          descripcion={tarea.descripcion}
          onToggle={() => toggleTarea(index)} // Pasar función de toggle
          onDelete={() => eliminarTarea(index)} // Pasar función de eliminar
        />
      ))}
    </section>
  );
};

export default Tareas;
