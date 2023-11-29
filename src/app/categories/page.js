"use client";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import Loading from "../../components/layout/Loading"
import {useProfile} from "../../components/UseProfile";
import toast from "react-hot-toast";

export default function CategoriesPage() {

  const [newCategoryName, setNewCategoryName] = useState('')
  const {loading:profileLoading, data:profileData} = useProfile();
  const [categories, setCategories] = useState([]);

  useEffect(() =>{
    fetch('/api/categories').then(res => {
      res.json().then(categories => {
        setCategories(categories);
      });
    });
  }, []);


 
  async function handleNewCategorySubmit(ev){
    ev.preventDefault();
    const creationPromise = new Promise(async(resolve, reject) => {
      const response = await fetch('/api/categories/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: newCategoryName})
      });
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
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleNewCategorySubmit}>
        <div className="flex gap-6 items-end">
          <div className="grow">
            <label>
              Nueva Categoría
            </label>
            <input 
            type="text" 
            value={newCategoryName}
            onChange={ev => setNewCategoryName(ev.target.value)}>

            </input>
          </div>
          <div>
            <button type="submit" className="border border-customColorPrimary" >
              Agregar
            </button>
          </div>
        </div>
      </form>
      <div>
        {}
      </div>
    </section>
  );
}
