import Image from 'next/image'
import MenuItem from '../menu/MenuItem'
import SectionHeader from './SectionHeader'

export default function HomeMenu(){
  return(
    <section className="">
      <div className='absolute left-0 right-0 w-full '>
        <div className='absolute -top-44 -left-32 -z-10'>
         <Image src={'/salad-left.png'} width={288} height={288} alt={'Pizza deliciosa'}/>
        </div>
        <div className='absolute -top-28 -right-32 -z-10'>
         <Image src={'/salad-right.png'} width={288} height={288} alt={'Pizza deliciosa'}/>
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