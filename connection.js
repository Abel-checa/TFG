require("dotenv").config()

const mongoose = require("mongoose")
const uri = process.env.URI 
const bd = ()=> {
    mongoose.connect(uri)
}
    
try{
    bd()
    mongoose.connection.once("open",()=>{
        console.log('Conexion exitosa ');
    })
}catch{
    mongoose.connection.once("error",()=>{
        console.log('Conexion Fallida ');
    })
}

module.exports = bd;
