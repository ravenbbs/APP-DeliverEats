export default function MenuItem() {
  return(
    <div className='bg-neutral-200 red-200 p-4 rounded-lg text-center hover:bg-white transition-all hover:shadow-xl hover:shadow-slate-300'>
      <div className="text-center">
        <img className="max-h-auto max-h-32 block mx-auto" src='/burger-10940.png' alt='Chicken Hamburger'></img>
      </div>
      <h4 className='font-semibold my-2 text-xl'>Chicken Hamburger</h4>
      <p className='text-gray-600 text-sm my-2'>
        Exquisita Chicken Burger: Pollo jugoso, sabores intensos, ¡una explosión de delicias en cada mordisco!
      </p>
      <button className='bg-red-600 text-white px-4 py-2 rounded-full my-1 font-medium'>
        Agregar al carrito <span className='font-bold'>12$</span> 
      </button>
    </div>
  )
}