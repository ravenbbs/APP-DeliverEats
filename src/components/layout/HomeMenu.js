import Image from 'next/image'
export default function HomeMenu(){
  return(
    <section className="">
      <div className=''>
        <Image scr={'../../../public/salad-left.png'}  alt={'lechuga'}/>

      </div>
      <div className="text-center font-semibold">
        <h3 className="text-gray-600 text-xl leading-3">
          Check Out
        </h3>
        <h2 className="text-customColor font-bold text-4xl italic">
          Menu
        </h2>
      </div>
    </section>
  )

}