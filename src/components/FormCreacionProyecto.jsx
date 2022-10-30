import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import Alerta from "../components/Alerta"
import useProyectos from "../hooks/useProyectos"



const FormCreacionProyecto = () => {

    const [nombre,setNombre] = useState("")
    const [id,setId] = useState(null)
    const [descripcion,setDescripcion] = useState("")
    const [fechaEntrega,setFechaEntrega] = useState("")
    const [cliente,setCliente] = useState("")
    const [editando,setEditando] = useState(false)

    const params = useParams() 
    
    const {mostrarAlerta,alerta,submitProyecto,proyecto} = useProyectos()

    useEffect(()=>{
        if( params?.id && proyecto?.nombre){
            setId(proyecto._id)
            setNombre(proyecto.nombre)
            setDescripcion(proyecto.descripcion)
            setFechaEntrega(proyecto.fechaEntrega.split("T")[0])
            setCliente(proyecto.cliente)
            setEditando(true)
        }
    },[params])

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if([nombre,descripcion,fechaEntrega,cliente].includes("")){
            mostrarAlerta({
                mensaje: "Todos los campos son obligatorios",
                error: true
            })
            return
        }
        // * enviar datos al state global
        if(editando){
            await submitProyecto({
                id,
                nombre,
                descripcion,
                fechaEntrega,
                cliente
            })
        }else{
            await submitProyecto({
                nombre,
                descripcion,
                fechaEntrega,
                cliente
            })
        }
        setId(null)
        setNombre("")
        setDescripcion("")
        setFechaEntrega("")
        setCliente("")


    }
 

    const {mensaje} = alerta
  return (
    <form className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow '
        onSubmit={handleSubmit}
    >
        {mensaje && <Alerta alerta={alerta} />}
        <div className="mb-5">
            <label htmlFor="nombre" className='text-gray-700 uppercase font-bold text-sm'>Nombre Proyecto</label>
            <input type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='nombre'
                placeholder='Nombre del Proyecto'
                value={nombre}
                onChange={(e)=>setNombre(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label htmlFor="descripcion" className='text-gray-700 uppercase font-bold text-sm'>Descripción</label>
            <textarea 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='descripcion'
                placeholder='Descripción del Proyecto'
                value={descripcion}
                onChange={(e)=>setDescripcion(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label htmlFor="fechaEntrega" className='text-gray-700 uppercase font-bold text-sm'>Fecha De Entrega</label>
            <input type="date" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='nombre'
                value={fechaEntrega}
                onChange={(e)=>setFechaEntrega(e.target.value)}
                />
        </div>
        <div className="mb-5">
            <label htmlFor="cliente" className='text-gray-700 uppercase font-bold text-sm'>Cliente</label>
            <input type="text" 
                className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                id='cliente'
                placeholder='Nombre del Cliente'
                value={cliente}
                onChange={(e)=>setCliente(e.target.value)}
                />
        </div>

        <input type="submit"
        className="bg-sky-600 hover:bg-sky-700 cursor-pointer w-full p-3 text-white uppercase font-bold block
         transition-colors mt-5 text-center roundend-lg"
        value={editando ? "Actualizar Proyecto" : "Crear Proyecto"}
        />

    </form>
  )
}

export default FormCreacionProyecto