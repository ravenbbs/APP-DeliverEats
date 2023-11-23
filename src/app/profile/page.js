"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState('');
  const { status } = session;

  useEffect(() => {
    if (status === 'authenticated'){
      setUserName(session?.data?.user?.name);
    }

  }, [session, status]);


  console.log(session);

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    await fetch('/api/profile', {
      method: 'PUT',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({name:userName}),
    })
  }


  if (status === "loading") {
    return "loading...";
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }

  const userImage = session.data.user.image;

  return (
    <section className=" mt-8 ">
      <h1 className="text-center text-customColor text-4xl font-bold my-6">
        Perfil
      </h1>
      <h2>
        Perfil Actualizado!!
      </h2>
      <div className="max-w-md mx-auto border my-6">
        <div className="flex gap-2 items-center">
          <div>
            <div className=" bg-gray-300 p-2 rounded-lg ">
              <Image className="rounded-lg w-full h-full mb-2" src={userImage} width={150} height={150} alt="avatar" />
              <button className="py-1">
                Editar
              </button>
            </div>
          </div>
          <form className=" grow" onSubmit={handleProfileInfoUpdate}>
            <input type="text" placeholder="Nombres"
            value={userName} onChange={ev => setUserName(ev.target.value)}>
            </input>
            <input type="email" value={session.data.user.email} disabled="true" ></input>
            <button type="submit">
              Guardar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
