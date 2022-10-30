import {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Alerta from "../components/Alerta"
import clienteAxios from '../config/clienteAxios'
import useAuth from '../hooks/useAuth'

const Login = () => {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [alerta,setAlerta] = useState({})
  
  const { setAuth } = useAuth()
  const navigate = useNavigate() 


  const handleSubmit = async (e) =>{
    e.preventDefault()

    if([email,password].includes("")){
      setAlerta({
        mensaje: "Todos los campos son obligatorios",
        error: true
      })
      return
    }
    try {
      const {data} = await clienteAxios.post("/usuarios/login",{
        email,
        password
      })
      setAlerta({
        mensaje: "Autenticado Correctamente",
        error: false
      })
      localStorage.setItem("token",data.token)
      setAuth(data)
      setEmail("")
      setPassword("")
      setTimeout(()=>{
        navigate("/proyectos")
      },1000)

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
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Inicia sesión y administra tus <span className='text-slate-700'>proyectos</span>
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
        <div className='my-5'>
          <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
          <input type="password"
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='password de registro'
            className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
          />
        </div>
        <input type="submit" value="Iniciar Sesión" className='bg-sky-600 py-3 w-full text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors mb-5' />
      </form>

      <nav className='lg:flex lg:justify-between'>
        <Link
        className='block text-center my-4 text-slate-500 uppercase text-sm' 
        to="/registrar" >
          ¿No tienes una cuenta? Resgistrate
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

export default Login