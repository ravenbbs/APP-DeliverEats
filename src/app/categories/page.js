"use client";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import Loading from "../../components/layout/Loading"
import {useProfile} from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {

// Estado para almacenar el nombre de la categoría del formulario.
const [categoryName, setCategoryName] = useState('')
// Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
const {loading: profileLoading, data: profileData} = useProfile();
// Estado para almacenar la lista de categorías obtenidas de la API.
const [categories, setCategories] = useState([]);
// Estado para almacenar la categoría que se está editando actualmente (si hay alguna).
const [editedCategory, setEditedCategory] = useState(null)

// Efecto que se ejecuta una vez al montar el componente para cargar las categorías iniciales.
useEffect(() =>{
    // Llama a la función fetchCategories al montar el componente.
    fetchCategories()
}, []);

// Esta función realiza una solicitud a la API para obtener la lista de categorías y actualiza el estado correspondiente.
function fetchCategories()  {
  // Realiza una solicitud GET a la API para obtener las categorías.
  fetch('/api/categories').then(res => {
      // Parsea la respuesta como JSON.
      res.json().then(categories => {
          // Actualiza el estado de las categorías con la respuesta de la API.
          setCategories(categories);
      });
  });
}

// Esta función asincrónica maneja el envío de formularios para categorías.
async function handleCategorySubmit(ev){
  // Evita el comportamiento predeterminado del formulario (recargar la página).
  ev.preventDefault();
  // Crea una promesa para manejar la lógica asíncrona de la creación o edición de categorías.
  const creationPromise = new Promise(async(resolve, reject) => {
      // Construye el objeto de datos con el nombre de la categoría.
      const data = {name: categoryName}
      // Si se está editando una categoría existente, agrega su ID a los datos.
      if (editedCategory){
          data._id = editedCategory._id
      }
      // Realiza una solicitud a la API para crear o editar la categoría.
      const response = await fetch('/api/categories/', {
          method: editedCategory ? 'PUT' : 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      });
      // Limpia el estado de el nombre de la categoría, ubicado en el input.
      setCategoryName('')
      // Vuelve a cargar las categorías después de la creación o edición.
      fetchCategories()
      // Reiniciar a null el estado de edición 
      setEditedCategory(null)
      // Resuelve o rechaza la promesa según la respuesta de la API.
      if (response.ok)
          resolve();
      else
          reject();
  });
  // Muestra una notificación tostada mientras espera que se complete la operación asíncrona.
  await toast.promise(creationPromise, {
      loading: editedCategory ? 'Editando Categoría...' : 'Creando Nueva Categoría...',
      success: editedCategory ? 'Categoría Editada con Éxito' : 'Categoría Creada con Éxito',
      error: 'Ocurrió un error. Intenta de nuevo más tarde.'
  })
}




  if (profileLoading) {
    return (
      <Loading />
    );
  }
  if (!profileData) {
    return 'No eres un admin';
  }




  return (
    <section className="max-w-md mx-auto my-8">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-6 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Editar Categoría' : 'Nueva Categoría'}
              {editedCategory && (
              <>: <b className="font-extrabold text-gray-900">{editedCategory.name}</b> </>
              )}
            </label>
            <input 
            required={true}
            type="text" 
            value={categoryName}
            onChange={ev => setCategoryName(ev.target.value)}>

            </input>
          </div>
          <div>
            <button 
            type="submit" 
            className="border border-customColorPrimary" >
              {editedCategory ? 'Editar' : 'Agregar'}
            </button>
          </div>
        </div>
      </form>
      <ul className="mt-4">
        <label>Editar Categorías:</label>
        {categories?.length > 0 && categories.map(c => (
          <button 
          key={c._id}
          onClick={()=> {
            setEditedCategory(c);
            setCategoryName(c.name)
          
          }}
          className="text-left cursor-pointer bg-gray-200 mb-2 mt-0 px-4 py-2 rounded-md text-base font-bold text-gray-700">
            {c.name}
          </button>
        ))}
      </ul>
    </section>
  );
}
