import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PreviewProyecto = ({proyecto}) => {
    const {nombre,_id,cliente,creador} = proyecto
    const {auth} = useAuth()
    const colaborador = auth._id !== creador
  return (
    <div className="border-b p-5 flex flex-col md:flex-row">

        <p className="flex-1">{nombre}
            <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
            {colaborador ? (
              <span className="ml-4 p-1 rounded-md bg-green-500 text-xs text-white font-bold uppercase">
                Colaborador
              </span>
            ): null}
        </p>

        <Link to={`proyecto/${_id}`}
            className="text-gray-700 hover:text-gray-800 uppercase text-sm font-bold"
        >Ir al proyecto</Link>


    </div>
  )
}

export default PreviewProyecto