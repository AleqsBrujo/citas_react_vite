import { useState, useEffect } from 'react'
import { Error } from './Error';

export const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState(" ")
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [sintomas, setSintomas] = useState("");
  const [error, setError] = useState(false); 

useEffect(()=>{
 if (Object.keys(paciente).length > 0){
  setNombre(paciente.nombre)
  setPropietario(paciente.propietario)
  setEmail(paciente.email)
  setFechaAlta(paciente.fechaAlta)
  setSintomas(paciente.sintomas)
 } 
}, [paciente])


  const generarId= () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit = (e) =>{
    e.preventDefault();

    //Validacion de Formulario
if([nombre, propietario, email, fechaAlta, sintomas].includes("")){
  console.log("Hay almenos un campo Vacío")
  setError(true)
} else{
  
  setError(false)

  //Objeto paciente
  const objetoPaciente = {
    nombre,
    propietario,
    email,
    fechaAlta,
    sintomas,
    error     
  }

  if (paciente.id ) {
    //Editando el Registro
      objetoPaciente.id = paciente.id
      console.log(objetoPaciente)
    const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id?
       objetoPaciente : pacienteState )

       setPacientes(pacientesActualizados);
       //Limpiando el State de paciente
       setPaciente({}); 

  } else {
    //Nuevo Registro
    objetoPaciente.id = generarId();
    setPacientes([...pacientes, objetoPaciente])
    
  }
  



  //Reiniciando Valores del Formulario
  setNombre("")
  setPropietario("")
  setEmail("")
  setFechaAlta("")
  setSintomas("")
  

}
    
  }




  return (
    
    <div className='md:w-1/2 lg:w-2/5 text-center'>
      
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>
      <p className='text-lg mt-5 text-center mb-10'>Añade Pacientes y {" "}
      <span className=' text-indigo-600 font-bold'> y Administralos</span>
      </p>
      <form 
      className='bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5'
      onSubmit={handleSubmit}>

              {error &&  <Error><p>Todos los Campos Son Obligatorios</p></Error>}           
                     
             
          <div className="mb-5">
            <label htmlFor="mascota" 
            className='block text-start text-gray-700 font-bold uppercase'>Nombre Mascota</label>
            <input id="mascota" 
            className="border-2 w-full p-2 mt-2 placeholder-red-300 rounded-md" 
            type="text" 
            placeholder='Nombre de la Mascota'
            value={nombre}
            onChange={(event) => setNombre(event.target.value)} />            
          </div>

          <div className="mb-5">
            <label htmlFor="propietario" className='block text-start text-gray-700 font-bold uppercase'>Nombre Propietario</label>
            <input id="propietario" 
            className="border-2 w-full p-2 mt-2 placeholder-red-300 rounded-md"
             type="text" 
             placeholder='Nombre del Propetario'
             value={propietario}
             onChange={(event) => setPropietario(event.target.value)} />
          </div>

          <div className="mb-5">
            <label htmlFor="email" className='block text-start text-gray-700 font-bold uppercase'>Email Propietario</label>
            <input id="email" 
            className="border-2 w-full p-2 mt-2 placeholder-red-300 rounded-md" 
            type="email" 
            placeholder='Email Contacto Propietario'
            value={email}
            onChange={(event) => setEmail(event.target.value)} />
          </div>
          
          <div className="mb-5">
            <label htmlFor="fecha-ingreso" className='block text-start text-gray-700 font-bold uppercase'>Alta Paciente</label>
            <input id="fecha-ingreso" 
            className="border-2 w-full p-2 mt-2 placeholder-red-300 rounded-md"
             type="date"  
             value={fechaAlta}
            onChange={(event) => setFechaAlta(event.target.value)}/>
          </div>

          <div className="mb-5">
            <label htmlFor="sintomas" className='block text-start text-gray-700 font-bold uppercase'>Sintomas</label>
            <textarea 
              id="sintomas"
              className="border-2 w-full p-2 mt-2 placeholder-red-300 rounded-md "
              placeholder="Describe los sintomas"
              value={sintomas}
              onChange={(event) => setSintomas(event.target.value)}/>
          </div>

          <input type="submit" 
          className="bg-indigo-600 w-full p-3 text-white font-bold hover:bg-indigo-700 cursor-pointer
          transition-all rounded-xl"
          value={paciente.id? "Editar Paciente" : "Agregar Pacientes"}  />

      </form>

    </div>
  )
}
