"use client";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import Loading from "../../components/layout/Loading"
import {useProfile} from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {

  const [categoryName, setCategoryName] = useState('')
  const {loading:profileLoading, data:profileData} = useProfile();
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null)
  
  useEffect(() =>{
    fetchCategories()
  }, []);

  function fetchCategories()  {
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }

  async function handleCategorySubmit(ev){
    ev.preventDefault();
    const creationPromise = new Promise(async(resolve, reject) => {
      const data = {name: categoryName}
      if (editedCategory){
        data._id = editedCategory._id
      }

      const response = await fetch('/api/categories/', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      setCategories('')
      fetchCategories()
      if (response.ok)
      resolve();
      else
      reject();
    });
      await toast.promise(creationPromise, {
        loading: 'Creando Nueva Categoría ...',
        success: 'Categoría Creada con Éxito',
        error: 'Ocurrió un error intenta mas tarde'
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
