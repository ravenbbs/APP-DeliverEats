const cloudinary = require('cloudinary');

const parseImage = async (file) => {
  const buffer = Buffer.from(file.buffer);
  const mimeType = file.mimeType;
  const fileName = file.fileName;

  return {
    buffer,
    mimeType,
    fileName,
  };
};

const generateUploadUrl = async (imageData) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageData.buffer, { folder: 'uploads' }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.secure_url);
      }
    });
  });
};

const uploadImage = async (imageData, uploadUrl) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(imageData.buffer, { public_id: uploadUrl, overwrite: true }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

export async function POST(req) {
  const data = await req.formData();

  if (data.get('file')) {
    const file = data.get('file');
    const imageData = await parseImage(file);
    const uploadUrl = await generateUploadUrl(imageData);
    const uploadedImage = await uploadImage(imageData, uploadUrl);

    // Guarda la URL y el ID público de la imagen en la base de datos de MongoDB

    // ...

    // Actualiza la imagen de perfil del usuario en la base de datos de MongoDB

    // ...

    return Response.json({
      success: true,
    });
  }

  return Response.json({
    success: false,
  });
}