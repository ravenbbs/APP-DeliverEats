import {NextResponse} from 'next/server';
import {writeFile} from "fs/promises"
import path from "path";


export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json('Archivo vacio', {status: 400});
  }
  //convertir imagen del form en bytes 
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes)

  //guardar imagen en el mismo repo - local 
  const filePath = path.join(process.cwd(),"public", file.name);
  await writeFile(filePath, buffer)



  return NextResponse.json('imagen desde el router papure papa poure')
};


// const cloudinary = require('cloudinary');
// const { parseImage, generateUploadUrl, uploadImage } = require('./cloudinaryUtils');

// export async function POST(req) {
//   const data = await req.formData();

//   if (data.get('file')) {
//     const file = data.get('file');

//     if (file) {
//       const imageData = await parseImage(file);
//       const uploadUrl = await generateUploadUrl(imageData);
//       const uploadedImage = await uploadImage(imageData, uploadUrl);

//       console.log(uploadedImage);

//       return Response.json({
//         url: uploadedImage.url,
//         publicId: uploadedImage.public_id,
//       });
//     } else {
//       console.error('Missing file object');
//       return Response.json({ error: 'Missing file object' });
//     }
//   }

//   return Response.json(false);
// }










// export async function POST(req) {
//   const data = await req.formData();

//   if (data.get("file")) {
//     const file = data.get("file");
//     console.log(file);


//   }

//   return Response.json(true);
// }
