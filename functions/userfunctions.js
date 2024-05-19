const {bd} = require("../connection.js");
const {User} = require("../models/User.js")
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')
require('dotenv').config()
// LOGIN VERIFICATION

const AllUsers = ()=> {
    var users = User.find()
    return users;    
}
// Register verification

const AddUser = async (usuario)=>{
    
    console.log("He entrado");
    try{
        
        const newUser = new User ({
            nombre : usuario.nombre,
            password: usuario.password,
            cargo: usuario.cargo,
            email: usuario.email,
            token : jwt.sign({username: usuario.nombre}, process.env.SECRET),
            tareas: []
        });

        await newUser.save();
        return true

    }catch(e){
        return false
    }
}


const DeleteUser = async(nombre)=> {
    try{
        const user = await User.findOneAndDelete({nombre: nombre});
        return user
        
    }catch(e){
        return false
    }
}
// other querys

// Aqui iria la parte de hacer un update de el usuario
// ademas de una funcion que sirva para añadir las tareas, con su fecha de inicio, y sobretodo, con la de final para poder avisar, si el usuario tiene tareas pendientes, o por lo menos que tiene la opcion de eliminarlas


module.exports = {AllUsers: AllUsers, AddUser: AddUser, DeleteUser: DeleteUser}
