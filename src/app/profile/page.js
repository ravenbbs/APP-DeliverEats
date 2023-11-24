"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState('');
  const { status } = session;
  const [saved, setSaved] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (status === 'authenticated'){
      setUserName(session?.data?.user?.name);
      setImage(session.data.user.image)
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
      method: 'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({name:userName, image:image}),
    })
    setIsSaving(false)
    if (response.ok) {
      setSaved(true);
    }
  }

 
  async function handleFileChange(ev) {
    ev.preventDefault();
    
    const selectedFile = ev.target.files[0];
    if (selectedFile) {
      try {
        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", selectedFile);
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setImage(data.url);
          setIsUploading(false)
        } else {
          console.error('Error al subir la imagen a Cloudinary.');
        }
      } catch (error) {
        console.error('Error en la solicitud a Cloudinary:', error);
      }   
    }
  };


  if (status === "loading") {
    return "loading...";
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }


  
  return (
    <section className=" mt-8 ">
      <h1 className="text-center text-customColor text-4xl font-bold my-6">
        Perfil
      </h1>
      
      <div className="max-w-md mx-auto border my-6">
      {saved && (
        <h2 className=" bg-green-200 font-semibold text-center p-6 m-2 rounded-md border border-green-300">
          Perfil Actualizado!!
        </h2>
      )}
      {isSaving && (
        <h2 className=" bg-blue-200 font-semibold text-center p-6 m-2 rounded-md border border-blue-300">
          Cargando ...
        </h2>
      )}
      {isUploading && (
        <h2 className=" bg-blue-200 font-semibold text-center p-6 m-2 rounded-md border border-blue-300">
        Subiendo ...
      </h2>
      )

      }
        <div className="flex gap-2 items-center">
          <div>
            <div className=" bg-gray-200 p-2 rounded-lg max-w-[120px] ">
              { image &&(
              <Image className="rounded-lg w-full h-full mb-2" src={image} width={150} height={150} alt="avatar" />

              )}
              <label>
              <input type="file" className="hidden" onChange={handleFileChange}></input>
              <span className=" cursor-pointer block mt-2 border p-2 border-gray-400 bg-gray-300  rounded-lg hover:scale-105	transition-all text-center font-semibold">
                Editar
              </span>
              </label>
            </div>
          </div>
          <form className=" grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="Nombres"
            value={userName} onChange={ev => setUserName(ev.target.value)}>
            </input>
            <input type="email" value={session.data.user.email} disabled={true} ></input>
            <button type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}