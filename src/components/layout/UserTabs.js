"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();

  return (
    <div className="max-w-xl mx-auto flex tabs gap-3 justify-center ">
      {isAdmin && (
        <>
          <Link
            className={path === "/profile" ? "active" : ""}
            href={"/profile"}
          >
            Perfil
          </Link>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categorías
          </Link>
          <Link
            className={path.includes("/menu-items") ? "active" : ""}
            href={"/menu-items"}
          >
            Menu
          </Link>
          <Link 
          className={path === "/users" ? "active" : ""} 
          href={"/users"}
          >
            Usuarios
          </Link>
        </>
      )}
    </div>
  );
}
