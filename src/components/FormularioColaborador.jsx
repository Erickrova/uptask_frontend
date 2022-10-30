import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import useProyectos from '../hooks/useProyectos'
import Alerta from './Alerta'

const FormularioColaborador = () => {
    const [email,setEmail] = useState("")


    
    const {alerta,mostrarAlerta,submitColaborador} = useProyectos()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if([email].includes("")){
            mostrarAlerta({
                mensaje: "Todos los campos son obligatorios",
                error: true
            })
            return
        }
        submitColaborador(email)

    }

    const {mensaje} = alerta

  return (
        <form 
            onSubmit={handleSubmit}
            className='bg-white py-10 px-5 w-full md:w-2/3 lg:w-3/5 rounded-lg shadow'
        >
            {mensaje && <Alerta alerta={alerta}  />}
            <div className='mb-5'>
                <label htmlFor="email"
                    className='text-gray-700 uppercase font-bold text-sm'
                >
                    Email Colaborador
                </label>
                <input type="email"
                    placeholder='Email del usuario'
                    id='email' 
                    className='border-2 w-full p-2 mt-2 placerholder-gray-400 rounded-md'
                    value={email}
                    onChange={e=> setEmail(e.target.value)}
                />
            </div>
            <input type="submit"
            className='bg-sky-600 hover:bg-sky-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded'
            value="Buscar Colaborador" />

        </form>
  )
}

export default FormularioColaborador