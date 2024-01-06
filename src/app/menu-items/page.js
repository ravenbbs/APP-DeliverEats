"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import Loading from "../../components/layout/Loading";
import UserTabs from "../../components/layout/UserTabs";
import Link from "next/link";
import Image from "next/image";

export default function MenuItemsPage() {
  
  const [menuItems, setMenuItems] = useState([])

  // Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch('api/menu-item').then(res => {
      res.json().then(menuItems =>{
        setMenuItems(menuItems)

      })
    })
  }, [])


  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) {
    return "No eres un admin";
  }

  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true}  />
      <div className="my-8">
        <Link 
          className="block max-w-sm mx-auto text-center text-black buttonCustom bg-customColorBT" 
          href={"/menu-items/new"}>
            Crear Nuevo
        </Link>
      </div>
      {menuItems?.length > 0 && menuItems.map( item => (
        
        <Link href={'/menu-items/edit/'+ item?._id} className="buttonCustom text-center max-w-xs mx-auto bg-gray-100" key={item.name}>
        <div>
          <Image src={item?.image} width={60} height={60} />
        </div>  
          
          {item.name}
        </Link>

      )
      )}

    </section>
  );
}
