"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
      setImage(session.data.user.image);
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: userName, image: image }),
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Cargando ..",
      success: "Perfil Actualizado!!",
      error: "Ocurrió un error intente mas tarde",
    });
  }

  async function handleFileChange(ev) {
    ev.preventDefault();

    const selectedFile = ev.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setImage(data.url);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Subiendo ..",
        success: "Subida Completada!",
        error: "Ocurrió un error intente mas tarde",
      });
    }
  }

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
        <div className="flex gap-2 items-center">
          <div>
            <div className=" bg-gray-200 p-2 rounded-lg max-w-[120px] ">
              {image && (
                <Image
                  className="rounded-lg w-full h-full mb-2"
                  src={image}
                  width={150}
                  height={150}
                  alt="avatar"
                />
              )}
              <label>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                ></input>
                <span className=" cursor-pointer block mt-2 border p-2 border-gray-400 bg-gray-300  rounded-lg hover:scale-105	transition-all text-center font-semibold">
                  Editar
                </span>
              </label>
            </div>
          </div>
          <form className=" grow" onSubmit={handleProfileInfoUpdate}>
            <input
              type="text"
              placeholder="Nombres"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            ></input>
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
            ></input>
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    </section>
  );
}
