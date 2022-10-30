import { useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'

const Registrar = () => {
  const [nombre,setNombre] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [rePassword,setRePassword] = useState("")
  const [alerta,setAlerta] = useState({})


  const handleSubmit = async (e) =>{
    e.preventDefault()
    // validaciones
    if([nombre,email,password,rePassword].includes("")){
      setAlerta({
        mensaje: "todos los campos son obligatorios",
        error: true
      })
      return
    }
    if(password !== rePassword){
      setAlerta({
        mensaje: "Los passwords no son iguales",
        error: true
      })
      return
    }
    if(password.length < 6){
      setAlerta({
        mensaje: "El password debe ser de al menos 6 caracteres",
        error: true
      })
      return
    }
    setAlerta({})

    // crear el usuario en la api
    try {
      const {data} = await clienteAxios.post(`/usuarios`,{
        nombre,
        email,
        password
      })
      setAlerta({
        mensaje: data.msg,
        error: false
      })

      setNombre("")
      setPassword("")
      setRePassword("")
      setEmail("")

      
    } catch (error) {
      setAlerta({
        mensaje: error.response.data.msg,
        error: true,
      })
    }

  }

  const {mensaje} = alerta

  return (
    <>
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Crea tu cuenta y administra tus <span className='text-slate-700'>proyectos</span>
       </h1>
    {mensaje && <Alerta alerta={alerta}  />}
    <form action="" 
      className='my-10 bg-white shadow rounded-lg p-10'
      onSubmit={handleSubmit}
      >
    <div className='my-5'>
        <label htmlFor="nombre" className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
        <input type="text"
          id='nombre'
          value={nombre}
          onChange={e=> setNombre(e.target.value)}
          placeholder='Nombre'
          className='w-full mt-3 p-3
          border rounded-xl bg-gray-50' />
      </div>
      <div className='my-5'>
        <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>E-Mail</label>
        <input type="email"
          id='email'
          value={email}
          onChange={e=> setEmail(e.target.value)}
          placeholder='email de registro'
          className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
      </div>
      <div className='my-5'>
        <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
        <input type="password"
          id='password' 
          value={password}
          onChange={e=> setPassword(e.target.value)}
          placeholder='password de registro' 
          className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
      </div>
      <div className='my-5'>
        <label htmlFor="repassword" className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
        <input type="password"
          id='repassword'
          value={rePassword}
          onChange={e=> setRePassword(e.target.value)}
          placeholder='Repite tu password'
          className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
        />
      </div>
      <input type="submit" value="Crear Cuenta" className='bg-sky-600 py-3 w-full text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors mb-5' />
    </form>

    <nav className='lg:flex lg:justify-between'>
      <Link
      className='block text-center my-4 text-slate-500 uppercase text-sm' 
      to="/" >
        ¿Ya tienes una cuenta? Inicia Sesión
      </Link>
      <Link
      className='block text-center my-4 text-slate-500 uppercase text-sm' 
      to="/olvide-password" >
        Olvide mi contraseña
      </Link>
    </nav>

  </>
  )
}

export default Registrar