import React from 'react'
import useProyectos from '../hooks/useProyectos'

const Colaborador = ({colaborador}) => {

    const {handleModalEliminarColaborador} = useProyectos()

    const {nombre,email} = colaborador
  return (
    <div 
    className='border-b p-5 flex justify-between items-center'
>
    <div>
        <p className='mb-2 text-xl capitalize font-bold '>{nombre}</p>
        <p className='mb-2 text-sm text-gray-500 '>{email}</p>
    </div>
    <div className="flex gap-2 items-center">
        <button
            onClick={()=> handleModalEliminarColaborador(colaborador)}
            type='button'
            className='bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg text-sm px-4 py-3'
        >
            Eliminar
        </button>
    </div>

</div>
  )
}

export default Colaborador