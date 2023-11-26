"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import Loading from "../../components/layout/Loading"

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);
  const { status } = session;

  useEffect(() => {
    if (status === "authenticated") {
      setUserName(session?.data?.user?.name);
      setImage(session.data.user.image);
      fetch("/api/profile").then((response) => {
        response.json().then((data) => {
          setPhone(data.phone);
          setStreetAddress(data.streetAddress);
          setPostalCode(data.postalCode);
          setCity(data.city);
          setCountry(data.country);
          setIsAdmin(data.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          image,
          streetAddress,
          phone,
          postalCode,
          city,
          country,
        }),
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

  if (status === "loading" || !profileFetched) {
    return (<Loading />);
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className=" mt-8 ">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-xl mx-auto my-8">
        <div className="flex gap-2 ">
          <div>
            <div className=" bg-gray-200 p-2 rounded-lg max-w-[140px] ">
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
            <label>Nombre y Apellido</label>
            <input
              type="text"
              placeholder="Nombres"
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
            ></input>
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={session.data.user.email}
              disabled={true}
            ></input>
            <label>Numero de Teléfono</label>
            <input
              type="tel"
              placeholder="Numero de Teléfono"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
            ></input>
            <label>Dirección Domicilio</label>
            <input
              type="text"
              placeholder={"Dirección"}
              value={streetAddress}
              onChange={(ev) => setStreetAddress(ev.target.value)}
            ></input>
            <div className="flex gap-2 ">
              <div>
                <label>Ciudad</label>
                <input
                  type="text"
                  placeholder={"Ciudad"}
                  value={city}
                  onChange={(ev) => setCity(ev.target.value)}
                ></input>
              </div>
              <div>
                <label>Código Postal</label>
                <input
                  type="text"
                  placeholder={"Código Postal"}
                  value={postalCode}
                  onChange={(ev) => setPostalCode(ev.target.value)}
                ></input>
              </div>
            </div>
            <label>País</label>
            <input
              type="text"
              placeholder={"País"}
              value={country}
              onChange={(ev) => setCountry(ev.target.value)}
            ></input>
            <button className="mt-4" type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
