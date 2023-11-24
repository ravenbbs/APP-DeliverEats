// import {v2 as cloudinary} from 'cloudinary';


// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET,
//   secure: true,
// });


// const {
//   parseImage,
//   generateUploadUrl,
//   uploadImage,
// } = require("../../../libs/cloudinary.config");


export async function POST(req) {
  const data = await req.formData();

  if (data.get("file")) {
    const file = data.get("file");
    console.log(file);


  }

  return Response.json(true);
}
