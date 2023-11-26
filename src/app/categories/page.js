"use client";
import UserTabs from "../../components/layout/UserTabs";
import { useEffect, useState } from "react";
import Loading from "../../components/layout/Loading"
export default function CategoriesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  useEffect(() => {
    setLoadingUserInfo(true);
    fetch("/api/profile").then((response) => {
      response.json().then((data) => {
        setIsAdmin(data.admin);
        setLoadingUserInfo(false);
      });
    });
  }, []);

  if (loadingUserInfo) {
    return (
      <Loading />
    );
  }
  if (!isAdmin) {
    return "No eres un Administrador";
  }

  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true} />
    </section>
  );
}
