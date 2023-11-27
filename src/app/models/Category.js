import {Schema} from "mongoose";

const CategorySchema = new Schema({
  name: {type:String}
}, {timestamps:true})