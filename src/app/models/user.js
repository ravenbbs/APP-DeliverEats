import {model, models, Schema} from "mongoose"

const userSchema = new Schema({
  name:{type: String},
  email: { type: String, required: true, unique: true},
  password:{type: String},
  photo: { type: String,},
},{timestamps: true});


export const User = models?.User || model('User', userSchema);

export default User;