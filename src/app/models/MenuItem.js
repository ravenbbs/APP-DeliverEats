// Importa 'model', 'models' y 'Schema' desde la biblioteca Mongoose.
import { model, models, Schema } from "mongoose";

// Define un esquema (schema) para los elementos del menú.
const MenuItemSchema = new Schema({
    // Propiedad para la ruta de la imagen del elemento del menú.
    image: { type: String },

    // Propiedad para el nombre del elemento del menú.
    name: { type: String },

    // Propiedad para la descripción del elemento del menú.
    description: { type: String },

    // Propiedad para el precio del elemento del menú.
    price: { type: String },
}, { timestamps: true });  // timestamps: true añade automáticamente campos 'createdAt' y 'updatedAt' al esquema.

// Crea el modelo 'MenuItem' utilizando el esquema definido anteriormente.
export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemSchema); // es una forma de verificar si el modelo ya existe.
