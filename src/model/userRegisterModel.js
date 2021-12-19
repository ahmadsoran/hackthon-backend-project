import  mongoose from "mongoose";

const userSchemaLogin = new mongoose.Schema({
email: String,    
username:{
    type: String,
    unique: true
},
password: String,
phoneNumber: Number,
role:{
    type: [String],
    default: 'user',
    enum: ['user','doctor','admin']
},
profieImg: String,
name: String,
age: Number,
description: String,


})

const UserSchema = mongoose.model('UserSchema', userSchemaLogin)
export default UserSchema;