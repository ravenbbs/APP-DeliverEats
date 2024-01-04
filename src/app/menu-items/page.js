"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../components/UseProfile";
import Loading from "../../components/layout/Loading";
import UserTabs from "../../components/layout/UserTabs";


export default function MenuItemsPAge() {
  // Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) {
    return "No eres un admin";
  }

  return (
    <section className="max-w-md mx-auto my-8">
    <UserTabs isAdmin={true} />
    <div>menu</div>
    </section>
  );
}
