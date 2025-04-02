import React, { useState, useEffect } from "react";
import Card from "./Card";
import { URL_BACKEND } from "../common/servers";

const Tareas = ({ listaTareas, obtenerDatos }) => {
  const [filtro, setFiltro] = useState("todos");
  const [tareasFiltradas, setTareasFiltradas] = useState([]);

  useEffect(() => {
    // Aplicar el filtro cuando cambie listaTareas o filtro
    if (filtro === "todos") {
      setTareasFiltradas(listaTareas);
    } else if (filtro === "pendientes") {
      setTareasFiltradas(listaTareas.filter(tarea => tarea.status === "incomplete"));
    } else if (filtro === "completadas") {
      setTareasFiltradas(listaTareas.filter(tarea => tarea.status === "complete"));
    }
  }, [listaTareas, filtro]);

  // Marcar tarea como completada
  const toggleTarea = async (id) => {
    try {
      const response = await fetch(`${URL_BACKEND}/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "complete" }),
      });
      
      if (response.ok) {
        await obtenerDatos(); // Recargar todas las tareas
        setFiltro("todos"); // Redirigir a "Todos" después de marcar como completa
      } else {
        console.error("Error al actualizar el estado de la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    try {
      const response = await fetch(`${URL_BACKEND}/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        await obtenerDatos(); // Recargar todas las tareas
        setFiltro("todos"); // Redirigir a "Todos" después de eliminar
      } else {
        console.error("Error al eliminar la tarea");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="btn-group mt-3 col-9">
        <button 
          className={`btn ${filtro === "todos" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setFiltro("todos")}
        >
          Todos
        </button>
        <button 
          className={`btn ${filtro === "pendientes" ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => setFiltro("pendientes")}
        >
          Pendientes
        </button>
        <button 
          className={`btn ${filtro === "completadas" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setFiltro("completadas")}
        >
          Completado
        </button>
      </div>

      <section className="flex flex-column justify-content-center align-items-center p-4 col-9">
        {tareasFiltradas.length > 0 ? (
          tareasFiltradas.map((tarea) => (
            <Card
              key={tarea._id}
              id={tarea._id}
              isComplete={tarea.status}
              titulo={tarea.title}
              descripcion={tarea.description}
              onToggle={toggleTarea}
              onDelete={eliminarTarea}
            />
          ))
        ) : (
          <p className="text-center text-muted">
            No hay tareas {filtro !== "todos" ? (filtro === "pendientes" ? "pendientes" : "completadas") : ""}
          </p>
        )}
      </section>
    </>
  );
};

export default Tareas;