import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const OlvidePassword = () => {
  const [email,setEmail] = useState("")
  const [alerta,setAlerta] = useState({})

  const handleSubmit = async (e) =>{
      e.preventDefault()
      if([email].includes("") || email.length < 6){
        setAlerta({
          mensaje: "Email no valido",
          error: true
        })
        return
      }

      // enviar email
      try {
        const {data} = await clienteAxios.post(`/usuarios/olvide-password`,{
          email
        })
        setAlerta({
          mensaje: data.msg,
          error: false
        })
        setEmail("")
      } catch (error) {
        setAlerta({
          mensaje: error.response.data.msg,
          error: true
        })
      }
  }

  const {mensaje} = alerta

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Recupera el acceso a tu <span className='text-slate-700'>Cuenta</span>
       </h1>
    {mensaje && <Alerta alerta={alerta} />}
    <form action=""
      onSubmit={handleSubmit}
    className='my-10 bg-white shadow rounded-lg p-10'>
      <div className='my-5'>
        <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>E-Mail</label>
        <input type="email" 
          id='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='email de registro'
          className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
        />
      </div>
   
      <input type="submit" value="Enviar Instrucciones" className='bg-sky-600 py-3 w-full text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors mb-5' />
    </form>

    <nav className='lg:flex lg:justify-between'>
      <Link
      className='block text-center my-4 text-slate-500 uppercase text-sm' 
      to="/" >
        ¿Ya tienes una cuenta? Inicia Sesión
      </Link>
      <Link
        className='block text-center my-4 text-slate-500 uppercase text-sm' 
        to="/registrar" >
          ¿No tienes una cuenta? Resgistrate
        </Link>
    </nav>

  </>
  )
}

export default OlvidePassword