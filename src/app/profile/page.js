"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "../../components/layout/UserTabs";
import Loading from "../../components/layout/Loading";
import EditableImage from "../../components/layout/EditableImage";

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

// Función asincrónica para manejar la actualización de información de perfil.
async function handleProfileInfoUpdate(ev) {
  // Evita el comportamiento predeterminado del formulario (recargar la página).
  ev.preventDefault();

  // Crea una promesa para manejar la lógica asíncrona de la actualización del perfil.
  const savingPromise = new Promise(async (resolve, reject) => {
      // Realiza una solicitud PUT a la API para actualizar la información del perfil.
      const response = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          // Envia los datos del perfil en formato JSON en el cuerpo de la solicitud.
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
      // Resuelve o rechaza la promesa según la respuesta de la API.
      if (response.ok)
          resolve();
      else
          reject();
  });
  // Muestra una notificación tostada mientras espera que se complete la operación asíncrona.
  await toast.promise(savingPromise, {
      loading: "Cargando ...",
      success: "Perfil Actualizado!!",
      error: "Ocurrió un error. Intenta de nuevo más tarde.",
  });
}

  if (status === "loading" || !profileFetched) {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className=" mt-8 ">
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-xl mx-auto my-8">
        <div className="flex gap-4 ">
          <div >
            <EditableImage link={image} setLink={setImage} width={120} height={120} />
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
              value={session?.data?.user?.email}
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
            <button className="mt-4 w-52 mx-auto " type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
