import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import useProyectos from "../hooks/useProyectos"
import Busqueda from "./Busqueda"

const Header = () => {
    const {handleBuscador,cerrarSesionProyectos} = useProyectos()
    const {cerrarSesionAuth} = useAuth()

    const handleCerrarSesion = () =>{
        if(confirm("¿deseas cerrar sesion?")){
            cerrarSesionProyectos()
            cerrarSesionAuth()
            localStorage.removeItem("token")
        }
    }

  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between '>
            <h2 className=' text-4xl text-sky-600 font-black text-center mb-5 md:mb-0'>
                Uptask
            </h2>
            {/* <input type="search"
                placeholder='Buscar proyecto'
                className='rounded-lg lg:w-96 block p-2 border '
            /> */}
            <div className="flex flex-col md:flex-row items-center gap-4">
                <button type="button"
                    onClick={handleBuscador}
                    className="uppercase font-bold"
                >Buscar Proyecto</button>
                <Link to="/proyectos"
                    className="font-bold uppercase"
                >Proyectos</Link>
                <button type="button"
                    onClick={handleCerrarSesion}
                    className="text-white text-sm bg-sky-600 hover:bg-sky-700 p-3 rounded-md uppercase font-bold"
                >Cerrar Sesión</button>
                <Busqueda />
            </div>


        </div>

    </header>
  )
}

export default Header