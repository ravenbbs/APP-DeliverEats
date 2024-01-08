"use client";
import { useEffect, useState } from "react";
import { useProfile } from "../../../components/UseProfile";
import Loading from "../../../components/layout/Loading";
import UserTabs from "../../../components/layout/UserTabs";
import MenuItemForm from "../../../components/layout/MenuItemForm";
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "../../../components/icons/Left";
import { redirect } from "next/navigation";
export default function NewMenuItemPage() {
  // Utiliza el hook useProfile para gestionar el estado del perfil, incluyendo el estado de carga y los datos del perfil.
  const { loading: profileLoading, data: profileData } = useProfile();
  const [menuItem, setMenuItem] = useState("");
  const [redirectToItems, setRedirectToItems] = useState(false);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-item", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Cargando ...",
      success: "Producto guardado!!",
      error: "Ocurrió un error. Intenta de nuevo más tarde.",
    });
    setMenuItem("");
    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect("/menu-items");
  }

  if (profileLoading) {
    return <Loading />;
  }
  if (!profileData) {
    return "No eres un admin";
  }

  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-xl mx-auto my-8">
        <Link
          className="mx-auto max-w-sm text-black buttonCustom bg-customColorBT"
          href={"/menu-items"}
        >
          <div className="flex justify-center gap-4">
            <Left />
            Ver todos los items
          </div>
        </Link>
        <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
      </div>
    </section>
  );
}
