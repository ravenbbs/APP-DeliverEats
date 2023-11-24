import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '../../models/User';

const upload = multer({ dest: 'uploads/' });

export const config = {
  api: {
    bodyParser: false, // Desactiva el análisis automático del cuerpo para Multer
  },
};

export default async function POST(req){
  const data =  await req.formData();

  console.log(data)
   if (data.get('file')) {
     const file = data.get('file');
     console.log(file)
   }
  return Response.json(true);
}

// route para actualizar el nombre de usuario
// import mongoose from "mongoose";
// import { authOptions } from "../auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";
// import User from "../../models/User";


// export async function PUT(req) {
//   mongoose.connect(process.env.MONGO_URL)
//   const data = await req.json();
//   const session = await getServerSession(authOptions);
//   const email = session.user.email;


//   if ('name' in data){
//     //Update user name
//     const result =  await User.updateOne({email}, {name:data.name})

//   }

//   return Response.json(true);
// }




// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const userId = req.user._id; // Asume que tienes información sobre el usuario desde la sesión

//       // Maneja la carga de la imagen y actualiza el campo de imagen en la base de datos
//       upload.single('profileImage')(req, res, async (err) => {
//         if (err) {
//           console.error(err);
//           return res.status(500).end('Error al cargar la imagen');
//         }

//         // Actualiza el campo de imagen en la base de datos
//         await User.findByIdAndUpdate(userId, { profileImage: req.file.path });

//         res.status(200).json({ success: true });
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).end('Error del servidor');
//     }
//   } else {
//     res.status(405).end('Método no permitido');
//   }
// }