import Image from 'next/image'

export default function Hero() {
  return (
    <section>
      <h1>La mejor pizza del mundo</h1>
      <p>Debido a sus ingredientes de calidad es calificada como la mejor del mundo</p>
      <div className='w-full h-max' >
      <Image src={'/pizza-7972.png'} layout={'fill'} objectFit={'contain'} alt={'Pizza deliciosa'}/>
      </div>

    </section>
  )
}