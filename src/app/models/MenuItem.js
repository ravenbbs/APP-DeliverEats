import {model, models, Schema} from "mongoose";

const MenuItemsSchema = new Schema({
  image: {type: String},
  name:{type:String},
  description:{type:String},
  price:{type:String},
}, {timestamps: true})