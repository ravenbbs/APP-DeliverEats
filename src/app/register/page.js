import Image from 'next/image'
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
    <div className="text-center text-gray-400 grid grid-cols-3 justify-center items-center">
      <hr className="border border-gray-300"/>
     o regístrate con 
      <hr className="border border-gray-300"/>
    </div>
    <button className=" flex justify-center gap-4 items-center"> <Image src={'/google.png'} width={32} height={32} alt={'Pizza deliciosa'}/> Ingresa con Google</button>
   </form>
   
  </section>
)
}