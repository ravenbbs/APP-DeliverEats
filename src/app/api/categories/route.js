import mongoose from 'mongoose';
import {Category} from '../../models/Category'

// Función asíncrona para manejar las solicitudes POST para crear una nueva categoría.
export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL)

  // Extrae el nombre de la categoría desde el cuerpo de la solicitud JSON.
  const { name } = await req.json();

  // Crea un nuevo documento de categoría utilizando el modelo 'Category'.
  const categoryDoc = await Category.create({ name });

  // Devuelve una respuesta JSON que contiene el documento de la categoría creada.
  return Response.json(categoryDoc);
}

// Función asíncrona para manejar las solicitudes PUT para actualizar una categoría existente.
export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL)

  // Extrae el ID y el nombre de la categoría desde el cuerpo de la solicitud JSON.
  const { _id, name } = await req.json();

  // Actualiza la categoría correspondiente en la base de datos utilizando el modelo 'Category'.
  await Category.updateOne({ _id }, { name });

  // Devuelve una respuesta JSON indicando que la actualización fue exitosa.
  return Response.json(true);
}

// Función asíncrona para manejar las solicitudes GET para obtener todas las categorías.
export async function GET() {
  mongoose.connect(process.env.MONGO_URL)

  // Devuelve una respuesta JSON que contiene todas las categorías obtenidas de la base de datos.
  return Response.json(await Category.find());
}