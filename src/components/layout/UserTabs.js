import Link from "next/link";
export default function UserTabs({isAdmin}) {
  return(
    <div className="max-w-xl mx-auto flex tabs gap-3 justify-center ">
        <Link className="active" href={'/profile'}>Perfil</Link>
          
        {isAdmin &&
          <>
            <Link href={'/categories'}> Categorias </Link>
            <Link href={'/menu-items'}> Menu Items </Link>
            <Link href={'/users'}> Usuarios </Link>
          </>
        }

      </div>
  )

}