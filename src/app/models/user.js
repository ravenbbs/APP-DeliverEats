import {model, models, Schema} from "mongoose"
import bcrypt from "bcrypt";
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

userSchema.post('validate', function (user){
  const notHashedPass = user.password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(notHashedPass, salt);
})


export const User = models?.User || model('User', userSchema);

export default User;