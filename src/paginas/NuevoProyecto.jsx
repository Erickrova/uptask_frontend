import FormCreacionProyecto from "../components/FormCreacionProyecto"


const NuevoProyecto = () => {
  return (
    <>
      <h1 className='font-black text-4xl'>Crear Proyecto</h1>

      <div className="mt-10 flex justify-center">
        <FormCreacionProyecto/>
      </div>
    </>
  )
}

export default NuevoProyecto