import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
// import {writeFile} from "fs/promises"
// import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export async function POST(req) {
  const data = await req.formData();
  const file = data.get("file");

  if (!file) {
    return NextResponse.json("Archivo vacio", { status: 400 });
  }
  //convertir imagen del form en bytes
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  //guardar imagen en el mismo repo - local
  // const filePath = path.join(process.cwd(),"public", file.name);
  // await writeFile(filePath, buffer)

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      })
      .end(buffer);
  });

  console.log(response);

  return NextResponse.json({
    message: "Imagen Subida con Éxito",
    url: response.secure_url,
  });
}
