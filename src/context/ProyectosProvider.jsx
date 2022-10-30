import { useState,useEffect,createContext } from "react";
import clienteAxios from "../config/clienteAxios"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"
import useAuth from "../hooks/useAuth";


let socket;

const ProyectosContext = createContext()

const ProyectosProvider = ({children})=>{

    const [proyectos,setProyectos] = useState([])
    const [alerta,setAlerta] = useState({})
    const [proyecto,setProyecto] = useState({})
    const [tarea,setTarea] = useState({})
    const [cargando,setCargando] = useState(false)
    const [modalFormularioTarea,setModalFormularioTarea] = useState(false)
    const [modalEliminarTarea,setModalEliminarTarea] = useState(false)
    const [colaborador,setColaborador] = useState({})
    const [modalEliminarColaborador,setModalEliminarColaborador] = useState(false)
    const [buscador,setBuscador] = useState(false)
    
    const {auth} = useAuth()
    const Navigate = useNavigate()
    
    useEffect(()=>{
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }             
        }
        const obtenerProyectos = async ()=>{
            setCargando(true)
            try {
                const {data} = await clienteAxios("/proyectos",config)
                setProyectos(data)
            } catch (error) {
                mostrarAlerta({
                    mensaje: error.response.data.msg,
                    error: true
                })  
            }finally{
                setCargando(false)
            }
    
    
        }
        obtenerProyectos()
    },[auth])
    useEffect(()=>{
        socket = io(import.meta.env.VITE_BACKEND_URL)
    },[])
    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(()=>{
            setAlerta({})
        },5000)
    }
    const submitProyecto = async (proyecto)=>{
        if(proyecto?.id){
            await editarProyecto(proyecto)
        }else{
            await nuevoProyecto(proyecto)
        }
    }
    const editarProyecto = async (proyecto)=>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }             
            }
            try{

                const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
                // sincronizar state
                const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
                mostrarAlerta({
                    mensaje:"Proyecto Actualizado correctamente",
                    error: false
                })
                setProyectos(proyectosActualizados)
             
                setTimeout(()=>{
                    Navigate(`/proyectos/proyecto/${proyecto.id}`)
                },2000)
            }catch(error){
                console.log(error)
            }


        } catch (error) {
            console.log(error)
        }
    }
    const nuevoProyecto = async (proyecto)=>{
        try {
            const token = localStorage.getItem("token")
            if(!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }             
            }
            try{

                const {data} = await clienteAxios.post("/proyectos",proyecto,config)
                setProyectos([...proyectos,data])
                mostrarAlerta({
                    mensaje:"Proyecto creado correctamente",
                    error: false
                })
                setTimeout(()=>{
                    Navigate("/proyectos")
                },2000)
            }catch(error){
                console.log(error)
            }


        } catch (error) {
            console.log(error)
        }
    }
    const obtenerProyecto = async (id) =>{
        setCargando(true)
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios(`/proyectos/${id}`,config)
            setProyecto(data)
            setAlerta({})
        } catch (error) {
            Navigate("/proyectos")
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error: true
            })
        }finally{
            setCargando(false)
        }
    }
    const eliminarProyecto = async (id) =>{
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.delete(`/proyectos/${id}`,config)
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)
            mostrarAlerta({
                mensaje: data.msg,
                error : false
            })
            setTimeout(()=>{
                Navigate("/proyectos")
            },1500)
        } catch (error) {
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error : true
            })
        }

    }
    const handleModalFormularioTarea = ()=>{
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }
    const editarTarea = async (tarea) =>{
        const token = localStorage.getItem("token")
        if(!token) return

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`,tarea,config)
           
            mostrarAlerta({
                mensaje: "Tarea Actualizada Correctamente",
                error: false
            })
            setTimeout(()=>{
                handleModalFormularioTarea()
                setAlerta({})
            },1500)
            // socket io
            socket.emit("editar tarea",data)
        } catch (error) {
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error : true
            })
        }
    }
    const nuevaTarea = async(tarea)=>{
        const token = localStorage.getItem("token")
        if(!token) return

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post("/tareas",tarea,config)
         
            mostrarAlerta({
                mensaje: "Tarea Creada Correctamente",
                error: false
            })
            setTimeout(()=>{
                handleModalFormularioTarea()
            },1500)
            // socket io
            socket.emit("nueva tarea",data)


        } catch (error) {
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error : true
            })
        }
    }
    const handleModalEditarTarea = async (tarea) =>{
        setTarea(tarea)
        setModalFormularioTarea(true)
    }
    const handleModalEliminarTarea = async (tarea) =>{
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    const eliminarTarea = async (id) =>{
        const token = localStorage.getItem("token")
        if(!token) return

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.delete(`/tareas/${id}`,config)
      
            mostrarAlerta({
                mensaje: data.msg,
                error: false
            })
            setTimeout(()=>{
                setModalEliminarTarea(false)
            },1500)
            socket.emit("eliminar tarea",tarea)
            setTarea({})
        } catch (error) {
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error : true
            })
        }

    }
    const submitColaborador = async (email) =>{
        const token = localStorage.getItem("token")
        if(!token) return

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        setCargando(true)
        try {
            const {data} = await clienteAxios.post("/proyectos/colaboradores",{email},config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error: true
            })
            setColaborador({})
        }finally{
            setCargando(false)
        }
    }
    const agregarColaborador = async (email) =>{

            const token = localStorage.getItem("token")
            if(!token) return
    
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            setCargando(true)
            try {
                const {data} = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`,{email},config)
                mostrarAlerta({
                    mensaje:data.msg,
                    error: false
                })
                setColaborador({})
                setTimeout(()=>{
                    setAlerta({})
                },1500)
            } catch (error) {
                mostrarAlerta({
                    mensaje: error.response.data.msg,
                    error: true
                })
            }finally{
                setCargando(false)
            }
        
    }
    const handleModalEliminarColaborador = async (colaboradorParam) =>{
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaboradorParam)
    }
    const eliminarColaborador = async () =>{
        const token = localStorage.getItem("token")
        if(!token) return

        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.post(`/proyectos/eliminar-colaboradores/${proyecto._id}`,{id:colaborador._id},config)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(c => c._id !== colaborador._id)
            setProyecto(proyectoActualizado)
            mostrarAlerta({
                mensaje: data.msg,
                error: false
            })
            setTimeout(()=>{
                setAlerta({})
                setModalEliminarColaborador(false)
            },1500)
            setColaborador({})
           
        } catch (error) {
            mostrarAlerta({
                mensaje: error.response.data.msg,
                error : true
            })
        }
    }
    const completarTarea = async (id) =>{
        const token = localStorage.getItem("token")
        if(!token) return
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clienteAxios.post(`/tareas/estado/${id}`,{},config)
            
            setAlerta({})
            socket.emit("completar tarea",data)
            setTarea({})
        } catch (error) {
            console.log(error.response)
        }
    }
    const handleBuscador =  () =>{
        setBuscador(!buscador)
    }
    // socket io

    const submitTareaProyecto = (tarea)=>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = [...proyectoActualizado.tareas,tarea]
        setProyecto(proyectoActualizado)
    }
    const socketTareaEditada = (tareaEditada)=>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tarea => tarea._id === tareaEditada._id ? tareaEditada : tarea )
        setProyecto(proyectoActualizado)
    }
    const socketTareaEliminada = data =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tarea => tarea._id !== data._id)
        setProyecto(proyectoActualizado)
    }
    const socketCompletarTarea = data =>{
        const proyectoActualizado = {...proyecto}
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(t => t._id === data._id ? data : t )
        setProyecto(proyectoActualizado)
    }

    // cerrar sesion
    const cerrarSesionProyectos = ()=>{
        setAlerta({})
        setProyecto({})
        setProyectos([])


    }

    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalFormularioTarea,
                nuevaTarea,
                editarTarea,
                tarea,
                handleModalEditarTarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agregarColaborador,
                handleModalEliminarColaborador,
                modalEliminarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareaProyecto,
                socketTareaEditada,
                socketTareaEliminada,
                socketCompletarTarea,
                cerrarSesionProyectos

            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export{
    ProyectosProvider
}

export default ProyectosContext