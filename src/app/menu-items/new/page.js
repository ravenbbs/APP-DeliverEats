"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../../components/UseProfile";
import Loading from "../../../components/layout/Loading";
import UserTabs from "../../../components/layout/UserTabs";
import EditableImage from "../../../components/layout/EditableImage";
import toast from "react-hot-toast";
import Link from "next/link";

export default function NewMenuItemPage(){
// Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
const {loading: profileLoading, data: profileData} = useProfile();  
const [image, setImage] = useState("");
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");

async function handleFormSubmit(ev) {
  ev.preventDefault();
  const savingPromise = new Promise(async (resolve, reject) => {
    const data = { image, name, description, price };
    const response = await fetch("/api/menu-item", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) resolve();
    else reject();
  });

  await toast.promise(savingPromise, {
    loading: "Cargando ...",
    success: "Producto guardado!!",
    error: "Ocurrió un error. Intenta de nuevo más tarde.",
  });
  setImage('')
  setName('')
  setDescription('')
  setPrice('')
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
  <div className="max-w-xl mx-auto my-8">
    <Link className="mx-auto block text-center max-w-sm text-black buttonCustom bg-customColorBT" href={'/menu-items'}>Ver todos los items </Link>
    <form onSubmit={handleFormSubmit} className=" mx-auto my-8">
      <div className="flex gap-4">
        <div>
          <EditableImage
            link={image}
            setLink={setImage}
            width={120}
            height={120}
          />
        </div>
        <div className=" grow ">
          <label>Nombre</label>
          <input
            required={true}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
          />
          <label>Descripción </label>
          <input
            required={true}
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            type="text"
          />
          <label>Precio</label>
          <input
            required={true}
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            type="text"
          />
          <button className="mt-4 w-52 mx-auto " type="submit">
            Guardar
          </button>
        </div>
      </div>
    </form>
  </div>
</section>
)}
