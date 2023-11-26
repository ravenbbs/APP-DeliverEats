'use client';
import UserTabs from "../../components/layout/UserTabs";
import {useEffect, useState} from "react";

export default function CategoriesPage(){

  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    fetch('/api/profile').then(response => {
      response.json().then(data => {
        setIsAdmin(data.admin);
      })
    })
  }, [])



  return (
    <section className="max-w-xl mx-auto my-8">
      <UserTabs isAdmin={true}/>

    </section>
  )
}