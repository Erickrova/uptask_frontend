import { useEffect } from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"

import RutaProtegida from "./layouts/RutaProtegida"
import AuthLayout from "./layouts/AuthLayout"

import ConfirmarCuenta from "./paginas/ConfirmarCuenta"
import Login from "./paginas/Login"
import NuevoPassword from "./paginas/NuevoPassword"
import OlvidePassword from "./paginas/OlvidePassword"
import Registrar from "./paginas/Registrar"
import { AuthProvider } from './context/AuthProvider'
import Proyectos from "./paginas/Proyectos"
import NuevoProyecto from "./paginas/NuevoProyecto"
import { ProyectosProvider } from "./context/ProyectosProvider"
import Proyecto from "./paginas/Proyecto"
import EditarProyecto from "./paginas/EditarProyecto"
import NuevoColaborador from "./paginas/NuevoColaborador"


function App() {

  useEffect(()=>{
    document.body.classList.add("bg-gray-100")
  },[])

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
            {/* // ? AREA PUBLICA  */}
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} />
                <Route path="registrar" element={<Registrar />} />
                {/* <Route path="olvide-password" element={<OlvidePassword />} />
                <Route path="olvide-password/:token" element={<NuevoPassword />} />
                <Route path="confirmar/:token" element={<ConfirmarCuenta />} /> */}
            </Route>
            {/* // ? AREA PRIVADA  */}
            <Route path="/proyectos" element={<RutaProtegida/>}>
              <Route index element={<Proyectos/>}/>
              <Route path="crear-proyecto" element={<NuevoProyecto/>}/>
              <Route path="proyecto/:id" element={<Proyecto />}/>
              <Route path="proyecto/editar/:id" element={<EditarProyecto />}/>
              <Route path="proyecto/nuevo-colaborador/:id" element={<NuevoColaborador />}/>
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
    
  )
}

export default App
