import Image from "next/image";
import Right from "../../components/icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-6">
      <div className="py-12">
        <h1 className="text-4xl font-semibold ">
          Haz que tu día
          <br />
          sea delicioso
          <br />
          con <span className="text-customColor">DeliverEats</span>
        </h1>
        <p className="my-6 text-gray-500 text-md">
          Desde hamburguesas que te hacen salivar hasta pizzas que son un festín
          para tus sentidos, ofrecemos una amplia variedad de delicias para
          satisfacer todos los antojos. ¡Ordena ahora y disfruta de una
          experiencia gastronómica única!
        </p>
        <div className="flex gap-4 font-bold">
          <button className="bg-customColorBT px-4 py-2 rounded-full text-gray-800 flex gap-2 justify-center border-customColorPrimary">
            Ordena Ya
            <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 border-0 items-center">
            Ver Mas
            <Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image
          src={"/pizza-7972.png"}
          layout={"fill"}
          objectFit={"contain"}
          alt={"Pizza deliciosa"}
        />
      </div>
    </section>
  );
}
