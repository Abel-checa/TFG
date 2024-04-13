const {model,Schema} = require("mongoose")

const UserSchema = new Schema({
    nombre: String,
    password: String,
    cargo: String,
    email: String,
    token:String,
    tareas: Array
});

const User = model('Users',UserSchema)

module.exports = {User:User}