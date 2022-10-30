import { Link,useParams } from 'react-router-dom'
import { useEffect,useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/clienteAxios'


const NuevoPassword = () => {
  const [password,setPassword] = useState("")
  const [passwordModificado,setPasswordModificado] = useState(false)
  const [tokenValido,setTokenValido] = useState(false)
  const [alerta,setAlerta] = useState({})
  const params = useParams()
  const {token} = params 

  useEffect(()=>{
    const comprobarToken = async ()=>{

      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true) 
      } catch (error) {
        setAlerta({
          mensaje: error.response.data.msg,
          error: true
        })
      }
    }
    comprobarToken()
  },[])

  const handleSubmit = async (e) =>{
      e.preventDefault()
      if([password].includes("") || password.length < 6){
        setAlerta({
          mensaje: "Password no valido",
          error: true
        })
        return
      }
      // enviar email
      try {
        const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`,{
          password
        })
        setAlerta({
          mensaje: data.msg,
          error: false
        })
        setTokenValido(false)
        setPasswordModificado(true)
        setPassword("")

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
    <h1 className='text-sky-600 font-black text-6xl capitalize'>Reestablece tu <span className='text-slate-700'>Password</span>
       </h1>
       {mensaje && <Alerta alerta={alerta} />}
       {tokenValido && (
        <form action=""
          onSubmit={handleSubmit}
          className='my-10 bg-white shadow rounded-lg p-10'>
          <div className='my-5'>
            <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>Nuevo Password</label>
            <input type="password"
              id='password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Escribre tu nuevo password'
              className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
            />
          </div>
          <input type="submit" value="Crear Cuenta" className='bg-sky-600 py-3 w-full text-white uppercase font-bold rounded cursor-pointer hover:bg-sky-700 transition-colors mb-5' />
        </form>
       )
      }
      {passwordModificado && (
         <Link
         className='block text-center my-4 text-slate-500 uppercase text-sm' 
         to="/" >
           ¿Ya tienes una cuenta? Inicia Sesión
         </Link>
      )}
  </>
  )
}

export default NuevoPassword