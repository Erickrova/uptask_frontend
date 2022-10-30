import { useState } from "react"
import { matchPath } from "react-router-dom"
import formatearFecha from "../helpers/formatearFecha"
import useAdmin from "../hooks/useAdmin"
import useProyectos from "../hooks/useProyectos"

const Tarea = ({tarea}) => {
    const {descripcion,nombre,_id,prioridad,fechaEntrega,estado,completado} = tarea
    const {handleModalEditarTarea,handleModalEliminarTarea,completarTarea} = useProyectos()
    const handleEstado = async () =>{
        await completarTarea(_id)
    }
    const admin = useAdmin()
   

  return (
    <div 
        className='border-b p-5 flex justify-between items-center'
    >
        <div>
            <p className='mb-2 text-xl '>Nombre: {nombre}</p>
            <p className='mb-2 text-sm text-gray-500 uppercase '>Descripción: {descripcion}</p>
            <p className='mb-2 text-sm '>Fecha de Entrega: {formatearFecha(fechaEntrega)}</p>
            <p className='mb-2 text-gray-600 '>Prioridad: {prioridad}</p>
            {estado ? (
                <p className='mb-2 text-gray-600 '>Completada por: {completado.nombre}</p>
            ):null}
        </div>
        <div className="flex flex-col md:flex-row gap-2 ">
            
            <button
                type='button'
                className={`${estado ? "bg-lime-400 hover:bg-gray-400":"bg-gray-400 hover:bg-lime-400"} text-white uppercase font-bold rounded-lg text-sm px-4 py-3`}
                onClick={handleEstado}
            >
                {`${estado ? "Completada" : "Pendiente"}`}
            </button>
            {admin ? (

                <button
                onClick={()=>handleModalEditarTarea(tarea)}
                type='button'
                className='bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg text-sm px-4 py-3'
                >
                Editar
            </button>
            ) : null}
            {admin ? (

                <button
                onClick={()=>handleModalEliminarTarea(tarea)}
                type='button'
                className='bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg text-sm px-4 py-3'
                >
                Eliminar
            </button>
            ) : null}
        </div>

    </div>
  )
}

export default Tarea