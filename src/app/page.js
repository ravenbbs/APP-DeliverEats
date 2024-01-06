import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeader";


export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="text-center my-12">
        <SectionHeader
          subHeader={"Nuestra Historia"}
          mainHeader={"Sobre Nosotros"}
        />

        <div className="mt-4 max-w-3xl mx-auto text-gray-600 flex flex-col gap-4">
          <p>
            En <span className="text-customColor font-bold">DeliverEats</span>,
            nuestra historia es un viaje apasionante dedicado a llevarte una
            experiencia culinaria excepcional en la comodidad de tu hogar.
          </p>
          <p>
            Desde suculentas hamburguesas hasta deliciosas pizzas y nuestra
            emblemática hamburguesa de 6 pisos, cada platillo está
            cuidadosamente elaborado para satisfacer tus antojos.
          </p>
          <p>
            Colaboramos con chefs talentosos y proveedores de confianza para
            garantizar la frescura y calidad de cada ingrediente. Únete a
            nosotros en este viaje culinario y descubre por qué{" "}
            <span className="text-customColor font-bold">DeliverEats</span> es
            tu elección para una experiencia gastronómica excepcional.
          </p>
        </div>
      </section>
      <section className="text-center my-12">
        <SectionHeader subHeader={"No lo dudes!"} mainHeader={"Contactanos"} />
        <div className="mt-6">
          <a
            className="text-4xl underline text-gray-800"
            href="https://github.com/ravenbbs"
            target="_blank"
          >
            +593 999 999 999
          </a>
        </div>
      </section>
    </>
  );
}
