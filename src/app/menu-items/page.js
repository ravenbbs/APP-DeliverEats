"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import Loading from "../../components/layout/Loading";
import UserTabs from "../../components/layout/UserTabs";
import Link from "next/link";
import Image from "next/image";
import Right from '../../components/icons/Right'
export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);

  // Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("api/menu-item").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) {
    return "No eres un admin";
  }

  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true} />
      <div className="my-8">
        <Link
          className="max-w-sm mx-auto  text-black buttonCustom bg-customColorBT"
          href={"/menu-items/new"}
        >
          <div className="flex justify-center gap-4">
            Crear Nuevo
            <Right />
          </div>
        </Link>
      </div>
      <div className="max-w-md mx-auto">
        <label>Editar Items:</label>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
        menuItems.map((item) => (
          <Link
            href={"/menu-items/edit/" + item?._id}
            className="buttonCustom text-center  mx-auto bg-gray-100"
            key={item.name}
          >
            <div className="flex flex-col gap-2 justify-between items-center h-full pt-2">
              {item.image && (
                <div className="h-full flex items-center grow">

                <Image
                  className="rounded-md relative grow"
                  src={item?.image}
                  width={120}
                  height={120}
                  alt={"image of " + item.name}
                /> 
                </div>
              )}
              {!item.image && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="#544c37"
                  className="w-full h-full"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              )}
              <div >{item.name}</div>
            </div>
          </Link>
        ))}
        </div>
      
      </div>
      
    </section>
  );
}
