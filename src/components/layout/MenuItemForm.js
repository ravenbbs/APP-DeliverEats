import { useState } from "react";
import EditableImage from "./EditableImage";

export default function MenuItemForm({ onSubmit, menuItem }) {
  const [image, setImage] = useState(menuItem.image || "");
  const [name, setName] = useState(menuItem.name || "");
  const [description, setDescription] = useState(menuItem.description || "");
  const [price, setPrice] = useState(menuItem.price || "");

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
          <button className="mt-4 w-52 mx-auto " type="submit">
            Guardar
          </button>
        </div>
      </div>
    </form>
  );
}
