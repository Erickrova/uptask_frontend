import { useState,useEffect } from "react"
import { useParams,Link } from "react-router-dom"
import LoadingSkeleton from "../components/LoadingSkeleton"
import useProyectos from "../hooks/useProyectos"
import ModalFormularioTarea from "../components/ModalFormularioTarea"
import Tarea from "../components/Tarea"
import ModalFormularioEliminarTarea from "../components/ModalFormularioEliminarTarea"
import Colaborador from "../components/Colaborador"
import ModalEliminarColaborador from "../components/ModalEliminarColaborador"
import Alerta from "../components/Alerta"
import useAdmin from "../hooks/useAdmin"
import io from "socket.io-client"

let socket;

const Proyecto = () => {
 
  const [tareasPA,setTareasPA] = useState([])
  const [tareasPM,setTareasPM] = useState([])
  const [tareasPB,setTareasPB] = useState([])
  
  const {obtenerProyecto,proyecto,cargando,handleModalFormularioTarea,alerta,submitTareaProyecto,
    socketTareaEditada,
    socketTareaEliminada,
    socketCompletarTarea
  } = useProyectos()
  const {id} = useParams()
  const admin = useAdmin()
  const {nombre,tareas,colaboradores} = proyecto
  const {mensaje} = alerta
  
  useEffect(()=>{
    const consulta = async () =>{
      await obtenerProyecto(id)
    }
    consulta()
  },[])
  useEffect(()=>{
    const asignarPrioridadTarea = async()=>{
      if(proyecto?.tareas?.length){
        setTareasPA(tareas.filter(tarea => tarea.prioridad === "Alta"))
        setTareasPM(tareas.filter(tarea => tarea.prioridad === "Media"))
        setTareasPB(tareas.filter(tarea => tarea.prioridad === "Baja"))
      }

    }
    asignarPrioridadTarea()
  },[proyecto])
  
  useEffect(()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL)
    socket.emit("abrir proyecto",id)
  },[])
  
  useEffect(()=>{
    socket.on("tarea agregada",tareaNueva=>{
      if(tareaNueva.proyecto === proyecto._id){
        submitTareaProyecto(tareaNueva)
      }
    })
    socket.on("tarea eliminada",tareaEliminada=>{
      if(tareaEliminada.proyecto === proyecto._id){
        socketTareaEliminada(tareaEliminada)
      }
    })
    socket.on("tarea editada",tareaEditada =>{
      if(tareaEditada.proyecto._id === proyecto._id){
        socketTareaEditada(tareaEditada)
      }
    })
    socket.on("tarea completada",tareaCompletada =>{
      if(tareaCompletada.proyecto._id === proyecto._id){
        socketCompletarTarea(tareaCompletada)
      }
    })
  })
 
  


  return (
    cargando ? <LoadingSkeleton />
    : mensaje && alerta.error ? <Alerta alerta={alerta} /> : (
    <>
      <div className="flex justify-between ">
          <h1 className="font-black text-4xl">{nombre}</h1>
          {admin ? (

            <div className="flex justify-between items-center gap-2 text-gray-400 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
            <Link
            to={`/proyectos/proyecto/editar/${id}`}
            className="uppercase font-bold"
            >
              Editar
            </Link>
            </div>
          ) : null}
      </div>
      {admin ? (
          <button type="button"
          onClick={handleModalFormularioTarea}
          className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 hover:bg-sky-500 text-white text-center mt-5 flex justify-center gap-2 md:justify-between items-center"
          >
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
          </div>
          Nueva Tarea
          </button>
      ) : null}

      <p className="font-bold text-xl mt-10">Tareas del proyecto</p>
      <div className="bg-white shadow mt-10 rounded-lg">
        {tareas?.length ? (
          <div>
            {tareasPA.length ? (
              <>
              {tareasPA.map(tarea => (
                <Tarea key={tarea._id} tarea={tarea} />
                ))}
              </>
            ):""}
             {tareasPM.length ? (
               <>
              {tareasPM.map(tarea => (
                <Tarea key={tarea._id} tarea={tarea} />
                ))}
              </>
            ):""}
             {tareasPB.length ? (
               <>
              {tareasPB.map(tarea => (
                <Tarea key={tarea._id} tarea={tarea} />
                ))}
              </>
            ):""}
          </div>
          )
        : <p className="text-center my-5 p-10">No hay tareas aún</p> }
      </div>
      {admin ? (
        <>
          <div className="flex justify-between items-center mt-10 ">
            <p className="font-bold text-xl">Colaboradores</p>
            <div className="flex justify-between items-center gap-2 text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <Link
              to={`/proyectos/proyecto/nuevo-colaborador/${id}`}
              className="uppercase font-bold"
              >
                Añadir
              </Link>
            </div>
          </div>
    
          <div className="bg-white shadow mt-10 rounded-lg">
            {colaboradores?.length ? 
              colaboradores.map(colaborador => (
                <Colaborador key={colaborador._id} colaborador={colaborador} />
              ))  
              : <p className="text-center my-5 p-10">No hay colaboradores aún</p> }
          </div>
        </>
      ) : null}

      <ModalFormularioTarea />
      <ModalFormularioEliminarTarea />
      <ModalEliminarColaborador />
    </>
    )
  )
}

export default Proyecto