import toast from "react-hot-toast";
import Image from "next/image";

export default function EditableImage({ link, setLink, width, height }) {
  async function handleFileChange(ev) {
    ev.preventDefault();

    const selectedFile = ev.target.files;
    if (selectedFile?.length === 1) {
      const formData = new FormData();
      formData.set("file", selectedFile[0]);

      const uploadPromise = new Promise(async (resolve, reject) => {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          setLink(data.url);
          resolve();
        } else {
          reject();
        }
      });

      await toast.promise(uploadPromise, {
        loading: "Subiendo ..",
        success: "Subida Completada!",
        error: "Ocurrió un error intente mas tarde",
      });
    }
  }

  return (
    <div className="rounded-lg">
      {link && (
        <div className="bg-gray-200 border-4 border-stone-300 rounded-lg flex items-center justify-center h-fit w-fit">
          <Image
            className='overflow-hidden rounded-lg h-full w-full'
            src={link}
            width={width}
            height={height}
            alt="avatar"
          />
        </div>
      )}

      {!link && (
        <div className="bg-gray-100 border-4 border-stone-300 rounded-lg w-24 h-24 font-bold flex text-center items-center">
          No hay Imagen
        </div>
      )}
      <label>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        ></input>
        <span className=" cursor-pointer block mt-4 border p-2 border-gray-400 bg-gray-300  rounded-lg hover:scale-105	transition-all text-center font-semibold">
          Editar
        </span>
      </label>
    </div>
  );
}
