import Image from 'next/image'
import MenuItem from '../menu/MenuItem'
import SectionHeader from './SectionHeader'

export default function HomeMenu(){
  return(
    <section className="">
      <div className='absolute left-0 right-0 w-full '>
        <div className='absolute -top-44 -left-36 -z-10'>
         <Image src={'/salad-left.png'} width={328} height={248} alt={'Pizza deliciosa'}/>
        </div>
        <div className='absolute -top-28 -right-0 -z-10'>
         <Image src={'/salad-right.png'} width={240} height={200} alt={'Pizza deliciosa'}/>
        </div>
      </div>
      <div className="text-center font-semibold mb-6">
        <SectionHeader subHeader={'Check Out'} mainHeader={'Menu'} />

      </div>
      <div className='grid grid-cols-3 gap-4'>
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
        <MenuItem />
      </div>
      
      
    </section>
  )

}