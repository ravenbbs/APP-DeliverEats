"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react"; //importamos para poder iniciar sesión con google.

//
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn("credentials", { email, password });
    setLoginInProgress(false);
  }
  return (
    <section className=" mt-8 ">
      <h1 className="text-center text-customColor text-4xl font-bold my-6">
        Inicia Sesión
      </h1>
      <form className="block max-w-sm mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="email"
          placeholder="Ingresa correo"
          value={email}
          required
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type="password"
          placeholder="Ingresa contraseña"
          value={password}
          required
          minLength={"5"}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button type="submit" disabled={loginInProgress}>
          Ingresar
        </button>
        <div className="text-center text-gray-400 grid grid-cols-3 justify-center items-center my-3">
          <hr className="border border-gray-300" />
          Inicia Sesión con
          <hr className="border border-gray-300" />
        </div>
        <button
          type="button"
          className=" flex justify-center gap-4 items-center "
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image
            src={"/google.png"}
            width={26}
            height={26}
            alt={"Google Icon"}
          />
          Ingresa con Google
        </button>
        <hr className="border border-gray-300 my-4" />
        <div className="text-center text-gray-600 hover:text-gray-800 transition-all my-2 ">
          Aun no tienes cuenta?{" "}
          <Link
            className="text-red-500 font-medium hover:text-red-600 transition-colors"
            href={"/register"}
          >
            Regístrate
          </Link>
        </div>
      </form>
    </section>
  );
}
