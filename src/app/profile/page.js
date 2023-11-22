'use client';
import { useSession } from "next-auth/react"
import {redirect} from "next/navigation"
import Image from 'next/image'


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

  const userImage = session.data.user.image;

  return (
    <section className=" mt-8 ">
      <h1 className="text-center text-customColor text-4xl font-bold my-6">
        Perfil
      </h1>
      <form className="max-w-md mx-auto border my-6">
        <div className="flex justify-between gap-2 ">
          <div className="bg-red-950 w-full">
            <Image src={userImage} width={64} height={64} alt="avatar" />
          </div>
          <div className="bg-red-500 w-full">
            <input>
            
            </input>
          </div>
        </div>
      </form>
    </section>
  )
}