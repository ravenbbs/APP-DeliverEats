import Link from 'next/link'
export default function Header() {
  return(
    <header className='flex items-center justify-between'>
    <a href='' className='text-customColor font-semibold text-2xl'>DeliverEats</a>
    <nav className='flex gap-6 text-gray-600 font-semibold items-center'>
      <Link href={''}>Home</Link>
      <Link href={''}>Menu</Link>
      <Link href={''}>About</Link>
      <Link href={''}>Contact</Link>
      <Link href={''} className='bg-red-600 text-white px-6 py-2 rounded-full'>
        Login
      </Link>
    </nav>
  </header>
  )
}