import {useEffect,useState,useCallback} from "react"
import { useParams, Link } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"


const ConfirmarCuenta = () => {

  const [alerta,setAlerta] = useState({})
  const [cuentaConfirmada,setCuentaConfirmada] = useState(false)
  const params = useParams()
  const {token} = params

  useEffect(()=>{
    const confirCuenta = async () =>{
      try {
        const url = `/usuarios/confirmar/${token}`
        const {data} = await clienteAxios(url)
        setAlerta({
          mensaje: data.msg,
          error: false,
        })
        setCuentaConfirmada(true)
      } catch (error) {
        setAlerta({
          mensaje: error.response.data.msg,
          error: true,
        })
      }
    }
    confirCuenta()
  },[])

  const {mensaje} = alerta
  return (
    <>
      <h1 className='text-sky-600 font-black text-6xl capitalize'>Confirma tu cuenta y comienza a crear tus <span className='text-slate-700'>Proyectos</span>
      </h1>
      <div>
        {mensaje && <Alerta alerta={alerta}/>}
        {cuentaConfirmada && <Link
      className='block text-center my-4 text-slate-500 uppercase text-sm' 
      to="/" >
        Inicia Sesión
      </Link>}
      </div>
     
    </>

  )
}

export default ConfirmarCuenta