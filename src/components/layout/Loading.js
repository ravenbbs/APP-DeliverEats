'use client'
import { leapfrog } from "ldrs";

export default function loading(){

  if (typeof window !== 'undefined') {
    const { leapfrog } = require('ldrs');
    leapfrog.register();
  }

  return (
    <div className="flex mx-auto justify-center loading items-center">
      <l-leapfrog size="60" speed="1.8" color="#E25E3E"></l-leapfrog>
    </div>
  )
}