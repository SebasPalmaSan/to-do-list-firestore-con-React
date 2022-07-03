import { useEffect, useState } from "react";
import { firebase } from './firebase'


function App() {

  const [ tareas, setTareas ] = useState([])
  const [ tarea, setTarea ] = useState('')
  const [ editar, setEditar ] = useState(false)
  const [ id, setId ] = useState('')

  useEffect(() => {
    const obtenerdatos = async () => {
      try{
        const db = firebase.firestore();
        const data = await db.collection('tareas').get();
        console.log(data.docs);
        const arrayData = data.docs.map(doc => ({ id: doc.id, ...doc.data()}))
        console.log(arrayData);
        setTareas(arrayData)

      } catch(err){
        console.log(err);
      }
    }
    obtenerdatos();

  }, [])

  const agregar = async (e) => {
    e.preventDefault();
    if(!tarea.trim()){
      console.log('está vacío')
      return;
    }

    try{

      const db = firebase.firestore();
      const tareaNueva = {
        name: tarea,
        fecha: Date.now()
      }
      const data = await db.collection('tareas').add(tareaNueva);
      setTareas([
        ...tareas,
        {...tareaNueva, id: data.id}
      ])
      setTarea('')

    } catch(err) {
      console.log(err);
    }
    console.log(tarea)
  }

  const eliminar = async (id) => {
    try{
      const db = firebase.firestore();
      await db.collection('tareas').doc(id).delete();
      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)
    } catch(err) {
      console.log(err);
    }
  }

  const activarEdicion = (item) => {
    setEditar(true)
    setTarea(item.name)
    setId(item.id)
  }

  const editarTarea = async (e) => {
    e.preventDefault()
    if(!tarea.trim()){
      console.log('está vacío')
      return;
    }
    try{
      const db = firebase.firestore();
      
      await db.collection('tareas').doc(id).update({
        name: tarea
      });
      const arrayEditado = tareas.map(item => (item.id === id ? {id: item.id, fecha: item.fecha, name: tarea}: item))
      setTareas(arrayEditado)
      setEditar(false)
      setTarea('')
      setId('')

    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-center">Listado de Tareas</h1>
          <ul className="list-group">
            {
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  {item.name}
                  <button
                   className="btn btn-danger btn-sm float-right"
                   onClick={() => eliminar(item.id)}>Eliminar</button>
                  <button
                   className="btn btn-success btn-sm float-right mr-1"
                   onClick={() => activarEdicion(item)}
                   >Editar</button>
                </li>
              ))
            }
          </ul>
      </div>
        <div className="col-md-6">
          <h3>

            {
              editar ? 'Editar Tarea' : 'Agregar una Tarea'
            }

          </h3>
          <form onSubmit={ editar ? editarTarea : agregar }>
            <input 
            type="text"
            placeholder="Ingrese Nueva Tarea"
            className="form-control mb-2"
            onChange={e => setTarea(e.target.value)}
            value={tarea}
            />
            <button className={ 
              editar ? 'btn btn-info btn-block' : 'btn btn-dark btn-block'
            }
             type="submit"
             >
              {
                editar ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
