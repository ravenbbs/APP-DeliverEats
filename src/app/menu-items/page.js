"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import Loading from "../../components/layout/Loading";
import UserTabs from "../../components/layout/UserTabs";
import EditableImage from "../../components/layout/EditableImage";

export default function MenuItemsPAge() {
  const [image, setImage] = useState("");
  // Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) {
    return "No eres un admin";
  }

  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-xl mx-auto my-8">
      <form className=" mx-auto my-8">
        <div className="flex gap-4">
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className=" grow ">
            <label>Nombre</label>
            <input type="text" />
            <label>Descripción </label>
            <input type="text" />
            <label>Precio</label>
            <input type="text" />
            <button className="mt-4 w-52 mx-auto " type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
      </div>
    </section>
  );
}
