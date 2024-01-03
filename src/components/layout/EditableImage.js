import toast from "react-hot-toast";
import Image from "next/image";

export default function EditableImage({ link, setLink }) {
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
    <div className=" bg-gray-200 p-2 rounded-lg max-w-[140px] ">
      {link && (
        <Image
          className="rounded-lg h-full mb-2 w-full"
          src={link}
          width={150}
          height={150}
          alt="avatar"
        />
      )}
      {!link && (
        <div className="bg-white rounded-md w-24 h-24 font-bold flex text-center items-center">
          No hay Imagen
    
        </div>
      )}
      <label>
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        ></input>
        <span className=" cursor-pointer block mt-2 border p-2 border-gray-400 bg-gray-300  rounded-lg hover:scale-105	transition-all text-center font-semibold">
          Editar
        </span>
      </label>
    </div>
  );
}
