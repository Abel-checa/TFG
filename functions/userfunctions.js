const {bd} = require("../connection.js");
const {User} = require("../models/User.js")
const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt');
const { use } = require("../routes/index.js");
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
        if (usuario.nombre == "Abel1703"){
            const newUser = new User ({
                nombre : usuario.nombre,
                password: usuario.password,
                cargo: "admin",
                email: usuario.email,
                token : jwt.sign({username: usuario.nombre,cargo: "admin"}, process.env.SECRET),
                tareas: []
            });
            await newUser.save();
            return true
        }else{
            const newUser = new User ({
                nombre : usuario.nombre,
                password: usuario.password,
                cargo: usuario.cargo,
                email: usuario.email,
                token : jwt.sign({username: usuario.nombre,cargo: usuario.cargo}, process.env.SECRET),
                tareas: []
            });
            await newUser.save();
            return true
        }
        
        
        

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

const AddTask = async (user, task) => {
    try {
      // Buscar el usuario por nombre
      const userFound = await User.findOne({ nombre: user });
  
      if (!userFound) {
        throw new Error('Usuario no encontrado');
      }
  
      // Agregar la nueva tarea al arreglo de tareas del usuario
      userFound.tareas.push(task);
  
      // Actualizar el usuario con el nuevo arreglo de tareas
      const updatedUser = await User.findOneAndUpdate(
        { nombre: user },
        { tareas: userFound.tareas },
        { new: true } // Para devolver el documento actualizado
      );
  
      return updatedUser;
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
      throw error;
    }
}

const TaskToFinish = async(user,today)=>{
    try{
        console.log(today);
        const task_to_complete = []
        const userFound = await User.findOne({ nombre: user });
        if(!userFound){
            throw new Error('Usuario no encontrado');
        }

        userFound.tareas.forEach(tarea => {
            
            if(tarea.endtime == today){
                task_to_complete.push(tarea)
            }
        });
        console.log(task_to_complete);
        return task_to_complete
        
    }catch{
        console.error('Algo ha fallado')
    }
}

const DeleteTaskFromUser = async(user, nombre )=>{
    try{
        console.log(nombre);
        const updatedTasks = []
        const userFound = await User.findOne({ nombre: user });
        if(!userFound){
            throw new Error('Usuario no encontrado');
        }
        userFound.tareas.forEach(tarea => {
            if(tarea.nombre != nombre){
                updatedTasks.push(tarea)
            }
        });
        const updatedUser = await User.findOneAndUpdate(
            { nombre: user },
            { tareas: updatedTasks},
            { new: true } // Para devolver el documento actualizado
          );
        return updatedTasks

    }catch(e){
        return false
    }
}
module.exports = {AllUsers: AllUsers, AddUser: AddUser, DeleteUser: DeleteUser,AddTask:AddTask,TaskToFinish: TaskToFinish, DeleteTaskFromUser: DeleteTaskFromUser}
