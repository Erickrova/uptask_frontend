import {useEffect,createContext,useState} from "react"
import clienteAxios from "../config/clienteAxios"
import { useNavigate, useLocation } from "react-router-dom"


const AuthContext = createContext()

const AuthProvider = ({children})=>{

    const [auth,setAuth] = useState({})
    const [cargando,setCargando] = useState(true)

    const navigate = useNavigate()
    const path = useLocation()

    const cerrarSesionAuth = ()=>{
        setAuth({})
    }

    useEffect(()=>{
        const revisarAuth = async () =>{

            const tokenLocalStorage = localStorage.getItem("token")
            if(!tokenLocalStorage){
                setCargando(false)
                return
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenLocalStorage}`
                }
            }

            if(tokenLocalStorage){
                try {
                    const {data} = await clienteAxios(`/usuarios/perfil`,config)
                    setAuth(data)
                    if(path.pathname === "/"){
                        navigate("/proyectos")
                    }
                } catch (error) {
                    setAuth({})
                } finally{
                    setCargando(false)
                }
            }
        }
        revisarAuth()
    },[])

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                setCargando,
                cerrarSesionAuth
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export{
    AuthProvider
}

export default AuthContext



