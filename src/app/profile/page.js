'use client';
import { useSession } from "next-auth/react"
import {redirect} from "next/navigation"


export default function ProfilePage() {
  const session = useSession();
  const {status} = session;
  console.log(session)

  if (status === 'loading') {
    return 'loading...';
    
  }
  if (status === 'unauthenticated') {
    redirect('/login');
    
  }
  return (
    <section className=" mt-8 ">
      <h1 className="text-center text-customColor text-4xl font-bold my-6">
        Perfil
      </h1>
      <form className="max-w-md mx-auto border my-6">
        <div className="flex justify-between gap-2 ">
          <div className="bg-red-950 w-full">
dasdas
          </div>
          <div className="bg-red-500 w-full">
dasdasd
          </div>
        </div>
      </form>
    </section>
  )
}