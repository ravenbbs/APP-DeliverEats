export default function RegisterPage() {
return(
  <section className="mt-8">
    <h1 className="text-center text-customColor text-4xl font-bold">
      Regístrate
    </h1>
   <form className="block max-w-sm mx-auto" >
    <input type="email" placeholder="Ingresa tu correo"/>
    <input type="password" placeholder="Ingresa una contraseña"/>
    <button type="submit">Registrar</button>
    <button className="">Ingresa con Google</button>
   </form>
   <div>

   </div>
  </section>
)
}