"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import Loading from "../../components/layout/Loading";
import UserTabs from "../../components/layout/UserTabs";
import Link from "next/link";

export default function MenuItemsPage() {
  // Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) {
    return "No eres un admin";
  }

  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true}  />
      <div className="mt-8">
        <Link 
          className="block max-w-sm mx-auto text-center text-black buttonCustom bg-customColorBT" 
          href={"/menu-items/new"}>
            Crear Nuevo
        </Link>
        



      </div>
        
    </section>
  );
}
