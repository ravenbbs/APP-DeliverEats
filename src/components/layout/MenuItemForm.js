import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem.image || "");
  const [name, setName] = useState(menuItem.name || "");
  const [description, setDescription] = useState(menuItem.description || "");
  const [price, setPrice] = useState(menuItem.price || "");
  const [sizes, setSizes] = useState([])

  function addSize(){
    setSizes(oldSizes => {
      return [...oldSizes, {name:'', price:0}]
    })
  }


  return (
    <form
      onSubmit={(ev) => onSubmit(ev, { image, name, description, price })}
      className="mx-auto my-8"
    >
      <div className="flex gap-4">
        <div>
          <EditableImage
            link={image}
            setLink={setImage}
            width={120}
            height={120}
          />
        </div>
        <div className=" grow ">
          <label>Nombre</label>
          <input
            required={true}
            value={name}
            onChange={(ev) => setName(ev.target.value)}
            type="text"
          />
          <label>Descripción </label>
          <input
            required={true}
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
            type="text"
          />
          <label>Precio</label>
          <input
            required={true}
            value={price}
            onChange={(ev) => setPrice(ev.target.value)}
            type="text"
          />
          <label>Tamaños</label>
          <div className="bg-gray-200 border-gray-400 border p-2 rounded-md ">
          {sizes?.length > 0 && sizes.map(size => (
            <div>
              <input 
                type="text" 
                placeholder="Nombre del tamaño"
                value={size.name} />
              <input 
                type="text" 
                placeholder="Precio extra" 
                value={size.price}/>
            </div>
          ))}
          <button
          type="button"
          onClick={addSize}
          className="bg-white w-52 mx-auto mt-4"
          >
            Agregar tamaño
          </button>
          </div>
          <button className="mt-4 w-52 mx-auto " type="submit">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
