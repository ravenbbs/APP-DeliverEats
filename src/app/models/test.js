import {model, models, Schema} from "mongoose"

const userSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true},
  password: { 
    type: String, 
    required: true, 
    validate: pass => {
      if(!pass?.length || pass.length < 5){
        new Error('La contraseña debe tener mas de 5 caracteres')
      }
    }
  }

},{timestamps: true});

export const User = models?.User || model('User', userSchema);