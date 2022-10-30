import React from 'react'
import { useEffect } from 'react'
import FormularioColaborador from '../components/FormularioColaborador'
import useProyectos from '../hooks/useProyectos'
import { useParams } from 'react-router-dom'
import LoadingSkeleton from '../components/LoadingSkeleton'
import Alerta from '../components/Alerta'


const NuevoColaborador = () => { 
    const {id} = useParams()
    const {obtenerProyecto,proyecto,cargando,colaborador,agregarColaborador,alerta} = useProyectos()

    useEffect(()=>{
        const traerProyecto = async ()=>{
            await obtenerProyecto(id)
        }
        traerProyecto()
    },[])

    const handleClick = async () =>{
        await agregarColaborador(colaborador.email)
    }
    
    
   if(!proyecto?._id) return <Alerta alerta={alerta}/>

  return (
    <div>
        <h1 className='text-4xl font-black '>Añadir Colaborador(a) A {proyecto.nombre}</h1>

        <div className='mt-10 flex justify-center'>
            <FormularioColaborador />
        </div>
        {cargando ? <LoadingSkeleton /> : colaborador._id && (
            
            <div className='rounded-lg shadow bg-white mx-auto w-full md:w-2/3 lg:w-3/5 md:flex md:justify-center mt-10'>
                <div className=' py-10 px-5 '>
                    <h2 className='text-2xl text-center mb-10 font-bold'>Resultado:</h2>
                    <div className='flex flex-col lg:flex-row md:justify-between md:items-center gap-10'>
                        <div className='md:flex md:gap-2 md:justify-between md:items-center'>
                            <p className='capitalize'>{colaborador.nombre}</p>
                            <p>{colaborador.email}</p>
                        </div>
                        <button
                            onClick={handleClick}
                            type='button'
                            className='bg-sky-600 py-2 px-5 w-full text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors mb-5'
                        >
                            Agregar Colaborador
                        </button>
                    </div>

                </div>
            </div>   

        )}

    </div>
  )
}

export default NuevoColaborador